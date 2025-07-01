# AI Customer Support Chat Platform (Backend)

## Overview
A modular backend for an AI-powered customer support chat platform using Node.js, Express, MongoDB, and supports both Gemini Pro and Azure OpenAI (GPT-3.5/4) APIs. The AI provider is selected via the `AI_PROVIDER` variable in your `.env` file.

## Features
- Chat with AI (Gemini Pro or Azure OpenAI)
- Conversation history
- FAQ/company document upload and search
- MongoDB for persistent storage
- File parsing (PDF supported)
- Error handling and logging

## Folder Structure
```
backend/
├── controllers/
├── services/
├── routes/
├── models/
├── middlewares/
├── uploads/
├── utils/
├── config/
├── app.js
├── server.js
└── .env
```

## .env Example
```
PORT=3000
MONGO_URI=mongodb://localhost:27017/ai-chat
GEMINI_API_KEY=your_google_generative_ai_key
JWT_SECRET=dummy_jwt_secret
UPLOAD_LIMIT=10mb
AI_PROVIDER=gemini # or azure_openai
```

## Install & Run
```sh
cd backend
npm install
npm start
```

## API Endpoints
### POST /api/chat
Send a message to the AI agent.
```
{
  "sessionId": "abc123",
  "message": "How do I reset my password?"
}
```

### GET /api/chat/history/:sessionId
Get conversation history for a session.

### POST /api/faqs/upload
Upload a company document (PDF supported).

### GET /api/faqs
List uploaded company documents.

## License
MIT
