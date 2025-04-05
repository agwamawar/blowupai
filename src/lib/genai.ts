
import { VertexAI } from '@google-cloud/vertexai';
import { initializeServiceAccounts } from './serviceAccounts';

const { vertexai } = initializeServiceAccounts();

// Initialize with default model configuration
export const genAI = vertexai.preview.getGenerativeModel({ 
  model: 'gemini-pro',
  generationConfig: {
    maxOutputTokens: 2048,
    temperature: 0.7,
    topP: 0.8,
    topK: 40
  }
});

// Generate Google OAuth URL for authentication
export function getGoogleOAuthURL() {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
  
  const options = {
    redirect_uri: window.location.origin + '/auth',
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/cloud-platform',
    ].join(' '),
  };
  
  const qs = new URLSearchParams(options);
  return `${rootUrl}?${qs.toString()}`;
}

// Exchange authorization code for tokens
export async function getGoogleToken(code: string) {
  const tokenUrl = 'https://oauth2.googleapis.com/token';
  
  const values = {
    code,
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    client_secret: import.meta.env.VITE_GOOGLE_CLIENT_SECRET,
    redirect_uri: window.location.origin + '/auth',
    grant_type: 'authorization_code',
  };
  
  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
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
}

export async function generateContent(prompt: string) {
  try {
    const result = await genAI.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error generating content:', error);
    throw error;
  }
}
