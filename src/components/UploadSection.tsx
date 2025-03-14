
import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { UploadControls } from "./UploadControls";
import { useToast } from "@/hooks/use-toast";
import { AnalysisProgressOverlay } from "./AnalysisProgressOverlay";
import { PasswordDialog } from "./PasswordDialog";
import { analysisStages, getVideoUrl, generateMockAnalysisData } from "@/services/videoAnalysisService";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState<string[]>([]); // Removed default "Games"
  const [followerCount, setFollowerCount] = useState([10000]); // Default 10k followers
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { toast } = useToast();

  const handlePasswordSubmit = (password: string) => {
    const correctPassword = "BLOWUPSZN";
    
    if (password === correctPassword) {
      setPasswordDialogOpen(false);
      setPasswordError(false);
      beginAnalysis();
    } else {
      setPasswordError(true);
      toast({
        title: "Access Denied",
        description: "Incorrect password. This tool is only available to beta users.",
        variant: "destructive",
      });
    }
  };

  const beginAnalysis = async () => {
    try {
      setIsLoading(true);
      setAnalysisProgress(0);
      setAnalysisStage(analysisStages[0]);
      
      // Get video URL without uploading to server (for demo speed)
      const videoUrl = await getVideoUrl(file!);
      console.log('Video ready for analysis:', videoUrl);

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

      // Create enhanced mock analysis data
      const mockAnalysisData = generateMockAnalysisData(
        videoUrl,
        platform,
        contentType.join(', '), // Join multiple content types
        followerCount[0]
      );

      // Wait for the analysis to complete visually
      setTimeout(() => {
        setIsLoading(false);
        setAnalysisStage(null);
        
        toast({
          title: "Analysis completed",
          description: "Your video analysis is ready to view.",
        });
        
        // Pass the mockAnalysisData to the parent component
        onAnalyze(mockAnalysisData);
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
    }
  };

  const handleAnalyze = () => {
    // Open the password dialog
    setPasswordDialogOpen(true);
    setPasswordError(false);
  };

  const handleContentTypeChange = (type: string | string[]) => {
    if (Array.isArray(type)) {
      setContentType(type);
    } else {
      setContentType([type]);
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 w-full mx-auto overflow-hidden">
        <div className="space-y-4 md:space-y-6 w-full">
          <VideoUpload onUpload={setFile} />
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
          />
        </div>
      </div>

      <AnalysisProgressOverlay
        isLoading={isLoading}
        analysisProgress={analysisProgress}
        analysisStage={analysisStage}
        platform={platform}
      />

      <PasswordDialog
        open={passwordDialogOpen}
        onOpenChange={setPasswordDialogOpen}
        onPasswordSubmit={handlePasswordSubmit}
        passwordError={passwordError}
      />
    </>
  );
}
