
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

// Google OAuth configuration
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with actual client ID in production
const GOOGLE_CLIENT_SECRET = "YOUR_GOOGLE_CLIENT_SECRET"; // Replace with actual client secret in production
const REDIRECT_URI = window.location.origin + "/auth"; // Redirect back to the auth page

// Function to get the Google OAuth URL
export const getGoogleOAuthURL = () => {
  const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: REDIRECT_URI,
    client_id: GOOGLE_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/generative-language.retriever",
      "https://www.googleapis.com/auth/cloud-platform",
    ].join(" "),
  };

  const queryString = new URLSearchParams(options).toString();
  return `${rootUrl}?${queryString}`;
};

// Function to exchange the code for tokens
export const getGoogleToken = async (code: string) => {
  try {
    const tokenUrl = "https://oauth2.googleapis.com/token";
    const values = {
      code,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      redirect_uri: REDIRECT_URI,
      grant_type: "authorization_code",
    };

    const response = await fetch(tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(values).toString(),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OAuth token error: ${errorData.error_description || errorData.error || 'Failed to get token'}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error exchanging code for token:", error);
    throw error;
  }
};
