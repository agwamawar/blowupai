
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock, CreditCard, Lock, Shield } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { signInAnonymously } from "firebase/auth";

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
    <div className="container mx-auto px-4 py-8 max-w-md">
      <Card className="overflow-hidden border shadow-xl rounded-xl bg-white">
        {/* Top ribbon */}
        <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-1">
          <div className="flex items-center justify-between p-2 bg-white/10 backdrop-blur-sm rounded">
            <div className="text-sm font-bold text-white flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>LIMITED TIME OFFER</span>
            </div>
            <div className="text-xs text-white font-medium bg-black/20 px-2 py-0.5 rounded">80% OFF</div>
          </div>
        </div>
        
        {/* Card header with subtle shadow */}
        <CardHeader className="pb-3 pt-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold text-gray-800">Lifetime Access Pass</CardTitle>
            <Shield className="h-5 w-5 text-blue-500" />
          </div>
          <CardDescription className="text-base text-gray-600">
            Join now as an early supporter and unlock all premium features forever
          </CardDescription>
        </CardHeader>
        
        <CardContent className="pt-6">
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-blue-600">$99.99</span>
              <span className="text-lg text-gray-500 line-through">$499.99</span>
              <span className="text-sm font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">SAVE $400</span>
            </div>
            
            {/* Countdown with softer styling */}
            <CountdownTimer />
            
            {/* Features list with card-like styling */}
            <div className="space-y-3 mt-6 bg-gray-50 p-4 rounded-lg border border-gray-100">
              <h3 className="font-semibold text-gray-800 flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span>What's included:</span>
              </h3>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-left">Unlimited video analysis with our advanced AI algorithms</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-left">Detailed engagement insights to understand viewer behavior</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-left">Trend identification to keep your content relevant</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-left">Performance tracking across all your videos</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-left">AI-powered content optimization suggestions</span>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-left">Priority support from our dedicated team</span>
              </div>
            </div>
          </div>
          
          {/* Payment information with security indicators */}
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-500 mb-1 flex items-center justify-center gap-1">
              <span>One-time payment • No subscription</span>
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1">
              <Lock className="h-3 w-3 text-gray-400" />
              <span>30-day money-back guarantee</span>
            </p>
          </div>
        </CardContent>
        
        {/* Card footer with secure payment button */}
        <CardFooter className="pb-6 pt-2">
          <div className="w-full space-y-4">
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full py-6 text-lg shadow-lg transition-all hover:shadow-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
            >
              {loading ? "Processing..." : "Get Lifetime Access Now"}
            </Button>
            
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <Lock className="h-3 w-3" />
              <span>Secure payment processing</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
