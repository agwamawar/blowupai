
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Clock } from "lucide-react";
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
      <Card className="overflow-hidden border-0 shadow-lg">
        <div className="bg-gradient-to-r from-primary/90 to-primary-hover/90 p-1">
          <div className="flex items-center justify-between p-2 bg-white/10 backdrop-blur-sm rounded">
            <div className="text-sm font-bold text-white flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>LIMITED TIME OFFER</span>
            </div>
            <div className="text-xs text-white/90 font-medium bg-black/20 px-2 py-0.5 rounded">80% OFF</div>
          </div>
        </div>
        
        <CardHeader className="pb-3 pt-6">
          <CardTitle className="text-2xl font-bold">Lifetime Access Pass</CardTitle>
          <CardDescription className="text-base">Join now as an early supporter and unlock all premium features forever</CardDescription>
        </CardHeader>
        
        <CardContent>
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl font-bold text-primary">$99.99</span>
              <span className="text-lg text-gray-500 line-through">$499.99</span>
              <span className="text-sm font-semibold px-2 py-1 bg-green-100 text-green-800 rounded-full">SAVE $400</span>
            </div>
            
            <CountdownTimer />
            
            <div className="space-y-3 mt-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-800">What's included:</h3>
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
          
          <div className="text-center">
            <p className="text-sm text-gray-500 mb-1">One-time payment • No subscription</p>
            <p className="text-xs text-gray-400">30-day money-back guarantee</p>
          </div>
        </CardContent>
        
        <CardFooter className="pb-6">
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full py-6 text-lg shadow-lg transition-all hover:shadow-xl bg-primary hover:bg-primary-hover"
          >
            {loading ? "Processing..." : "Get Lifetime Access Now"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
