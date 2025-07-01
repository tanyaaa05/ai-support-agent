// import { GoogleGenerativeAI } from '@google/generative-ai';

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function listModels() {
//   try {
//     const { models } = await genAI.listModels();
//     console.log('Available Gemini models:');
//     for (const model of models) {
//       console.log(`- ${model.name} | Supported methods: ${model.supportedMethods.join(', ')}`);
//     }
//   } catch (err) {
//     console.error('Error listing models:', err);
//   }
// }

// listModels();

import fetch from 'node-fetch';

const API_KEY = process.env.GEMINI_API_KEY || 'YOUR_API_KEY';

console.log('Using API Key:', API_KEY);
const url = 'https://generativelanguage.googleapis.com/v1/models?key=' + API_KEY;

async function listModels() {
  try {
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      console.log('Available Gemini models:');
      data.models.forEach(model => {
        console.log(`- ${model.name} | Supported methods: ${model.supportedMethods ? model.supportedMethods.join(', ') : 'N/A'}`);
      });
    } else {
      console.error('No models found or invalid API key/permissions:', data);
    }
  } catch (err) {
    console.error('Error fetching models:', err);
  }
}

listModels();
listModels();
