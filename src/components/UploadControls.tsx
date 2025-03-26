
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { AnalysisPeriodSelector } from "./AnalysisPeriodSelector";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

interface UploadControlsProps {
  platform: string;
  setPlatform: (platform: string) => void;
  contentType: string[];
  setContentType: (type: string | string[]) => void;
  followerCount: number[];
  setFollowerCount: (count: number[]) => void;
  file: File | null;
  onAnalyze: () => void;
  isLoading: boolean;
  analysisProgress: number;
  analysisStage: string | null;
  videoMetadata?: {
    duration: number;
    resolution: string;
    frameRate?: number;
    fileSize: number;
  };
}

export function UploadControls({
  platform,
  setPlatform,
  contentType,
  setContentType,
  followerCount,
  setFollowerCount,
  file,
  onAnalyze,
  isLoading,
  analysisProgress,
  analysisStage,
  videoMetadata
}: UploadControlsProps) {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleAnalyzeClick = () => {
    if (!file) {
      toast({
        title: "No video selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }
    
    onAnalyze();
  };

  return (
    <div className="space-y-4 md:space-y-6 w-full">
      <div className="space-y-3 md:space-y-4">
        <label className="text-sm font-medium">Select Platform</label>
        <PlatformSelector selected={platform} onSelect={setPlatform} />
      </div>

      <div className="space-y-3 md:space-y-4">
        <label className="text-sm font-medium">Content Type</label>
        <ContentTypeSelector selected={contentType} onSelect={setContentType} />
      </div>

      <AnalysisPeriodSelector 
        analysisPeriod={followerCount}
        setAnalysisPeriod={setFollowerCount}
      />

      {videoMetadata && (
        <div className="mt-2 p-3 bg-muted/50 rounded-md text-sm space-y-1">
          <p><span className="font-medium">Duration:</span> {videoMetadata.duration.toFixed(1)}s</p>
          <p><span className="font-medium">Resolution:</span> {videoMetadata.resolution}</p>
          {videoMetadata.frameRate && (
            <p><span className="font-medium">Frame Rate:</span> {videoMetadata.frameRate.toFixed(1)} fps</p>
          )}
          <p><span className="font-medium">Size:</span> {(videoMetadata.fileSize / (1024 * 1024)).toFixed(2)} MB</p>
        </div>
      )}

      <div className="w-full">
        {isLoading ? (
          <Button
            className="w-full relative overflow-hidden"
            size="lg"
            disabled
          >
            <span className="opacity-0">Analyzing...</span>
            <div className="absolute inset-0 flex items-center justify-center">
              {analysisStage && <span>{analysisStage}</span>}
            </div>
          </Button>
        ) : (
          <Button
            className="w-full"
            size="lg"
            onClick={handleAnalyzeClick}
          >
            Analyze Video
          </Button>
        )}
      </div>
    </div>
  );
}
