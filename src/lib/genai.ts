
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️ No Gemini API key found. Please set VITE_GEMINI_API_KEY in your environment variables.');
}

const googleAI = new GoogleGenerativeAI(API_KEY);

export const genAI = googleAI;

export const getModel = (modelName: string) => {
  return googleAI.getGenerativeModel({ model: modelName });
};
