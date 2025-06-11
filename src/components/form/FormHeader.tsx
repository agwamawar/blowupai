
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
        <div className="w-10 h-10 bg-gradient-to-br from-[#9c5c64] to-black rounded-lg flex items-center justify-center">
          <span className="text-white font-bold text-lg">B</span>
        </div>
        <h1 className="text-lg font-bold text-foreground">
          Pay $99 to use BlowUp AI forever
        </h1>
      </div>
    </div>
  );
}
