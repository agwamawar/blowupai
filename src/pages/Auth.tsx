
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SlotCounter } from "@/components/SlotCounter";
import { Check, Clock, X, LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { getGoogleOAuthURL, getGoogleToken } from "@/lib/genai";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get analysis data from location state if available
  const analysisData = location.state?.analysisData;
  
  useEffect(() => {
    // Check for OAuth code in URL
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    
    if (code) {
      handleGoogleOAuth(code);
    }
  }, []);
  
  const handleGoogleOAuth = async (code: string) => {
    setLoading(true);
    try {
      // Exchange code for tokens
      const tokenData = await getGoogleToken(code);
      
      if (tokenData.access_token) {
        // Store tokens in localStorage
        localStorage.setItem('googleAccessToken', tokenData.access_token);
        if (tokenData.refresh_token) {
          localStorage.setItem('googleRefreshToken', tokenData.refresh_token);
        }
        
        // Show success toast
        toast({
          title: "Authentication successful",
          description: "You've successfully logged in with Google",
        });
        
        // Redirect to dashboard with analysis data if available
        const pendingAction = sessionStorage.getItem('pendingAction');
        const storedAnalysis = sessionStorage.getItem('analysisData');
        
        sessionStorage.removeItem('pendingAction');
        sessionStorage.removeItem('analysisData');

        if (pendingAction === 'analyze' && storedAnalysis) {
          navigate('/dashboard', { 
            state: { analysisData: JSON.stringify(storedAnalysis) },
            replace: true 
          });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        throw new Error('Failed to get access token');
      }
    } catch (error) {
      console.error('OAuth error:', error);
      toast({
        title: "Authentication failed",
        description: error instanceof Error ? error.message : "Failed to authenticate with Google",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    setLoading(true);
    // Redirect to Google OAuth URL
    window.location.href = getGoogleOAuthURL();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/5 p-4">
      <Card className="w-full max-w-sm overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground tracking-wide">START ANALYZING</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold">Lifetime Access 🔥</h2>
          <p className="text-muted-foreground mt-2">One-time payment, full access forever</p>
          <div className="mt-4 text-xl font-semibold text-primary">$99 Now <span className="text-sm text-muted-foreground">(Only 100 Spots Available)</span></div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Unlimited video breakdowns</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Content optimization</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Trending content data</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Engagement simulation</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Personalized viral strategies</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>VIP creator support</span>
            </li>
          </ul>
          <p className="mt-4 text-sm font-medium text-muted-foreground">⚡ No subscriptions. No extra fees.</p>
          
          <div className="mt-6 space-y-3">
            <Button 
              className="w-full bg-primary hover:bg-primary/90" 
              onClick={handleGoogleLogin} 
              disabled={loading}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {loading ? "Authenticating..." : "Sign in with Google"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
