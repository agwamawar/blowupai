
import * as React from "react";
import { CreditCard, Shield, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentStepProps {
  error?: string;
}

export function PaymentStep({ error }: PaymentStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold flex items-center justify-center mb-2">
          <span className="mr-2">💳</span>
          Step 4: Secure Lifetime Access
        </h3>
        <p className="text-muted-foreground">🎉 You're almost done!</p>
      </div>

      {error && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Summary Message */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 text-center">
        <h4 className="text-lg font-semibold mb-3">Thank you!</h4>
        <p className="text-muted-foreground mb-4">
          To complete your reservation, proceed with a one-time payment of <span className="font-bold text-primary">$99</span> for lifetime access.
        </p>
        <div className="text-sm text-muted-foreground">
          <Shield className="h-4 w-4 inline mr-1" />
          This offer is fully refundable until launch
        </div>
      </div>

      {/* Benefits Summary */}
      <div className="bg-white/50 rounded-lg p-4 border">
        <div className="flex items-center justify-center mb-3">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="font-semibold">Lifetime Access Benefits</span>
        </div>
        <div className="space-y-2 text-sm">
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Unlimited video analysis</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Priority customer support</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>All future features included</span>
          </div>
          <div className="flex items-center">
            <span className="text-green-500 mr-2">✓</span>
            <span>Early access to new tools</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-center text-sm text-muted-foreground">
        <Shield className="h-4 w-4 inline mr-1" />
        Your payment information is encrypted and secure
      </div>
    </div>
  );
}
