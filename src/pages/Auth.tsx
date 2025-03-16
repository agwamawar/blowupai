import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/firebase";
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
          <CardTitle>Access BlowUp AI</CardTitle>
          <CardDescription>Get early access to our AI-powered content analysis tools.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Check className="text-green-500" />
              <span>Advanced video analytics</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" />
              <span>Engagement predictions</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="text-green-500" />
              <span>Content optimization</span>
            </div>
          </div>
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