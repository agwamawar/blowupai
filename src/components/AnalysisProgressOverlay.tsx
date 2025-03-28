import { ReactNode } from "react";

interface AnalysisProgressOverlayProps {
  isLoading: boolean;
  analysisProgress: number;
  analysisStage: string | null;
  platform: string;
}

export function AnalysisProgressOverlay({
  isLoading,
  analysisProgress,
  analysisStage,
  platform
}: AnalysisProgressOverlayProps) {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-10 pointer-events-none">
      {/* Remove the visible background or card here - just keep it for screen readers */}
      <div className="sr-only">
        <p>Analyzing {platform} video: {analysisProgress}% complete</p>
        <p>Current stage: {analysisStage}</p>
      </div>
    </div>
  );
}
