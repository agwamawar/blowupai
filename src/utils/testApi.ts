
import { genAI } from '../lib/genai';

async function testGeminiAPI() {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await model.generateContent('Test prompt for Gemini API');
    const response = await result.response;
    console.log('Gemini API Response:', response);
    return response;
  } catch (error) {
    console.error('Gemini API Error:', error);
    if (error.message?.includes('API key')) {
      console.error('API key error - please check your VITE_GEMINI_API_KEY');
    }
    throw error;
  }
}

testGeminiAPI();
