
import { initializeServiceAccounts } from './serviceAccounts';

const { vertexai } = initializeServiceAccounts();
const model = vertexai.preview.getGenerativeModel({ model: 'gemini-pro' });

export async function generateContent(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
