
import * as React from "react";
import { Shield, CreditCard } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PaymentStepProps {
  error?: string;
  onConfirmationChange: (confirmed: boolean) => void;
  isConfirmed: boolean;
}

export function PaymentStep({ error, onConfirmationChange, isConfirmed }: PaymentStepProps) {
  const [paymentData, setPaymentData] = React.useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setPaymentData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Auto-confirm if all required fields are filled
    const allFieldsFilled = Object.values({...paymentData, [field]: value}).every(val => val.trim() !== "");
    onConfirmationChange(allFieldsFilled);
  };

  return (
    <div className="space-y-6">
      {error && (
        <Alert className="border-destructive/50 bg-destructive/10">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Payment Method Header */}
      <div className="flex items-center gap-2 mb-4">
        <CreditCard className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold">Payment Details</h3>
      </div>

      {/* Card Information */}
      <div className="space-y-4">
        <div>
          <Label htmlFor="cardNumber" className="text-sm font-medium">
            Card Number
          </Label>
          <Input
            id="cardNumber"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={paymentData.cardNumber}
            onChange={(e) => handleInputChange("cardNumber", e.target.value)}
            className="mt-1"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="expiryDate" className="text-sm font-medium">
              Expiry Date
            </Label>
            <Input
              id="expiryDate"
              type="text"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={(e) => handleInputChange("expiryDate", e.target.value)}
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="cvv" className="text-sm font-medium">
              CVV
            </Label>
            <Input
              id="cvv"
              type="text"
              placeholder="123"
              value={paymentData.cvv}
              onChange={(e) => handleInputChange("cvv", e.target.value)}
              className="mt-1"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="cardholderName" className="text-sm font-medium">
            Cardholder Name
          </Label>
          <Input
            id="cardholderName"
            type="text"
            placeholder="John Doe"
            value={paymentData.cardholderName}
            onChange={(e) => handleInputChange("cardholderName", e.target.value)}
            className="mt-1"
          />
        </div>
      </div>

      {/* Security Notice */}
      <div className="text-center text-sm text-muted-foreground border-t pt-4">
        <Shield className="h-4 w-4 inline mr-1" />
        Your payment information is encrypted and secure
      </div>
    </div>
  );
}
