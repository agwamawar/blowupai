import { GoogleGenerativeAI } from '@google/generative-ai';

// OAuth settings for Google Authentication
const CLIENT_ID = '259167100596-gkmusb46hl8eg7k22901gvhh6ovl70b8.apps.googleusercontent.com';
const REDIRECT_URI = window.location.origin + '/auth/callback';

// Initialize without API key - we'll set the token dynamically after auth
const googleAI = new GoogleGenerativeAI('');

let accessToken: string | null = null;

// Function to set the access token for the API
export const setGoogleAccessToken = (token: string) => {
  accessToken = token;
  // Update the API client with the new token
  // @ts-ignore - Directly set the authorization header on the client
  googleAI._transport._options.headers = {
    'Authorization': `Bearer ${token}`
  };
};

// Get the auth URL for Google OAuth
export const getGoogleAuthUrl = () => {
  const scope = encodeURIComponent('https://www.googleapis.com/auth/generative-language');
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}&access_type=offline&prompt=consent`;
};

// Exchange authorization code for tokens
export const exchangeCodeForTokens = async (code: string) => {
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', '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');
  params.append('code', code);
  params.append('redirect_uri', REDIRECT_URI);
  params.append('grant_type', 'authorization_code');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`OAuth error: ${errorData.error_description || 'Failed to fetch token'}`);
  }

  const data = await response.json();
  
  // Store tokens securely
  localStorage.setItem('gemini_access_token', data.access_token);
  localStorage.setItem('gemini_refresh_token', data.refresh_token);
  localStorage.setItem('gemini_token_expiry', String(Date.now() + (data.expires_in * 1000)));
  
  setGoogleAccessToken(data.access_token);
  return data;
};

// Refresh the access token using a refresh token
export const refreshAccessToken = async (refreshToken: string) => {
  const tokenEndpoint = 'https://oauth2.googleapis.com/token';
  const params = new URLSearchParams();
  params.append('client_id', CLIENT_ID);
  params.append('client_secret', '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');
  params.append('refresh_token', refreshToken);
  params.append('grant_type', 'refresh_token');

  const response = await fetch(tokenEndpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: params.toString(),
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(`Failed to refresh token: ${data.error_description || data.error || 'Unknown error'}`);
  }

  localStorage.setItem('gemini_access_token', data.access_token);
  localStorage.setItem('gemini_token_expiry', String(Date.now() + (data.expires_in * 1000)));
  
  setGoogleAccessToken(data.access_token);
  return data;
};

// Check if token is valid and refresh if needed
export const ensureValidToken = async (): Promise<boolean> => {
  const accessToken = localStorage.getItem('gemini_access_token');
  const refreshToken = localStorage.getItem('gemini_refresh_token');
  const tokenExpiry = localStorage.getItem('gemini_token_expiry');
  
  if (!accessToken) {
    console.log('No access token found');
    return false;
  }

  const expiry = tokenExpiry ? parseInt(tokenExpiry) : 0;
  const isExpired = Date.now() > expiry;

  if (isExpired) {
    if (refreshToken) {
      try {
        await refreshAccessToken(refreshToken);
        return true;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        return false;
      }
    } else {
      console.log('No refresh token found');
      return false;
    }
  }

  // Valid token exists
  setGoogleAccessToken(accessToken);
  return true;
};

// Initialize token on load if available
try {
  const savedToken = localStorage.getItem('gemini_access_token');
  if (savedToken) {
    setGoogleAccessToken(savedToken);
  }
} catch (error) {
  console.warn('Failed to initialize token from storage:', error);
}

export const genAI = googleAI;

export const getModel = (modelName: string) => {
  return googleAI.getGenerativeModel({ model: modelName });
};
