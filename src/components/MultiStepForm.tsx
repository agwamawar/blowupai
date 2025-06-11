
import * as React from "react";
import { FormHeader } from "@/components/form/FormHeader";
import { FormNavigation } from "@/components/form/FormNavigation";
import { FormCopySection } from "@/components/form/FormCopySection";
import { stepCopyContent } from "@/components/form/stepCopyContent";

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
  const stepLabels = ["Basic Info", "About You", "Optional Insight", "Payment"];
  const currentCopy = stepCopyContent[currentStep];

  return (
    <div className="w-full max-w-6xl mx-auto bg-white">
      <FormHeader currentStep={currentStep} totalSteps={totalSteps} />

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
        {/* Left Column - Form Content */}
        <div className="border-r border-gray-200 p-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-2">
              Step {currentStep + 1} of {totalSteps}: {stepLabels[currentStep]}
            </h3>
          </div>
          
          {/* Form Content */}
          <div className="mb-8">
            {children[currentStep]}
          </div>

          <FormNavigation
            currentStep={currentStep}
            canProceed={canProceed}
            isLastStep={isLastStep}
            isProcessing={isProcessing}
            onNext={onNext}
            onPrevious={onPrevious}
          />
        </div>

        {/* Right Column - Persuasive Copy */}
        <FormCopySection content={currentCopy} />
      </div>
    </div>
  );
}
