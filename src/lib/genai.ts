import { VertexAI } from '@google-cloud/vertexai';
import { initializeServiceAccounts } from './serviceAccounts';

const { vertexai } = initializeServiceAccounts();

// Initialize with default model configuration
export const genAI = vertexai.preview.getGenerativeModel({ 
  model: 'gemini-pro',
  generation_config: {
    max_output_tokens: 2048,
    temperature: 0.7,
    top_p: 0.8,
    top_k: 40
  }
});

export async function generateContent(prompt: string) {
  try {
    const [response] = await genAI.generateText({ prompt });
    return response.text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}