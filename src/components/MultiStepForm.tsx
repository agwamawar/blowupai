
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

interface MultiStepFormProps {
  children: React.ReactNode[];
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  isLastStep: boolean;
  isProcessing?: boolean;
}

export function MultiStepForm({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  canProceed,
  isLastStep,
  isProcessing = false
}: MultiStepFormProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const stepLabels = ["Basic Info", "About You", "Optional Insight", "Payment"];

  // Copy content for each step's right column
  const stepCopyContent = [
    // Step 1: Basic Info
    {
      title: "Welcome to BlowUp AI",
      subtitle: "Get early access to our exclusive features before launch.",
      sections: [
        {
          heading: "Why we need this",
          content: "We'll send your access and updates to your email once we launch in a few months."
        },
        {
          heading: "100% secure & spam-free",
          content: ""
        }
      ]
    },
    // Step 2: About You
    {
      title: "Help us understand you",
      subtitle: "The more we know about what you need, the better we can serve you.",
      sections: [
        {
          heading: "Built for our earliest users",
          content: "We use this info to shape features you actually want."
        }
      ]
    },
    // Step 3: Optional Insight
    {
      title: "You're shaping the future of this app",
      subtitle: "We'll be in touch with a few selected users for early access feedback calls.",
      sections: [
        {
          heading: "Your voice matters",
          content: "This is your chance to influence what we build next."
        }
      ]
    },
    // Step 4: Payment
    {
      title: "Lifetime deal: $99 only",
      subtitle: "Pay once, access forever — no subscriptions, no surprises.",
      sections: [
        {
          heading: "What you get:",
          content: "✔ Early access\n✔ Exclusive features\n✔ Direct input on product development"
        },
        {
          heading: "100% money-back guarantee before launch",
          content: ""
        }
      ]
    }
  ];

  const currentCopy = stepCopyContent[currentStep];

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6 rounded-t-lg">
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-primary-gradient mb-2">
            Secure Your Lifetime Access
          </h2>
          <p className="text-muted-foreground">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>
        
        <div className="space-y-2">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between text-xs text-muted-foreground">
            {stepLabels.map((label, index) => (
              <span key={label} className={index === currentStep ? "font-medium text-primary" : ""}>
                {label}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left Column - Form Content */}
        <Card className="border-0 border-r border-primary/10 rounded-none">
          <div className="p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-2">
                Step {currentStep + 1} of {totalSteps}: {stepLabels[currentStep]}
              </h3>
            </div>
            
            {/* Form Content */}
            <div className="mb-8">
              {children[currentStep]}
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-6 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                Previous
              </Button>

              <Button
                type={isLastStep ? "submit" : "button"}
                onClick={isLastStep ? undefined : onNext}
                disabled={!canProceed || isProcessing}
                className="flex items-center gap-2 bg-gradient-to-br from-[#9c5c64] to-black hover:opacity-90 text-white"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Processing...
                  </>
                ) : isLastStep ? (
                  <>
                    <CreditCard className="h-4 w-4" />
                    Proceed to Payment 🔒
                  </>
                ) : (
                  <>
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>

            {/* Step 4 additional note */}
            {isLastStep && (
              <div className="pt-4 text-center text-xs text-muted-foreground">
                100% refund available before launch
              </div>
            )}
          </div>
        </Card>

        {/* Right Column - Persuasive Copy */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 p-8 flex flex-col justify-center">
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">
                {currentCopy.title}
              </h2>
              <p className="text-lg text-muted-foreground">
                {currentCopy.subtitle}
              </p>
            </div>

            <div className="space-y-4">
              {currentCopy.sections.map((section, index) => (
                <div key={index}>
                  <h4 className="font-semibold text-foreground mb-2">
                    {section.heading}
                  </h4>
                  {section.content && (
                    <div className="text-muted-foreground whitespace-pre-line">
                      {section.content}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust indicators */}
            <div className="pt-6 border-t border-primary/20">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-green-500">🔒</span>
                <span>Your information is encrypted and secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
