
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Clock, CreditCard, Shield } from "lucide-react";

export default function Auth() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    // Submit logic here
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white/5 p-4">
      <div className="w-full max-w-4xl flex gap-6 flex-col md:flex-row">
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
                Save 80%
              </div>
            </div>
          </div>
          
          <CardHeader className="pt-6 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Lifetime Access Pass</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-bold text-primary">$99.99</span>
              <span className="text-sm text-gray-500 line-through">$499.99</span>
            </div>
            
            <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Unlimited video analysis forever</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Advanced AI insights & recommendations</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Priority support & future updates</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Save $400 compared to launch price</span>
              </div>
            </div>
            
            <div className="flex justify-center items-center gap-2 text-sm text-gray-600">
              <CreditCard className="h-4 w-4" />
              <span>One-time payment, lifetime access!</span>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 pb-6">
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full py-6 text-lg font-medium bg-primary/90 hover:bg-primary transition-all duration-300 text-primary-foreground"
            >
              {loading ? "Processing..." : "Sign Up Now"}
            </Button>
            
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>Secure payment • 30-day money-back guarantee</span>
            </div>
          </CardFooter>
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

          <CardHeader className="pt-6 pb-4">
            <CardTitle className="text-2xl font-bold text-center">Basic Access</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <div className="flex items-baseline justify-center gap-2">
              <span className="text-3xl font-bold">$0</span>
              <span className="text-sm text-gray-500">now</span>
              <span className="text-xs text-gray-500">(up to $600 at launch)</span>
            </div>
            
            <div className="space-y-3 bg-primary/5 p-4 rounded-lg">
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Limited video analysis (3 videos)</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Basic AI insights only</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Standard support</span>
              </div>
              <div className="flex items-start gap-3">
                <Check className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-600">Pay full price at launch ($600)</span>
              </div>
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3 pb-6">
            <Button 
              onClick={handleSubmit} 
              disabled={loading}
              variant="outline"
              className="w-full py-6 text-lg font-medium hover:bg-primary/5 transition-all duration-300"
            >
              {loading ? "Processing..." : "Try For Free"}
            </Button>
            
            <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
              <Shield className="h-3 w-3" />
              <span>No credit card required</span>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
