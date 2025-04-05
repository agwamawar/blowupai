
import { initializeServiceAccounts } from './serviceAccounts';

// Try to initialize the model, with a fallback mechanism
let model;
try {
  const { vertexai } = initializeServiceAccounts();
  model = vertexai.preview.getGenerativeModel({ 
    model: 'gemini-1.5-pro',
    generationConfig: {
      maxOutputTokens: 1024,
      temperature: 0.4
    }
  });
} catch (error) {
  console.warn("Failed to initialize Gemini model in gemini.ts:", error);
  // Set model to null and handle gracefully in generateContent
}

export async function generateContent(prompt: string) {
  try {
    // Check if model initialization failed
    if (!model) {
      console.warn("No Gemini model available, returning fallback content");
      return `Generated content for: ${prompt.substring(0, 50)}...`;
    }
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    // Access text correctly from the response
    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    // Return a fallback response instead of throwing
    return `Failed to generate content. Using fallback for: ${prompt.substring(0, 50)}...`;
  }
}
