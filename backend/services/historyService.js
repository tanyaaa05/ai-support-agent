import Conversation from '../models/Conversation.js';

export const getConversationHistory = async (sessionId) => {
  if (!sessionId) throw new Error('sessionId is required');
  // Fetch conversation from DB
  const conversation = await Conversation.findOne({ sessionId });
  return conversation ? conversation.messages : [];
};
