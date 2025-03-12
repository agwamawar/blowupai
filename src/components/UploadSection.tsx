
import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { AnalysisProgressOverlay } from "./AnalysisProgressOverlay";
import { AnalysisPeriodSelector } from "./AnalysisPeriodSelector";
import { analysisStages, getVideoUrl, generateMockAnalysisData } from "@/services/videoAnalysisService";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState<string[]>(["Games"]);
  const [followerCount, setFollowerCount] = useState([10000]); // Default 10k followers
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(false);
  const { toast } = useToast();

  const handleContentTypeChange = (type: string | string[]) => {
    if (Array.isArray(type)) {
      setContentType(type);
    } else {
      setContentType([type]);
    }
  };

  const handlePasswordSubmit = () => {
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
    if (!file) {
      toast({
        title: "No video selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    // Open the password dialog instead of immediately running the analysis
    setPasswordDialogOpen(true);
    setPassword("");
    setPasswordError(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto h-full">
        <div className="space-y-6 h-full">
          <VideoUpload onUpload={setFile} />
        </div>

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
            onClick={handleAnalyze}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Video"}
          </Button>
        </div>
      </div>

      <AnalysisProgressOverlay
        isLoading={isLoading}
        analysisProgress={analysisProgress}
        analysisStage={analysisStage}
        platform={platform}
      />

      {/* Password Dialog */}
      <Dialog open={passwordDialogOpen} onOpenChange={setPasswordDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Beta Access Required</DialogTitle>
            <DialogDescription>
              This tool is currently in beta. Please enter the beta access password to continue.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={passwordError ? "border-red-500" : ""}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handlePasswordSubmit();
                }
              }}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">Incorrect password. Beta access only.</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordSubmit}>
              Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
