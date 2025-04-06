
import { initializeServiceAccounts } from '@/lib/serviceAccounts';

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
  console.log("Gemini model initialized successfully in browser");
} catch (error) {
  console.error("Failed to initialize Gemini model in gemini.ts:", error);
  // Model initialization failed, will throw an error when used
}

export async function generateContent(prompt: string) {
  if (!model) {
    throw new Error('AI service unavailable. Please check your API keys and try again.');
  }
  
  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    
    // Access text correctly from the response
    if (!response.candidates?.[0]?.content?.parts?.[0]?.text) {
      throw new Error('Invalid AI response format');
    }
    
    return response.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error('Error generating content:', error);
    throw new Error('Failed to generate content. AI service error occurred.');
  }
}
