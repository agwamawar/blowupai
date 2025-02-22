
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { error } = await supabase.from('waiting_list').insert([{ 
        email: email,
        status: 'pending',
        created_at: new Date().toISOString()
      }]);
      
      toast({
        title: "Success!",
        description: "Your application has been received. We'll review it and get back to you soon.",
      });
      navigate("/");
    } catch (error) {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-background/95">
      <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20 w-full max-w-md">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold">Join the Waiting List</h1>
            <p className="text-muted-foreground mt-2">
              Submit your application for early access. Our team will review your request and manually approve access.
            </p>
          </div>

          <div className="bg-blue-50/50 p-4 rounded-lg">
            <p className="text-sm text-blue-800">
              ⚡ Due to high demand, we're carefully reviewing each application to ensure the best experience for our users. Once approved, you'll receive full access to our video analysis tools.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Submit Application"}
            </Button>
          </form>

          <p className="text-xs text-center text-muted-foreground">
            By submitting, you'll join our waiting list. We'll review your application and contact you once approved.
          </p>
        </div>
      </div>
    </div>
  );
}
