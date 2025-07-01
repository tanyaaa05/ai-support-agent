import React, { useRef, useEffect, useState } from 'react';
import './ChatPage.css';
import Logo from '../components/Logo';
import { Box, Paper, TextField, Button, CircularProgress, Fade, Slide } from '@mui/material';

// Message interface for chat messages
interface Message {
  role: 'user' | 'bot';
  text: string;
  timestamp: string;
}

// Main chat page component
const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Send a message to the backend and update chat
  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', text: input, timestamp: new Date().toLocaleTimeString() };
    setMessages((msgs) => [...msgs, userMsg]);
    setLoading(true);
    try {
      // Use environment variable for API base URL
       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: 'demo', message: input })
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { role: 'bot', text: data.response, timestamp: new Date().toLocaleTimeString() }]);
    } catch (e) {
      setMessages((msgs) => [...msgs, { role: 'bot', text: 'Error contacting AI.', timestamp: new Date().toLocaleTimeString() }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <Box className="chat-container" component={Paper} elevation={6}>
      <Box className="chat-header"><Logo /></Box>
      <Box className="chat-body">
        {/* Render chat messages with animation */}
        {messages.map((msg, i) => (
          <Slide in direction="up" key={i} timeout={400} mountOnEnter unmountOnExit>
            <Box className={`chat-bubble ${msg.role} fade-in`}>
              <div className="bubble-text">{msg.text}</div>
              <div className="bubble-meta">{msg.role} • {msg.timestamp}</div>
            </Box>
          </Slide>
        ))}
        {/* Show typing indicator when loading */}
        {loading && (
          <Fade in={loading} timeout={400}>
            <Box className="typing-indicator" display="flex" alignItems="center" gap={1}>
              <CircularProgress size={18} color="primary" />
              Agent is typing...
            </Box>
          </Fade>
        )}
        <div ref={chatEndRef} />
      </Box>
      {/* Input row for sending messages */}
      <Box className="chat-input-row">
        <TextField
          className="chat-input"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          placeholder="Type your message..."
          disabled={loading}
          fullWidth
          size="small"
          variant="outlined"
        />
        <Button
          className="send-btn"
          onClick={sendMessage}
          disabled={loading || !input.trim()}
          variant="contained"
          color="primary"
          sx={{ ml: 1, minWidth: 90, fontWeight: 600 }}
        >
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatPage;
