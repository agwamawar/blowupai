
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { AnalysisPeriodSelector } from "./AnalysisPeriodSelector";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

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
  analysisStage
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

      <div className="w-full space-y-2">
        {isLoading ? (
          <div className="space-y-2">
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
            <Progress value={analysisProgress} className="h-2 w-full" />
            <p className="text-xs text-center text-muted-foreground">
              {Math.round(analysisProgress)}% complete
            </p>
          </div>
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
