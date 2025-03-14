
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
  
  const handleContentTypeChange = (type: string | string[]) => {
    if (Array.isArray(type)) {
      setContentType(type);
    } else {
      setContentType([type]);
    }
  };

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
    <div className="space-y-6">
      <div className="space-y-4">
        <label className="text-sm font-medium">Select Platform</label>
        <PlatformSelector selected={platform} onSelect={setPlatform} />
      </div>

      <div className="space-y-4">
        <label className="text-sm font-medium">Content Type</label>
        <ContentTypeSelector selected={contentType} onSelect={handleContentTypeChange} />
      </div>

      <AnalysisPeriodSelector 
        analysisPeriod={followerCount}
        setAnalysisPeriod={setFollowerCount}
      />

      <Button
        className="w-full"
        size="lg"
        onClick={handleAnalyzeClick}
        disabled={isLoading}
      >
        {isLoading ? "Analyzing..." : "Analyze Video"}
      </Button>
    </div>
  );
}
