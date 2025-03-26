
import { GoogleGenerativeAI } from '@google/generative-ai';

// Create instance with a default API key (will be updated when OAuth token is available)
// For local development, this can be a placeholder
const API_KEY = "GOOGLE_API_KEY";

// Initialize the Google AI client
const googleAI = new GoogleGenerativeAI(API_KEY);

export const genAI = googleAI;

// Get a specific model with optional auth token
export const getModel = async (modelName: string, accessToken?: string) => {
  if (accessToken) {
    // For OAuth, we use the access token as the API key
    const authenticatedAI = new GoogleGenerativeAI(accessToken);
    return authenticatedAI.getGenerativeModel({ model: modelName });
  }
  return googleAI.getGenerativeModel({ model: modelName });
};

// Function to use in production with a proper API key
export const initializeWithApiKey = (apiKey: string) => {
  if (apiKey && apiKey !== "GOOGLE_API_KEY") {
    return new GoogleGenerativeAI(apiKey);
  }
  return googleAI;
};
