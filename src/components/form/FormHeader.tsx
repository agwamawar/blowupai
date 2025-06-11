
import * as React from "react";

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export function FormHeader({ currentStep, totalSteps }: FormHeaderProps) {
  return (
    <div className="p-6 border-b border-gray-200">
      <div className="flex items-center gap-4">
        {/* Logo */}
        <img 
          src="/lovable-uploads/3f844a38-e2b2-4c57-aa55-fe677847d364.png" 
          alt="BlowUp AI Logo" 
          className="w-10 h-10"
        />
        <h1 className="text-lg font-bold text-foreground">
          Pay $99 to use BlowUp AI forever
        </h1>
      </div>
    </div>
  );
}
