
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { AnalysisPeriodSelector } from "./AnalysisPeriodSelector";
import { useToast } from "@/hooks/use-toast";

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
  isLoading
}: UploadControlsProps) {
  const { toast } = useToast();
  
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

      <Button
        className="w-full relative"
        size="lg"
        onClick={handleAnalyzeClick}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="opacity-0">Analyze Video</span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                <span>{Math.round(analysisProgress)}%</span>
              </div>
            </div>
          </>
        ) : (
          "Analyze Video"
        )}
      </Button>
    </div>
  );
}
