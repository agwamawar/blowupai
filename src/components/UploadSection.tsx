
import { useState, useRef, useEffect } from "react";
import { VideoUpload } from "./VideoUpload";
import { UploadControls } from "./UploadControls";
import { useToast } from "@/hooks/use-toast";
import { analysisStages, getVideoUrl } from "@/services/videoAnalysisService";
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  
  // Initialize the orchestrator
  const orchestrator = new AgentOrchestrator();

  // Extract video metadata when file changes
  useEffect(() => {
    if (file) {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        const duration = video.duration;
        setVideoDuration(duration);
        URL.revokeObjectURL(video.src);
      };
      
      video.src = URL.createObjectURL(file);
    }
  }, [file]);

  const beginAnalysis = async () => {
    try {
      setIsLoading(true);
      setAnalysisProgress(0);
      setAnalysisStage(analysisStages[0]);
      
      // Get video URL for analysis
      const videoUrl = await getVideoUrl(file!);
      console.log('Video ready for analysis:', videoUrl);

      // Prepare metadata with more detailed information
      const metadata = {
        platform,
        content_type: contentType.join(', '),
        follower_count: followerCount[0],
        duration: videoDuration || 0,
        filename: file?.name,
        filesize: file?.size,
        filetype: file?.type,
        last_modified: file?.lastModified
      };
      
      console.log('Analysis metadata:', metadata);

      // Simulate analysis progress
      let stageIndex = 0;
      const interval = setInterval(() => {
        setAnalysisProgress(prev => {
          const newProgress = prev + 12.5; // 8 stages, ~12.5% each
          
          // Update the analysis stage based on progress
          if (newProgress >= (stageIndex + 1) * 12.5 && stageIndex < analysisStages.length - 1) {
            stageIndex++;
            setAnalysisStage(analysisStages[stageIndex]);
          }
          
          if (newProgress >= 100) {
            clearInterval(interval);
            return 100;
          }
          return newProgress;
        });
      }, 400);

      // Execute comprehensive analysis using agent orchestrator
      const analysisData = await orchestrator.analyzeVideo(videoUrl, metadata);

      // Wait for the analysis to complete visually
      setTimeout(() => {
        setIsLoading(false);
        setAnalysisStage(null);
        setAnalysisProgress(0);
        
        toast({
          title: "Analysis completed",
          description: "Your video analysis is ready to view.",
        });
        
        // Pass the analysis data to the parent component
        onAnalyze(analysisData);
      }, 3200); // Wait for the progress to reach 100%

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      setIsLoading(false);
      setAnalysisStage(null);
      setAnalysisProgress(0);
    }
  };

  const handleAnalyze = () => {
    // Directly start analysis
    beginAnalysis();
  };

  const handleContentTypeChange = (type: string | string[]) => {
    if (Array.isArray(type)) {
      setContentType(type);
    } else {
      setContentType([type]);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mx-auto overflow-hidden">
      <div className="space-y-4 md:space-y-6 w-full">
        <VideoUpload 
          onUpload={setFile} 
          onDurationDetected={setVideoDuration}
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
