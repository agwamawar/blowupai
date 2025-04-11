
import { useState } from 'react';

export interface VideoAnalysisState {
  isAnalyzing: boolean;
  progress: number;
  stage: string | null;
  error: string | null;
}

export function useVideoAnalysis() {
  const [state, setState] = useState<VideoAnalysisState>({
    isAnalyzing: false,
    progress: 0,
    stage: null,
    error: null
  });

  const startAnalysis = () => {
    setState({
      isAnalyzing: true,
      progress: 0,
      stage: 'Initializing analysis',
      error: null
    });
  };

  const updateProgress = (progress: number, stage: string) => {
    setState(prev => ({
      ...prev,
      progress,
      stage
    }));
  };

  const completeAnalysis = () => {
    setState(prev => ({
      ...prev,
      isAnalyzing: false,
      progress: 100,
      stage: 'Analysis complete'
    }));
  };

  const failAnalysis = (error: string) => {
    setState({
      isAnalyzing: false,
      progress: 0,
      stage: null,
      error
    });
  };

  return {
    analysisState: state,
    startAnalysis,
    updateProgress,
    completeAnalysis,
    failAnalysis
  };
}
