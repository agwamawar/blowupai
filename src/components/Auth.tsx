
import * as React from "react";
import { useNavigate } from "react-router-dom";
import { MultiStepForm } from "@/components/MultiStepForm";
import { PersonalDetailsStep } from "@/components/PersonalDetailsStep";
import { DiscoveryStep } from "@/components/DiscoveryStep";
import { OptionalInsightStep } from "@/components/OptionalInsightStep";
import { PaymentStep } from "@/components/PaymentStep";

export function Auth() {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [formData, setFormData] = React.useState({
    // Step 1: Personal Info
    fullName: "",
    email: "",
    country: "",
    // Step 2: Discovery & Intent
    howDidYouHear: "",
    goals: "",
    // Step 3: Optional Insight
    biggestChallenge: "",
    feedbackCall: "",
  });
  
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState("");
  const navigate = useNavigate();

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNext = () => {
    if (currentStep < 3) {
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
      return Boolean(formData.fullName && formData.email && formData.country);
    }
    if (currentStep === 1) {
      // Discovery validation
      return Boolean(formData.howDidYouHear && formData.goals);
    }
    if (currentStep === 2) {
      // Optional step - always can proceed
      return true;
    }
    if (currentStep === 3) {
      // Payment step - always can proceed to payment
      return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentStep !== 3) return;
    
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
        accessLevel: "lifetime",
        amount: 99
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
      formData={{
        fullName: formData.fullName,
        email: formData.email,
        country: formData.country
      }} 
      onChange={handleInputChange} 
    />,
    <DiscoveryStep 
      key="discovery"
      formData={{
        howDidYouHear: formData.howDidYouHear,
        goals: formData.goals
      }}
      onChange={handleInputChange} 
    />,
    <OptionalInsightStep 
      key="insight"
      formData={{
        biggestChallenge: formData.biggestChallenge,
        feedbackCall: formData.feedbackCall
      }}
      onChange={handleInputChange} 
    />,
    <PaymentStep 
      key="payment"
      error={error}
    />
  ];

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <form onSubmit={handleSubmit}>
        <MultiStepForm
          currentStep={currentStep}
          totalSteps={4}
          onNext={handleNext}
          onPrevious={handlePrevious}
          canProceed={canProceedFromStep()}
          isLastStep={currentStep === 3}
          isProcessing={isProcessing}
        >
          {steps}
        </MultiStepForm>
      </form>
    </div>
  );
}
