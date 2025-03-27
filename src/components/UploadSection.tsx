import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { VideoUpload } from "./VideoUpload";
import { UploadControls } from "./UploadControls";
import { useToast } from "@/hooks/use-toast";
import { analysisStages, getVideoUrl, extractVideoFrames } from "@/services/videoAnalysisService";
import { AgentOrchestrator } from "@/services/agents/AgentOrchestrator";
import { AnalysisProgressOverlay } from "./AnalysisProgressOverlay";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState<string[]>([]); 
  const [followerCount, setFollowerCount] = useState([10000]); 
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  const { toast } = useToast();
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<{
    duration: number;
    resolution: string;
    frameRate?: number;
    fileSize: number;
    format: string;
  } | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoFrames, setVideoFrames] = useState<string[]>([]);
  const navigate = useNavigate();
  
  const orchestrator = new AgentOrchestrator();

  const progressIntervalRef = useRef<number | null>(null);

  const beginAnalysis = async () => {
    try {
      setIsLoading(true);
      setAnalysisProgress(0);
      setAnalysisStage(analysisStages[0]);
      
      const videoUrl = await getVideoUrl(file!);
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
        follower_count: followerCount[0],
        duration: videoMetadata?.duration || videoDuration || 0,
        resolution: videoMetadata?.resolution || `${videoRef.current?.videoWidth || 0}x${videoRef.current?.videoHeight || 0}`,
        frame_rate: videoMetadata?.frameRate || 30,
        filename: file?.name,
        filesize: file?.size,
        filetype: file?.type,
        last_modified: file?.lastModified,
        total_frames: frames.length,
        creation_date: new Date().toISOString()
      };
      
      console.log('Analysis metadata:', metadata);

      let stageIndex = 3;
      
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      
      progressIntervalRef.current = window.setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 16;
          
          if (newProgress >= (stageIndex + 1) * 16 && stageIndex < analysisStages.length - 1) {
            stageIndex++;
            setAnalysisStage(analysisStages[stageIndex]);
          }
          
          if (newProgress >= 100) {
            if (progressIntervalRef.current) {
              clearInterval(progressIntervalRef.current);
              progressIntervalRef.current = null;
            }
            return 100;
          }
          return newProgress;
        });
      }, 400);

      const analysisData = await orchestrator.analyzeVideo(videoUrl, {
        ...metadata,
        frames: frames
      });

      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      
      setAnalysisProgress(100);
      setAnalysisStage(analysisStages[analysisStages.length - 1]);

      setTimeout(() => {
        setIsLoading(false);
        setAnalysisStage(null);
        setAnalysisProgress(0);
        
        toast({
          title: "Analysis completed",
          description: `Your ${videoMetadata?.duration.toFixed(1) || videoDuration.toFixed(1)}s video analysis is ready to view.`,
        });
        
        onAnalyze(analysisData);
      }, 1600);
    } catch (error) {
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

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const handleAnalyze = () => {
    if (file) {
      beginAnalysis();
    }
  };

  const handleContentTypeChange = (type: string | string[]) => {
    if (Array.isArray(type)) {
      setContentType(type);
    } else {
      setContentType([type]);
    }
  };
  
  const handleMetadataExtracted = (metadata: any) => {
    setVideoMetadata(metadata);
    if (metadata.duration) {
      setVideoDuration(metadata.duration);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mx-auto overflow-hidden">
      <div className="space-y-4 md:space-y-6 w-full">
        <VideoUpload 
          onUpload={setFile} 
          onDurationDetected={setVideoDuration}
          onMetadataExtracted={handleMetadataExtracted}
          videoRef={videoRef}
        />
      </div>

      <div className="w-full">
        <UploadControls
          platform={platform}
          setPlatform={setPlatform}
          contentType={contentType}
          setContentType={handleContentTypeChange}
          followerCount={followerCount}
          setFollowerCount={setFollowerCount}
          file={file}
          onAnalyze={handleAnalyze}
          isLoading={isLoading}
          analysisProgress={analysisProgress}
          analysisStage={analysisStage}
          videoMetadata={videoMetadata ? {
            duration: videoMetadata.duration,
            resolution: videoMetadata.resolution,
            frameRate: videoMetadata.frameRate,
            fileSize: videoMetadata.fileSize
          } : undefined}
        />
      </div>
      
      <AnalysisProgressOverlay
        isLoading={isLoading}
        analysisProgress={analysisProgress}
        analysisStage={analysisStage}
        platform={platform}
      />
    </div>
  );
}
