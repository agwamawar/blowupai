
import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

  return (
    <Card className="w-full max-w-2xl overflow-hidden border-primary/10 shadow-lg">
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-6">
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
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Personal Details</span>
            <span>Payment</span>
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {children[currentStep]}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center p-6 pt-0">
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
            "Complete Purchase - $299"
          ) : (
            <>
              Continue
              <ChevronRight className="h-4 w-4" />
            </>
          )}
        </Button>
      </div>
    </Card>
  );
}
