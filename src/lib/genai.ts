import { GoogleGenerativeAI } from '@google/generative-ai';

// OAuth 2.0 credentials
const CLIENT_ID = '259167100596-gkmusb46hl8eg7k22901gvhh6ovl70b8.apps.googleusercontent.com';
const CLIENT_SECRET = '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';

// Create instance with a default API key (will be replaced with OAuth token when available)
// The constructor requires an API key, but we'll use a placeholder until we have the OAuth token
const googleAI = new GoogleGenerativeAI("placeholder_api_key");

// Initialize with OAuth
const initializeWithOAuth = async (accessToken: string) => {
  // For OAuth, we use the access token as the API key
  return new GoogleGenerativeAI(accessToken);
};

export const genAI = googleAI;

export const getModel = async (modelName: string, accessToken?: string) => {
  if (accessToken) {
    const authenticatedAI = await initializeWithOAuth(accessToken);
    return authenticatedAI.getGenerativeModel({ model: modelName });
  }

  return googleAI.getGenerativeModel({ model: modelName });
};

// OAuth helper functions
export const getGoogleOAuthURL = () => {
  const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    redirect_uri: window.location.origin,
    client_id: CLIENT_ID,
    access_type: 'offline',
    response_type: 'code',
    prompt: 'consent',
    scope: [
      'openid',
      'email',
      'profile'
    ].join(' '),
  };

  const queryString = new URLSearchParams(options);

  return `${rootUrl}?${queryString.toString()}`;
};

export const getGoogleToken = async (code: string) => {
  const url = 'https://oauth2.googleapis.com/token';
  const values = {
    code,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    redirect_uri: window.location.origin,
    grant_type: 'authorization_code',
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting Google token:', error);
    throw error;
  }
};