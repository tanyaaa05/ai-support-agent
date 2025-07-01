// services/geminiService.js

import { GoogleGenerativeAI } from '@google/generative-ai';
import Conversation from '../models/Conversation.js';
import CompanyData from '../models/CompanyData.js';
import { systemPrompt } from '../config/gemini.js';

const GEMINI_MODEL = process.env.GEMINI_MODEL || 'gemini-1.5-pro-latest';
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

let selectedModel = GEMINI_MODEL; // Fallback model

// Optional: Dynamically get supported model (placeholder function)
const getSupportedModel = async () => {
  // This should call the real model listing API (not available yet)
  // For now, use the default model name from env
  return selectedModel;
};

export const getGeminiResponse = async (sessionId, message) => {
  try {
    const conversation = await Conversation.findOne({ sessionId });
    const history = conversation ? conversation.messages.slice(-2) : [];

    const faqs = await CompanyData.find();
    let matchedContent = '';
    for (const faq of faqs) {
      if (faq.rawText?.toLowerCase().includes(message.toLowerCase())) {
        matchedContent += `\n${faq.rawText}`;
      }
    }

    const truncatedContent =
      matchedContent.length > 500 ? matchedContent.slice(0, 500) + '...' : matchedContent;

    const contents = [
      { parts: [{ text: systemPrompt }] },
      ...history.map((m) => ({ parts: [{ text: m.text }] })),
      { parts: [{ text: message }] },
      ...(truncatedContent ? [{ parts: [{ text: `Reference: ${truncatedContent}` }] }] : [])
    ];

    const modelName = await getSupportedModel();
    const model = genAI.getGenerativeModel({ model: modelName });

    console.log(`Generating content for session ${sessionId} using model: ${modelName}`);
    const result = await model.generateContent({ contents });
    const aiText = result?.candidates?.[0]?.content?.parts?.[0]?.text ||
      'Sorry, I could not answer that.';

    const newMessages = [
      ...history,
      { role: 'user', text: message, timestamp: new Date() },
      { role: 'bot', text: aiText, timestamp: new Date() }
    ];

    if (conversation) {
      conversation.messages = newMessages;
      await conversation.save();
    } else {
      await Conversation.create({ sessionId, messages: newMessages });
    }

    return { response: aiText, model: modelName };
  } catch (error) {
    console.error('Gemini API error during content generation:', error);

    if (error.message?.includes('404')) {
      console.error('Model not found. It may be deprecated or incorrect.');
      selectedModel = ''; // Reset model
    } else if (error.message?.includes('quota exceeded')) {
      console.error('Quota exceeded. Check your project quota or billing status.');
    } else if (error.message?.includes('403')) {
      console.error('Permission denied. Check your API key and permissions.');
    } else {
      console.error('An unexpected error occurred during the Gemini API call.');
    }

    throw error;
  }
};
