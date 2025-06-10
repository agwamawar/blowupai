
import * as React from "react";
import { Shield } from "lucide-react";
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
      {error && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Payment Summary */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-6 text-center border">
        <div className="text-4xl font-bold text-primary mb-2">$99</div>
        <p className="text-lg font-semibold mb-2">Lifetime Access</p>
        <p className="text-sm text-muted-foreground">
          One-time payment • No subscriptions
        </p>
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
