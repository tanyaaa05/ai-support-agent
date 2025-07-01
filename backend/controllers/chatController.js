import { processChat } from '../services/chatService.js';
import Conversation from '../models/Conversation.js';

// Handle incoming chat messages
export const handleChat = async (req, res, next) => {
  try {
    const { sessionId, message } = req.body;
    if (!sessionId || typeof sessionId !== 'string' || !message || typeof message !== 'string') {
      // Validate input
      return res.status(400).json({ error: 'sessionId and message are required.' });
    }
    // Process chat and get AI response
    const response = await processChat(sessionId, message);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

// Get chat history for a session
export const getHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required.' });
    }
    const convo = await Conversation.findOne({ sessionId });
    if (!convo) return res.status(404).json({ sessionId, messages: [] });
    res.json({ sessionId, messages: convo.messages });
  } catch (err) {
    next(err);
  }
};
