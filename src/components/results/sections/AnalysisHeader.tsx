
import React from "react";
import { BarChart } from "lucide-react";

export function AnalysisHeader() {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold tracking-tight mb-2 text-left flex items-center gap-2">
        <BarChart className="h-8 w-8 text-primary" />
        📊 Your Analysis Results
      </h1>
      <p className="text-muted-foreground text-left">
        Here's how your content performed across key dimensions.
      </p>
    </div>
  );
}
