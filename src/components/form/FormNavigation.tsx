
import * as React from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, CreditCard } from "lucide-react";

interface FormNavigationProps {
  currentStep: number;
  canProceed: boolean;
  isLastStep: boolean;
  isProcessing?: boolean;
  onNext: () => void;
  onPrevious: () => void;
}

export function FormNavigation({
  currentStep,
  canProceed,
  isLastStep,
  isProcessing = false,
  onNext,
  onPrevious
}: FormNavigationProps) {
  return (
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
  );
}
