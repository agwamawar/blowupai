
import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

if (!API_KEY) {
  console.warn('⚠️ No Gemini API key found. Please set VITE_GEMINI_API_KEY in your environment variables.');
}

export const genAI = new GoogleGenerativeAI(API_KEY);

export const getModel = (modelName: string) => {
  return genAI.getGenerativeModel({ model: modelName });
};
