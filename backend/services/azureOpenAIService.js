import fetch from 'node-fetch';

// All Azure OpenAI config is loaded from .env
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const apiKey = process.env.AZURE_OPENAI_API_KEY;
const deployment = process.env.AZURE_OPENAI_DEPLOYMENT;
const model = process.env.AZURE_OPENAI_MODEL;

/**
 * Calls Azure OpenAI API and returns the AI response.
 * Used only if AI_PROVIDER=azure (default) in .env.
 */
export async function getAIResponse(messages) {
  const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=2024-02-15-preview`;
  const headers = {
    'Content-Type': 'application/json',
    'api-key': apiKey,
  };
  const body = JSON.stringify({
    messages,
    model,
    max_tokens: 512,
    temperature: 0.7,
  });

  const res = await fetch(url, { method: 'POST', headers, body });
  if (!res.ok) throw new Error(`Azure OpenAI error: ${res.statusText}`);
  const data = await res.json();
  return data.choices[0].message.content;
}
