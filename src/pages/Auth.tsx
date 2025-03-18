
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { signInAnonymously } from "firebase/auth";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgePercent, Check, Clock, CreditCard, Shield } from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await signInAnonymously(auth);

      toast({
        title: "Success!",
        description: "You have been successfully authenticated.",
      });
      navigate("/");
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error during authentication:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/5 p-4">
      <Card className="w-full max-w-md overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground tracking-wide">SPECIAL OFFER</span>
            </div>
            <div className="bg-primary/10 px-3 py-1.5 rounded-full text-sm font-semibold text-primary border border-primary/20">
              Limited Time
            </div>
          </div>
        </div>
        
        <CardHeader className="pt-6 pb-4">
          <CardTitle className="text-2xl font-bold text-center">Lifetime Access Pass</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="flex items-baseline justify-center gap-2">
            <span className="text-3xl font-bold text-primary">$99.99</span>
            <span className="text-sm text-gray-500 line-through">$499.99 Soon</span>
            <span className="flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              <BadgePercent className="h-3 w-3" />
              80% OFF
            </span>
          </div>
          
          <div className="space-y-3 bg-gray-50 p-4 rounded-lg">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Unlimited video analysis</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>AI-powered insights</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Trend detection</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Performance tracking</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Content optimization</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
              <span>Priority support</span>
            </div>
          </div>
          
          <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
            <CreditCard className="h-4 w-4" />
            <span>Pay once, access forever!</span>
          </div>
        </CardContent>
        
        <CardFooter className="flex flex-col gap-3 pb-6">
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full py-6 text-lg font-medium bg-primary/90 hover:bg-primary transition-all duration-300 text-primary-foreground"
          >
            {loading ? "Processing..." : "Get Lifetime Access Now"}
          </Button>
          
          <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
            <Shield className="h-3 w-3" />
            <span>Secure payment • 30-day money-back guarantee</span>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
