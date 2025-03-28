
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { analysisStages, getVideoUrl, extractVideoFrames } from "@/services/videoAnalysisService";
import { AgentOrchestrator } from "@/services/agents/AgentOrchestrator";

export interface VideoMetadata {
  duration: number;
  resolution: string;
  frameRate?: number;
  fileSize: number;
  format: string;
}

interface VideoAnalysisState {
  isLoading: boolean;
  analysisProgress: number;
  analysisStage: string | null;
}

export function useVideoAnalysis(
  onAnalysisComplete: (analysisData: any) => void
) {
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  const { toast } = useToast();
  const [videoFrames, setVideoFrames] = useState<string[]>([]);
  const navigate = useNavigate();
  const progressIntervalRef = useRef<number | null>(null);
  const orchestrator = new AgentOrchestrator();

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const beginAnalysis = async (
    file: File,
    platform: string,
    contentType: string[],
    followerCount: number,
    videoMetadata: VideoMetadata | null,
    videoDuration: number
  ) => {
    try {
      setIsLoading(true);
      setAnalysisProgress(0);
      setAnalysisStage(analysisStages[0]);

      const videoUrl = await getVideoUrl(file);
      console.log('Video ready for analysis:', videoUrl);

      setAnalysisStage(analysisStages[2]);

      const framesPerSecond = videoMetadata?.frameRate && videoMetadata.frameRate > 30 
        ? 5  // Lower sampling rate for high frame rate videos
        : 10; // Standard sampling rate

      const frames = await extractVideoFrames(videoUrl, framesPerSecond, true);
      setVideoFrames(frames);
      console.log(`Extracted ${frames.length} frames for analysis`);

      const metadata = {
        platform,
        content_type: contentType.join(', '),
        follower_count: followerCount,
        duration: videoMetadata?.duration || videoDuration || 0,
        resolution: videoMetadata?.resolution || '0x0',
        frame_rate: videoMetadata?.frameRate || 30,
        filename: file.name,
        filesize: file.size,
        filetype: file.type,
        last_modified: file.lastModified,
        total_frames: frames.length,
        creation_date: new Date().toISOString()
      };

      console.log('Analysis metadata:', metadata);

      // Start from first stage
      let stageIndex = 0;
      setAnalysisStage(analysisStages[stageIndex]);

      // Clear any existing interval
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      // Calculate progress increment based on total stages
      const progressIncrement = Math.floor(100 / analysisStages.length);

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

      try {
        // Run the actual analysis
        const analysisData = await orchestrator.analyzeVideo(videoUrl, {
          ...metadata,
          frames: frames
        });

        if (!analysisData) throw new Error("No analysis data returned");

        // Ensure we clear the interval before proceeding
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }

        // Force progress to 100% and set final stage
        setAnalysisStage(analysisStages[analysisStages.length - 1]);
        setAnalysisProgress(100);

        // Short delay to show completion
        await new Promise(resolve => setTimeout(resolve, 800));

        // Reset states
        setIsLoading(false);
        setAnalysisStage(null);
        setAnalysisProgress(0);

        // Important: Call onAnalyze with the analysis data before navigating
        onAnalysisComplete(analysisData);

        // Show success toast
        toast({
          title: "Analysis completed",
          description: `Your ${videoMetadata?.duration.toFixed(1) || videoDuration.toFixed(1)}s video analysis is ready to view.`,
        });

        // Navigate to dashboard - must happen after onAnalyze
        setTimeout(() => {
          navigate('/dashboard');
        }, 100);
      } catch (error: any) {
        console.error("Analysis failed:", error);

        // Clean up interval
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }

        // Reset states
        setIsLoading(false);
        setAnalysisStage(null);
        setAnalysisProgress(0);

        toast({
          title: "Error",
          description: error.message || "Analysis failed",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      console.error('Analysis error:', error);

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }

      setIsLoading(false);
      setAnalysisStage(null);
      setAnalysisProgress(0);

      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred during video processing",
        variant: "destructive",
      });
    }
  };

  return {
    isLoading,
    analysisProgress,
    analysisStage,
    beginAnalysis
  };
}
