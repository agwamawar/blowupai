import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, CreditCard } from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Submit logic here
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center gap-6 bg-white/5 p-4">
      <Card className="w-full max-w-sm overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
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
          <div className="p-6">
            <h2 className="text-2xl font-bold">Lifetime Access 🔥</h2>
            <p className="text-muted-foreground mt-2">One-time payment, full access forever</p>
            <div className="mt-4 text-xl font-semibold text-primary">💰 $99.99 <span className="text-sm text-muted-foreground">(Will be $499.99)</span></div>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited video analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>AI-powered insights</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Trend tracking</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Performance monitoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Content optimization</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority support</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-primary font-medium">⚡ No subscriptions. No extra fees.</p>
            <Button className="w-full mt-4" onClick={handleSubmit} disabled={loading}>
              Pay Once Forever
            </Button>
          </div>
        </Card>
      <Card className="w-full max-w-sm overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-foreground tracking-wide">FREE SIGN-UP</span>
              </div>
              <div className="bg-primary/10 px-3 py-1.5 rounded-full text-sm font-semibold text-primary border border-primary/20">
                Limited Access
              </div>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-bold">Free Sign-Up 🚀</h2>
            <p className="text-muted-foreground mt-2">Get started for free, but with limits</p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Basic video analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Early launch updates</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-red-500 font-medium">⚠️ Full access could cost up to $100/month after launch.</p>
            <Button variant="outline" className="w-full mt-4" onClick={handleSubmit} disabled={loading}>
              Sign Up for Free
            </Button>
          </div>
        </Card>
      </div>
  );
}