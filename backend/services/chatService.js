import Conversation from '../models/Conversation.js';
import CompanyData from '../models/CompanyData.js';
import { getAIResponse as getAzureAIResponse } from './azureOpenAIService.js';
import { getGeminiResponse } from './geminiService.js';
import { systemPrompt } from '../config/gemini.js';

/**
 * Builds the message array for the AI provider.
 * Uses the system prompt from .env (see GEMINI_SYSTEM_PROMPT).
 */
const buildMessages = (history, message, truncatedContent) => [
  { role: 'system', content: systemPrompt },
  ...history.map(m => ({ role: m.role, content: m.text })),
  { role: 'user', content: message },
  ...(truncatedContent ? [{ role: 'system', content: `Reference: ${truncatedContent}` }] : [])
];

/**
 * Main chat handler. Selects AI provider based on process.env.AI_PROVIDER.
 * Supported: 'azure' (default), 'gemini'
 * To switch, set AI_PROVIDER in your .env file.
 */
export const processChat = async (sessionId, message) => {
  if (!sessionId || !message) throw new Error('sessionId and message are required');
  // Fetch last N messages for context
  const conversation = await Conversation.findOne({ sessionId });
  let history = conversation ? conversation.messages.slice(-5) : [];

  // Keyword search in company data
  const faqs = await CompanyData.find();
  let matchedContent = '';
  for (const faq of faqs) {
    if (faq.rawText.toLowerCase().includes(message.toLowerCase())) {
      matchedContent += `\n${faq.rawText}`;
    }
  }

  // Limit history for free tier (last 2 messages only)
  const limitedHistory = history.slice(-2);
  // Truncate matchedContent for free tier (max 500 chars)
  const truncatedContent = matchedContent.length > 500 ? matchedContent.slice(0, 500) + '...' : matchedContent;

  // Build messages for Azure OpenAI
  const messages = buildMessages(limitedHistory, message, truncatedContent);

  try {
    let aiText, modelUsed;
    // Choose provider based on env
    const provider = (process.env.AI_PROVIDER || 'azure').toLowerCase();
    if (provider === 'gemini') {
      // Gemini provider (Google Generative AI)
      const geminiResult = await getGeminiResponse(sessionId, message);
      aiText = geminiResult.response;
      modelUsed = geminiResult.model;
    } else {
      // Azure OpenAI provider (default)
      aiText = await getAzureAIResponse(messages);
      modelUsed = process.env.AZURE_OPENAI_MODEL;
    }
    // Save to DB
    const newMessages = [
      ...(history || []),
      { role: 'user', text: message, timestamp: new Date() },
      { role: 'bot', text: aiText, timestamp: new Date() }
    ];
    if (conversation) {
      conversation.messages = newMessages;
      await conversation.save();
    } else {
      await Conversation.create({ sessionId, messages: newMessages });
    }
    console.log(`[ChatService] AI response generated for session ${sessionId} using model: ${modelUsed}`);
    return { response: aiText, model: modelUsed };
  } catch (err) {
    console.error('[ChatService] AI error:', err);
    return { response: 'Sorry, the AI service is currently unavailable or quota exceeded.' };
  }
};
