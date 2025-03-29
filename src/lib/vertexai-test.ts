
import { initializeServiceAccounts } from './serviceAccounts';

export async function testVertexAISetup() {
  try {
    const { vertexai } = initializeServiceAccounts();
    const model = vertexai.preview.getGenerativeModel({ model: 'gemini-pro' });
    
    // Simple test prompt
    const result = await model.generateContent('Test connection');
    const response = await result.response;
    console.log('Vertex AI connection successful');
    return true;
  } catch (error) {
    console.error('Vertex AI connection failed:', error);
    return false;
  }
}
