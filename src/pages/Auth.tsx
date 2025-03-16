import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/integrations/firebase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await auth.signInAnonymously();

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
    <div className="container max-w-lg mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <div className="text-sm font-semibold text-red-600 mb-2">OFFER ENDS SOON</div>
          <CardTitle>Lifetime Access</CardTitle>
          <CardDescription>Join now as an early supporter and get lifetime access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold">$99.99</span>
              <span className="text-lg text-gray-500 line-through">$499.99*</span>
              <span className="text-green-600 font-semibold">(80% OFF)</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Unlimited video analysis</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>AI-powered engagement insights</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Trend identification</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Performance tracking</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Content optimization</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="h-5 w-5 text-green-500" />
                <span>Priority support</span>
              </div>
            </div>
          </div>
          <p className="text-center text-sm text-gray-600 mb-4">Pay $99.99 for Lifetime Access</p>
        </CardContent>
        <CardFooter>
          <Button 
            onClick={handleSubmit} 
            disabled={loading}
            className="w-full"
          >
            {loading ? "Processing..." : "Continue"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}