
import { useState, useRef } from "react";
import { VideoUpload } from "./VideoUpload";
import { UploadControls } from "./UploadControls";
import { AnalysisProgressOverlay } from "./AnalysisProgressOverlay";
import { useVideoAnalysis, VideoMetadata } from "@/hooks/useVideoAnalysis";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState<string[]>([]); 
  const [followerCount, setFollowerCount] = useState([10000]); 
  const [file, setFile] = useState<File | null>(null);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoMetadata, setVideoMetadata] = useState<VideoMetadata | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const {
    isLoading,
    analysisProgress,
    analysisStage,
    beginAnalysis
  } = useVideoAnalysis(onAnalyze);

  const handleAnalyze = () => {
    if (file) {
      beginAnalysis(
        file,
        platform,
        contentType,
        followerCount[0],
        videoMetadata,
        videoDuration
      );
    }
  };

  const handleContentTypeChange = (type: string | string[]) => {
    if (Array.isArray(type)) {
      setContentType(type);
    } else {
      setContentType([type]);
    }
  };

  const handleMetadataExtracted = (metadata: VideoMetadata) => {
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
