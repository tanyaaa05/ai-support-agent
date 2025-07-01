import mongoose from 'mongoose';

// Message schema for individual chat messages
const messageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'bot'], required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

// Conversation schema for storing chat sessions
const conversationSchema = new mongoose.Schema({
  sessionId: { type: String, required: true, index: true }, // Indexed for fast lookup
  userId: { type: String },
  messages: { type: [messageSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Conversation', conversationSchema);
