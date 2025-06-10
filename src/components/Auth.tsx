
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MultiStepForm } from "@/components/MultiStepForm";
import { PersonalDetailsStep } from "@/components/PersonalDetailsStep";
import { PaymentStep } from "@/components/PaymentStep";

export function Auth() {
  const [currentStep, setCurrentStep] = React.useState(0);
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

  const handleNext = () => {
    if (currentStep < 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceedFromStep = (): boolean => {
    if (currentStep === 0) {
      // Personal details validation
      return Boolean(formData.firstName && formData.lastName && formData.email);
    }
    if (currentStep === 1) {
      // Payment details validation
      return Boolean(formData.cardNumber && formData.expiryDate && formData.cvv && 
             formData.billingAddress && formData.city && formData.postalCode && formData.country);
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 1) return;
    
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

  const steps = [
    <PersonalDetailsStep 
      key="personal"
      formData={formData} 
      onChange={handleInputChange} 
    />,
    <PaymentStep 
      key="payment"
      formData={formData} 
      onChange={handleInputChange} 
      error={error}
    />
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <MultiStepForm
          currentStep={currentStep}
          totalSteps={2}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canProceed={canProceedFromStep()}
          isLastStep={currentStep === 1}
          isProcessing={isProcessing}
        >
          {steps}
        </MultiStepForm>
      </form>
    </div>
  );
}
