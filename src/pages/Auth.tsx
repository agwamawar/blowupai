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
    <div className="min-h-screen flex items-center justify-center bg-white/5 p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6">
        {/* Special Offer Card */}
        <Card className="w-full md:w-1/2 overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
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
            <h2 className="text-3xl font-bold">$99 Forever</h2>
            <p className="text-muted-foreground mt-2">Early adopter special price - never pay more!</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Save $500+ compared to regular pricing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Unlimited video analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary" />
                <span>Priority support & updates</span>
              </li>
            </ul>
            <Button className="w-full mt-6" onClick={handleSubmit} disabled={loading}>
              Sign Up
            </Button>
          </div>
        </Card>

        {/* Free Sign Up Card */}
        <Card className="w-full md:w-1/2 overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-primary" />
                </div>
                <span className="font-bold text-foreground tracking-wide">FREE TRIAL</span>
              </div>
              <div className="bg-primary/10 px-3 py-1.5 rounded-full text-sm font-semibold text-primary border border-primary/20">
                Limited Access
              </div>
            </div>
          </div>
          <div className="p-6">
            <h2 className="text-3xl font-bold">Free</h2>
            <p className="text-muted-foreground mt-2">Try now, upgrade later for $600</p>
            <ul className="mt-6 space-y-4">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Basic video analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Limited features</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">Standard support</span>
              </li>
            </ul>
            <Button variant="outline" className="w-full mt-6" onClick={handleSubmit} disabled={loading}>
              Sign Up Free
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}