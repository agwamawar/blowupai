
import * as React from "react";
import { Progress } from "@/components/ui/progress";

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function FormHeader({ currentStep, totalSteps }: FormHeaderProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const stepLabels = ["Basic Info", "About You", "Optional Insight", "Payment"];

  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center justify-center gap-4">
        {/* Logo placeholder - you can replace this with actual logo */}
        <div className="w-10 h-10 bg-gradient-to-br from-[#9c5c64] to-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Pay $99 to use BlowUp AI forever
        </h1>
      </div>
      
      <div className="mt-6 space-y-2">
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
  );
}
