
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { exchangeCodeForTokens } from '../lib/genai';
import { Loader } from 'lucide-react'; // Using Loader instead of Spinner

export const AuthCallback = () => {
  const [status, setStatus] = useState('Processing authentication...');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the authorization code from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get('code');
      
      if (!code) {
        setError('No authorization code received from Google.');
        return;
      }
      
      try {
        // Exchange the code for access and refresh tokens
        await exchangeCodeForTokens(code);
        setStatus('Authentication successful! Redirecting...');
        
        // Redirect back to the main app
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (err) {
        console.error('Authentication error:', err);
        setError(err instanceof Error ? err.message : 'Failed to authenticate with Google.');
      }
    };
    
    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-800">Google Authentication</h1>
        
        {error ? (
          <div className="p-4 text-red-700 bg-red-100 rounded-md">
            <p className="font-medium">Authentication Failed</p>
            <p className="text-sm">{error}</p>
            <button 
              onClick={() => navigate('/')}
              className="mt-4 px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Return to App
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-4">
            <Loader className="w-10 h-10 text-blue-600 animate-spin" />
            <p className="text-gray-600">{status}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthCallback;
