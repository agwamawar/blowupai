
import { useCallback } from "react";
import { getVideoUrl, extractVideoFrames } from "@/services/videoAnalysisService";
import { AgentOrchestrator } from "@/services/agents/AgentOrchestrator";
import { VideoMetadata } from "@/hooks/useVideoAnalysis";

const orchestrator = new AgentOrchestrator();

interface UseVideoAnalysisExecutorProps {
  setAnalysisStage: (stage: string | null) => void;
}

/**
 * Hook with logic for executing video analysis
 */
export function useVideoAnalysisExecutor({ setAnalysisStage }: UseVideoAnalysisExecutorProps) {
  const performAnalysis = useCallback(async (
    videoUrl: string, 
    file: File,
    platform: string,
    contentType: string[],
    followerCount: number,
    videoMetadata: VideoMetadata | null,
    videoFrames: string[],
  ) => {
    console.log('Video ready for analysis:', videoUrl);
    
    // Create metadata object for analysis
    const metadata = {
      platform,
      content_type: contentType.join(', '),
      follower_count: followerCount,
      duration: videoMetadata?.duration || 0,
      resolution: videoMetadata?.resolution || '0x0',
      frame_rate: videoMetadata?.frameRate || 30,
      filename: file.name,
      filesize: file.size,
      filetype: file.type,
      last_modified: file.lastModified,
      total_frames: videoFrames.length,
      creation_date: new Date().toISOString()
    };

    console.log('Analysis metadata:', metadata);
    
    // Run the actual analysis
    const analysisData = await orchestrator.analyzeVideo(videoUrl, {
      ...metadata,
      frames: videoFrames
    });

    if (!analysisData) throw new Error("No analysis data returned");
    
    return analysisData;
  }, []);

  const extractFramesForAnalysis = useCallback(async (videoUrl: string, frameRate?: number) => {
    const framesPerSecond = frameRate && frameRate > 30 
      ? 5  // Lower sampling rate for high frame rate videos
      : 10; // Standard sampling rate

    const frames = await extractVideoFrames(videoUrl, framesPerSecond, true);
    console.log(`Extracted ${frames.length} frames for analysis`);
    return frames;
  }, []);

  const prepareVideoForAnalysis = useCallback(async (file: File) => {
    const videoUrl = await getVideoUrl(file);
    return videoUrl;
  }, []);

  return {
    performAnalysis,
    extractFramesForAnalysis,
    prepareVideoForAnalysis
  };
}
