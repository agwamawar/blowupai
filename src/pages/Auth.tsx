import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SlotCounter } from "@/components/SlotCounter";
import { Check, Clock, X } from "lucide-react";

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
            <SlotCounter />
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold">Lifetime Access 🔥</h2>
          <p className="text-muted-foreground mt-2">One-time payment, full access forever</p>
          <div className="mt-4 text-xl font-semibold text-primary">$99 Now <span className="text-sm text-muted-foreground">(Only 100 Spots Available)</span></div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Unlimited video breakdowns</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Content optimization</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Trending content data</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Engagement simulation</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Personalized viral strategies</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>VIP creator support</span>
            </li>
          </ul>
          <p className="mt-4 text-sm font-medium text-muted-foreground">⚡ No subscriptions. No extra fees.</p>
          <Button className="w-full mt-6" onClick={handleSubmit} disabled={loading}>
            Pay Once Forever
          </Button>
        </div>
      </Card>

      <Card className="w-full max-w-sm overflow-hidden group relative transition-all duration-300 hover:shadow-xl border-primary/20">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-2 rounded-full">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <span className="font-bold text-foreground tracking-wide">FREE ACCESS</span>
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold">Free Sign-Up 🚀</h2>
          <p className="text-muted-foreground mt-2">Get started for free, but with limits</p>
          <div className="mt-4 text-xl font-semibold text-primary">$0 Now <span className="text-sm text-muted-foreground">($39/month after launch)</span></div>
          <ul className="mt-4 space-y-2">
            <li className="flex items-center gap-2">
              <Check className="h-5 w-5 text-primary" />
              <span>Early launch updates</span>
            </li>
          </ul>
          <div className="flex-grow"></div>
          <div className="mt-[150px]"></div>
          <p className="mt-4 text-sm font-medium text-muted-foreground">⚠️ Full access could cost up to $350/month after launch.</p>
          <Button variant="outline" className="w-full mt-6" onClick={handleSubmit} disabled={loading}>
            Sign Up for Free
          </Button>
        </div>
      </Card>
    </div>
  );
}