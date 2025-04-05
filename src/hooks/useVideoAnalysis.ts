
import { useState, useEffect } from "react";
import { useAnalysisState } from "./analysis/useAnalysisState";
import { useProgressSimulation } from "./analysis/useProgressSimulation";
import { useAnalysisNotifications } from "./analysis/useAnalysisNotifications";
import { useVideoAnalysisExecutor } from "./analysis/useVideoAnalysisExecutor";

export interface VideoMetadata {
  duration: number;
  resolution: string;
  frameRate?: number;
  fileSize: number;
  format: string;
}

export function useVideoAnalysis(
  onAnalysisComplete: (analysisData: any) => void
) {
  const [videoFrames, setVideoFrames] = useState<string[]>([]);
  
  const {
    isLoading,
    analysisProgress,
    analysisStage,
    setAnalysisStage,
    resetAnalysisState,
    initializeAnalysis,
    setAnalysisProgress
  } = useAnalysisState();

  const {
    startProgressSimulation,
    clearProgressInterval,
    completeProgress,
    progressIntervalRef
  } = useProgressSimulation(setAnalysisProgress, setAnalysisStage);

  const {
    showSuccessToast,
    showErrorToast,
    navigateToDashboard
  } = useAnalysisNotifications();

  const {
    performAnalysis,
    extractFramesForAnalysis,
    prepareVideoForAnalysis
  } = useVideoAnalysisExecutor({ setAnalysisStage });

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      clearProgressInterval();
    };
  }, [clearProgressInterval]);

  const beginAnalysis = async (
    file: File,
    platform: string,
    contentType: string[],
    followerCount: number,
    videoMetadata: VideoMetadata | null,
    videoDuration: number
  ) => {
    // Declare videoUrl variable at the top to avoid scope issues
    let videoUrl = '';
    
    try {
      initializeAnalysis();

      // Prepare video for analysis
      videoUrl = await prepareVideoForAnalysis(file);
      
      // Extract frames
      const frames = await extractFramesForAnalysis(videoUrl, videoMetadata?.frameRate);
      setVideoFrames(frames);
      
      // Start progress simulation
      startProgressSimulation();

      try {
        // Run the analysis
        const analysisData = await performAnalysis(
          videoUrl,
          file,
          platform,
          contentType,
          followerCount,
          videoMetadata,
          frames
        );

        // Complete progress to 100%
        completeProgress();

        // Short delay to show completion
        await new Promise(resolve => setTimeout(resolve, 800));

        // Reset states
        resetAnalysisState();

        // Call onAnalyze with the analysis data before navigating
        onAnalysisComplete(analysisData);

        // Show success toast
        showSuccessToast(videoMetadata, videoDuration);

        // Navigate to dashboard - must happen after onAnalyze
        navigateToDashboard();
      } catch (error: any) {
        console.error("[Analysis Error]", {
          stage: analysisStage,
          progress: analysisProgress,
          error: error.message,
          stack: error.stack
        });
        clearProgressInterval();
        resetAnalysisState();
        showErrorToast(error);
      }
    } catch (error: any) {
      console.error('[Video Analysis Error]', {
        videoUrl,
        error: error.message,
        stack: error.stack,
        context: {
          stage: analysisStage,
          progress: analysisProgress
        }
      });
      clearProgressInterval();
      resetAnalysisState();
      showErrorToast(error);
    }
  };

  return {
    isLoading,
    analysisProgress,
    analysisStage,
    beginAnalysis
  };
}
