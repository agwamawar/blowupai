
import React from "react";
import { LoaderCircle, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Step {
  id: string;
  description: string;
  isComplete: boolean;
  isActive: boolean;
}

interface AnalysisStepsProps {
  currentStep: number;
  isComplete: boolean;
}

export function AnalysisSteps({ currentStep, isComplete }: AnalysisStepsProps) {
  const steps: Step[] = [
    {
      id: "metadata",
      description: "Extracting video metadata",
      isComplete: currentStep > 0,
      isActive: currentStep === 0
    },
    {
      id: "concept",
      description: "Analyzing content structure",
      isComplete: currentStep > 1,
      isActive: currentStep === 1
    },
    {
      id: "trends",
      description: "Evaluating trend alignment",
      isComplete: currentStep > 2,
      isActive: currentStep === 2
    },
    {
      id: "complete",
      description: "Taking you to Analysis Page...",
      isComplete: isComplete,
      isActive: currentStep === 3
    }
  ];

  return (
    <div className="space-y-2 mt-4 animate-fade-in">
      {steps.map((step, index) => (
        <div
          key={step.id}
          className={cn(
            "flex items-center gap-3 text-sm transition-all duration-300",
            index > currentStep && "opacity-40",
            step.isActive && "text-primary",
            "animate-fade-in"
          )}
          style={{
            animationDelay: `${index * 0.2}s`
          }}
        >
          <div className="relative flex items-center justify-center w-5 h-5">
            {step.isComplete ? (
              <Check className="w-4 h-4 text-green-500" />
            ) : step.isActive ? (
              <LoaderCircle className="w-4 h-4 animate-spin text-primary" />
            ) : (
              <div className="w-2 h-2 rounded-full bg-muted-foreground/30" />
            )}
          </div>
          <span className="flex-1">{step.description}</span>
          {step.isComplete && step.id === "complete" && (
            <ArrowRight className="w-4 h-4 text-primary animate-pulse" />
          )}
        </div>
      ))}
    </div>
  );
}
