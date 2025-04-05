
import { initializeServiceAccounts } from './serviceAccounts';

const { vertexai } = initializeServiceAccounts();
const model = vertexai.preview.getGenerativeModel({ model: 'gemini-1.5-pro' });

export async function generateContent(prompt: string) {
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Access text correctly from the response
    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
