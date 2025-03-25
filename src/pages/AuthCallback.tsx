
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { exchangeCodeForTokens } from '../lib/genai';
import { Spinner } from 'lucide-react';

export default function AuthCallback() {
  const [status, setStatus] = useState('Processing authentication...');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleAuth = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if (!code) {
          setStatus('Error: No authentication code received');
          return;
        }
        
        setStatus('Exchanging code for access token...');
        await exchangeCodeForTokens(code);
        
        setStatus('Authentication successful! Redirecting...');
        setTimeout(() => navigate('/'), 1500);
      } catch (error) {
        console.error('Auth error:', error);
        setStatus(`Authentication failed: ${error.message}`);
      }
    };
    
    handleAuth();
  }, [location, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white/10 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4 text-center">Google Authentication</h1>
        <div className="flex items-center justify-center mb-4">
          <Spinner className="h-8 w-8 animate-spin text-primary" />
        </div>
        <p className="text-center">{status}</p>
      </div>
    </div>
  );
}
