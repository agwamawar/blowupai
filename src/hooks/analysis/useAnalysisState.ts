
import { useState } from "react";
import { analysisStages } from "@/services/videoAnalysisService";

export interface VideoAnalysisState {
  isLoading: boolean;
  analysisProgress: number;
  analysisStage: string | null;
}

/**
 * Hook to manage analysis state
 */
export function useAnalysisState() {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  
  const resetAnalysisState = () => {
    setIsLoading(false);
    setAnalysisStage(null);
    setAnalysisProgress(0);
  };

  const initializeAnalysis = () => {
    setIsLoading(true);
    setAnalysisProgress(0);
    setAnalysisStage(analysisStages[0]);
  };

  return {
    isLoading,
    analysisProgress,
    analysisStage,
    setIsLoading,
    setAnalysisProgress,
    setAnalysisStage,
    resetAnalysisState,
    initializeAnalysis
  };
}
