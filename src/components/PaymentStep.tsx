
import * as React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface PaymentStepProps {
  formData: {
    cardNumber: string;
    expiryDate: string;
    cvv: string;
    billingAddress: string;
    city: string;
    postalCode: string;
    country: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function PaymentStep({ formData, onChange, error }: PaymentStepProps) {
  return (
    <div className="space-y-6">
      {error && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Payment Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold flex items-center">
          <CreditCard className="h-5 w-5 mr-2 text-primary" />
          Payment Information
        </h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="cardNumber">Card Number *</Label>
            <Input
              id="cardNumber"
              name="cardNumber"
              type="text"
              value={formData.cardNumber}
              onChange={onChange}
              placeholder="1234 5678 9012 3456"
              required
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiryDate">Expiry Date *</Label>
              <Input
                id="expiryDate"
                name="expiryDate"
                type="text"
                value={formData.expiryDate}
                onChange={onChange}
                placeholder="MM/YY"
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="cvv">CVV *</Label>
              <Input
                id="cvv"
                name="cvv"
                type="text"
                value={formData.cvv}
                onChange={onChange}
                placeholder="123"
                required
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Billing Address */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Billing Address</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="billingAddress">Street Address *</Label>
            <Input
              id="billingAddress"
              name="billingAddress"
              type="text"
              value={formData.billingAddress}
              onChange={onChange}
              required
              className="mt-1"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={onChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="postalCode">Postal Code *</Label>
              <Input
                id="postalCode"
                name="postalCode"
                type="text"
                value={formData.postalCode}
                onChange={onChange}
                required
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="country">Country *</Label>
              <Input
                id="country"
                name="country"
                type="text"
                value={formData.country}
                onChange={onChange}
                required
                className="mt-1"
              />
            </div>
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
