import { getConversationHistory } from '../services/historyService.js';

// Get chat history for a session
export const getHistory = async (req, res, next) => {
  try {
    const { sessionId } = req.params;
    if (!sessionId) {
      return res.status(400).json({ error: 'sessionId is required.' });
    }
    // Fetch conversation history from DB
    const history = await getConversationHistory(sessionId);
    res.json(history);
  } catch (err) {
    next(err);
  }
};
