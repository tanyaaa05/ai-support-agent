import dotenv from 'dotenv';
dotenv.config();

/**
 * System prompt for both Gemini and Azure AI.
 * Set GEMINI_SYSTEM_PROMPT in your .env file to customize.
 */
export const systemPrompt = process.env.GEMINI_SYSTEM_PROMPT ||
  'You are a helpful customer support agent. Answer user queries politely and informatively, referring to the uploaded company documents when relevant.';
