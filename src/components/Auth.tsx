import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CreditCard, Shield, Star, Check } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export function Auth() {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    role: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    city: "",
    postalCode: "",
    country: ""
  });
  
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsProcessing(true);

    try {
      // Simulate payment processing
      console.log("Processing lifetime access payment for:", formData);
      
      // Mock successful payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Store user data in localStorage for now
      localStorage.setItem("lifetimeAccessUser", JSON.stringify({
        ...formData,
        purchaseDate: new Date().toISOString(),
        accessLevel: "lifetime"
      }));
      
      // Redirect to success page or main app
      navigate('/');
    } catch (error: any) {
      console.error("Payment processing error:", error);
      setError("Payment processing failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-2xl overflow-hidden border-primary/10 shadow-lg">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-primary-gradient mb-2">
              Secure Your Lifetime Access
            </h2>
            <p className="text-muted-foreground">
              Join the exclusive early access program for BlowUp AI
            </p>
          </div>
          
          {/* Lifetime Access Benefits */}
          <div className="mt-6 bg-white/50 rounded-lg p-4">
            <div className="flex items-center justify-center mb-3">
              <Star className="h-5 w-5 text-yellow-500 mr-2" />
              <span className="font-semibold text-lg">Lifetime Access - $299</span>
              <Star className="h-5 w-5 text-yellow-500 ml-2" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Unlimited video analysis</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Priority customer support</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>All future features included</span>
              </div>
              <div className="flex items-center">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Early access to new tools</span>
              </div>
            </div>
          </div>
        </div>

        {error && (
          <Alert className="m-6 border-destructive/50 bg-destructive/10">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold flex items-center">
              <Shield className="h-5 w-5 mr-2 text-primary" />
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="company">Company/Organization</Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="role">Professional Role</Label>
                <Input
                  id="role"
                  name="role"
                  type="text"
                  value={formData.role}
                  onChange={handleInputChange}
                  placeholder="e.g., Content Creator, Marketing Manager"
                  className="mt-1"
                />
              </div>
            </div>
          </div>

          <Separator />

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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                  onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
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
                    onChange={handleInputChange}
                    required
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-6">
            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full bg-gradient-to-br from-[#9c5c64] to-black hover:opacity-90 text-white text-lg py-6"
            >
              {isProcessing ? (
                <>
                  <div className="animate-spin h-5 w-5 mr-2 border-2 border-white border-t-transparent rounded-full" />
                  Processing Payment...
                </>
              ) : (
                <>
                  <CreditCard className="mr-2 h-5 w-5" />
                  Secure Lifetime Access - $299
                </>
              )}
            </Button>
          </div>

          {/* Security Notice */}
          <div className="text-center text-sm text-muted-foreground">
            <Shield className="h-4 w-4 inline mr-1" />
            Your payment information is encrypted and secure
          </div>
        </form>
      </Card>
    </div>
  );
}
