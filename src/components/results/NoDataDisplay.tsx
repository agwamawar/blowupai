
import React from "react";

export function NoDataDisplay() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">No Analysis Data</h2>
        <p className="text-muted-foreground mb-6">
          Please upload a video to analyze first.
        </p>
      </div>
    </div>
  );
}
