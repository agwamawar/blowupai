
import { useRef, useCallback } from "react";
import { analysisStages } from "@/services/videoAnalysisService";

/**
 * Hook to manage progress simulation during analysis
 */
export function useProgressSimulation(
  setAnalysisProgress: (value: React.SetStateAction<number>) => void,
  setAnalysisStage: (value: React.SetStateAction<string | null>) => void
) {
  const progressIntervalRef = useRef<number | null>(null);
  
  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startProgressSimulation = useCallback(() => {
    // Clear any existing interval
    clearProgressInterval();

    // Calculate progress increment based on total stages
    const progressIncrement = Math.floor(100 / analysisStages.length);
    let stageIndex = 0;
    
    // Start progress simulation
    progressIntervalRef.current = window.setInterval(() => {
      setAnalysisProgress(prev => {
        // Don't exceed next stage threshold
        const nextThreshold = (stageIndex + 1) * progressIncrement;
        const newProgress = Math.min(prev + 5, nextThreshold);

        // Move to next stage if we hit the threshold
        if (newProgress >= nextThreshold && stageIndex < analysisStages.length - 1) {
          stageIndex++;
          setAnalysisStage(analysisStages[stageIndex]);
        }

        return newProgress;
      });
    }, 300);
  }, [clearProgressInterval, setAnalysisProgress, setAnalysisStage]);

  const completeProgress = useCallback(() => {
    clearProgressInterval();
    setAnalysisStage(analysisStages[analysisStages.length - 1]);
    setAnalysisProgress(100);
  }, [clearProgressInterval, setAnalysisProgress, setAnalysisStage]);

  return {
    startProgressSimulation,
    clearProgressInterval,
    completeProgress,
    progressIntervalRef
  };
}
