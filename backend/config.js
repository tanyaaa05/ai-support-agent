import dotenv from 'dotenv';
dotenv.config();

/**
 * Central config object for all environment variables.
 * Use this everywhere instead of process.env directly.
 */
export default {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGO_URI,
  geminiApiKey: process.env.GEMINI_API_KEY,
  geminiSystemPrompt: process.env.GEMINI_SYSTEM_PROMPT,
  azureOpenAiEndpoint: process.env.AZURE_OPENAI_ENDPOINT,
  azureOpenAiApiKey: process.env.AZURE_OPENAI_API_KEY,
  azureOpenAiDeployment: process.env.AZURE_OPENAI_DEPLOYMENT,
  azureOpenAiModel: process.env.AZURE_OPENAI_MODEL,
  aiProvider: process.env.AI_PROVIDER || 'azure',
  jwtSecret: process.env.JWT_SECRET,
  uploadLimit: process.env.UPLOAD_LIMIT || '10mb',
};
