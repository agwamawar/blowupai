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

      <div className="w-full">
        {isLoading ? (
          <Button
            className="w-full relative overflow-hidden"
            size="lg"
            disabled
          >
            <span className="opacity-0">Analyzing...</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <span>{analysisStage}</span>
            </div>
            {/* Progressive fill effect based on analysis progress */}
            <div 
              className="absolute inset-0 bg-primary/30 origin-left" 
              style={{ 
                width: `${analysisProgress}%`,
                transition: "width 0.3s ease-out"
              }}
            />
          </Button>
        ) : (
          <Button
            className="w-10 h-10 rounded-full"
            size="icon"
            onClick={handleAnalyzeClick}
            aria-label="Analyze Video"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="m6 9 6-6 6 6"/>
              <path d="M12 3v18"/>
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}