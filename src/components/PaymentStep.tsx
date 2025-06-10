
import * as React from "react";
import { CreditCard, Shield, Star } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface PaymentStepProps {
  error?: string;
  onConfirmationChange: (confirmed: boolean) => void;
  isConfirmed: boolean;
}

export function PaymentStep({ error, onConfirmationChange, isConfirmed }: PaymentStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-xl font-semibold flex items-center justify-center mb-2">
          <span className="mr-2">💳</span>
          Complete Your Access
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
          One-time payment of <span className="font-bold text-primary">$99</span> for lifetime access.
        </p>
        <div className="text-sm text-muted-foreground">
          <Shield className="h-4 w-4 inline mr-1" />
          Fully refundable until launch
        </div>
      </div>

      {/* Benefits Summary */}
      <div className="bg-white/50 rounded-lg p-4 border">
        <div className="flex items-center justify-center mb-3">
          <Star className="h-5 w-5 text-yellow-500 mr-2" />
          <span className="font-semibold">What You Get</span>
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

      {/* Confirmation Checkbox */}
      <div className="bg-blue-50 p-4 rounded-lg border">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="payment-confirmation" 
            checked={isConfirmed}
            onCheckedChange={(checked) => onConfirmationChange(checked === true)}
          />
          <div className="space-y-1">
            <Label 
              htmlFor="payment-confirmation" 
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I understand and agree to proceed
            </Label>
            <p className="text-xs text-muted-foreground">
              $99 lifetime access payment, fully refundable until launch.
            </p>
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
