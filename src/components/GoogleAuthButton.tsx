
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { getGoogleAuthUrl, ensureValidToken } from '../lib/genai';
import { toast } from 'sonner';

export interface GoogleAuthButtonProps {
  onAuthSuccess?: () => void;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary' | 'destructive' | 'ghost' | 'link';
}

export function GoogleAuthButton({ 
  onAuthSuccess, 
  className = '',
  variant = 'default'
}: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      // First check if we already have valid tokens
      const isValid = await ensureValidToken();
      
      if (isValid) {
        toast.success("Already authenticated with Google");
        onAuthSuccess?.();
        return;
      }
      
      // Redirect to Google auth page
      window.location.href = getGoogleAuthUrl();
    } catch (error) {
      console.error("Authentication error:", error);
      toast.error("Authentication failed: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button 
      onClick={handleAuth} 
      disabled={loading}
      className={className}
      variant={variant}
    >
      {loading ? "Connecting..." : "Connect with Google"}
    </Button>
  );
}
