
// Mock implementation for frontend-only functionality

export const getGoogleOAuthURL = () => {
  // In a real implementation, this would redirect to Google's OAuth service
  const redirectUri = encodeURIComponent(window.location.origin + "/auth");
  const scope = encodeURIComponent("email profile");
  
  // Mock URL - in a real app this would be a valid Google OAuth URL
  return `https://accounts.google.com/o/oauth2/v2/auth?client_id=mock-client-id&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&access_type=offline`;
};

export const getGoogleToken = async (code: string) => {
  // This would normally call your backend to exchange the code for tokens
  // For frontend-only, we'll mock a successful response
  
  return {
    access_token: "mock-access-token-" + Math.random().toString(36).substring(2),
    refresh_token: "mock-refresh-token-" + Math.random().toString(36).substring(2),
    expires_in: 3600
  };
};
