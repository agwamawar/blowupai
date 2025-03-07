
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
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
      const { error } = await supabase
        .from('early_access_payments')
        .insert([{ 
          name: "To be collected",
          email: "placeholder@example.com",
          status: 'pending',
          amount: 99.99,
          payment_type: 'lifetime_access',
          created_at: new Date().toISOString()
        }]);
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Your payment information has been received. We'll collect your details after payment is confirmed.",
      });
      navigate("/");
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
      console.error("Error processing payment information:", error);
    } finally {
      setLoading(false);
    }
  };

  const features = [
    "Unlimited video analysis",
    "AI-powered engagement insights",
    "Trend identification",
    "Performance tracking",
    "Content optimization",
    "Priority support"
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95 p-4">
      <Card className="w-full max-w-md bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
        <CardHeader className="pb-2">
          <div className="bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full w-fit mb-2">
            OFFER ENDS SOON
          </div>
          <CardTitle className="text-2xl font-bold">Lifetime Access</CardTitle>
          <CardDescription>
            Join now as an early supporter and get lifetime access
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <span className="text-4xl font-bold">$99.99</span>
            <span className="text-muted-foreground ml-2 line-through">$499.99</span>
            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">80% OFF</span>
          </div>
          
          <div className="space-y-3 mt-6">
            {features.map((feature, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
                <span className="text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button type="button" onClick={handleSubmit} className="w-full" disabled={loading}>
            {loading ? "Processing..." : "Pay $99.99 for Lifetime Access"}
          </Button>
          <div className="w-full flex justify-between items-center text-sm text-muted-foreground pt-2 border-t border-white/10">
            <p>Secure payment processing</p>
            <div className="flex gap-2">
              <div className="h-6 w-10 bg-gray-200 rounded opacity-70"></div>
              <div className="h-6 w-10 bg-gray-200 rounded opacity-70"></div>
              <div className="h-6 w-10 bg-gray-200 rounded opacity-70"></div>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
