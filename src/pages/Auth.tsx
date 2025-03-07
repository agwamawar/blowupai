
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.from('early_access_payments').insert({ 
        email: email,
        name: name,
        status: 'pending',
        amount: 99.99,
        payment_type: 'lifetime_access',
        created_at: new Date().toISOString()
      });
      
      if (error) throw error;
      
      toast({
        title: "Success!",
        description: "Your payment information has been received. We'll process your payment and send access details to your email.",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <div className="w-full max-w-4xl px-4 py-8">
        <div className="grid gap-8 md:grid-cols-2">
          {/* Offer details section */}
          <Card className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
            <CardHeader className="pb-2">
              <div className="bg-blue-600 text-white text-xs font-semibold py-1 px-3 rounded-full w-fit mb-2">
                EARLY ACCESS OFFER
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
            <CardFooter className="border-t border-white/10 pt-4 text-sm text-muted-foreground">
              <p>
                This is a limited-time offer. Once we launch publicly, the subscription will cost $19.99/month.
              </p>
            </CardFooter>
          </Card>
          
          {/* Payment form section */}
          <Card className="bg-white/30 backdrop-blur-md border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Secure your lifetime access</CardTitle>
              <CardDescription>
                Enter your details below to get started with BlowUp AI
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/50"
                  />
                </div>
                <div className="bg-blue-50/50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    ⚡ This is a pre-launch offer. Enter your details and we'll contact you to complete the payment process. You'll receive access credentials via email.
                  </p>
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Processing..." : "Get Lifetime Access Now"}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="border-t border-white/10 pt-4 text-sm text-muted-foreground flex justify-between items-center">
              <p>Secure payment processing</p>
              <div className="flex gap-2">
                <div className="h-6 w-10 bg-gray-200 rounded opacity-70"></div>
                <div className="h-6 w-10 bg-gray-200 rounded opacity-70"></div>
                <div className="h-6 w-10 bg-gray-200 rounded opacity-70"></div>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
