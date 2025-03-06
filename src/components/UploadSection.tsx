
import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Progress } from "@/components/ui/progress";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState("Entertainment");
  const [analysisPeriod, setAnalysisPeriod] = useState([48]); // Default 48 hours
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysisStage, setAnalysisStage] = useState<string | null>(null);
  const { toast } = useToast();

  // Analysis stages in order
  const analysisStages = [
    "Validating video format",
    "Reading metadata",
    "Detecting visual elements",
    "Analyzing audio quality",
    "Scanning text content",
    "Evaluating platform compliance",
    "Generating engagement metrics",
    "Finalizing analysis"
  ];

  // Simplified upload function - no need to actually upload for demo
  const getVideoUrl = async (file: File) => {
    // For quick demo purposes, just create a local object URL
    return URL.createObjectURL(file);
  };

  const handleAnalyze = async () => {
    if (!file) {
      toast({
        title: "No video selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      setAnalysisProgress(0);
      setAnalysisStage(analysisStages[0]);
      
      // Get video URL without uploading to server (for demo speed)
      const videoUrl = await getVideoUrl(file);
      console.log('Video ready for analysis:', videoUrl);

      // Create a unique identifier for this analysis session
      const sessionId = Date.now().toString();

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
      const mockAnalysisData = {
        id: sessionId,
        video_url: videoUrl,
        platform,
        content_type: contentType,
        status: 'completed',
        analysis_period: analysisPeriod[0],
        engagement_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        engagement_prediction: {
          estimated_likes: Math.floor(Math.random() * 5000) + 3000,
          estimated_shares: Math.floor(Math.random() * 1000) + 500,
          watch_time: "80% of video",
          best_segments: [
            { timestamp: "0:05", reason: "Strong viewer retention" },
            { timestamp: "0:18", reason: "High engagement point" },
            { timestamp: "0:32", reason: "Peak audience interest" }
          ]
        },
        platform_analysis: {
          compliance: {
            "Video Length": "Optimal",
            "Format": "Vertical (9:16)",
            "Content Type": contentType
          },
          guidelines: {
            "optimalLength": "15-60 seconds",
            "recommendedFormat": "9:16 vertical",
            "bestPostingTime": "6-9 PM local time"
          },
          recommendations: [
            "Add more on-screen text overlays for higher retention",
            "Use trending sounds to increase discoverability",
            "Create a stronger hook in the first 3 seconds"
          ]
        },
        video_metadata: {
          duration: "0:45"
        },
        visual_quality: {
          lighting: "Good",
          stability: "Average",
          clarity: "Good"
        },
        audio_analysis: {
          clarity: "Good",
          background_noise: "Low",
          emotion: "Neutral/Positive"
        },
        content_analysis: {
          objects: ["Person", "Product", "Text", "Graphics"],
          text_detected: ["Title", "Brand Name", "Call to Action"],
          scene_transitions: "Smooth transitions at 0:12, 0:25, and 0:38"
        }
      };

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

  return (
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
          <ContentTypeSelector selected={contentType} onSelect={setContentType} />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Analysis Period (hours)</label>
          <div className="space-y-2">
            <Slider
              value={analysisPeriod}
              onValueChange={setAnalysisPeriod}
              min={12}
              max={168}
              step={12}
            />
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {analysisPeriod[0]} hours after posting
              </span>
            </div>
          </div>
        </div>

        {isLoading && (
          <div className="space-y-4 bg-white/30 backdrop-blur-sm p-4 rounded-lg border border-primary/20">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Analyzing video...</span>
                <span>{Math.round(analysisProgress)}%</span>
              </div>
              <Progress value={analysisProgress} className="h-2" />
            </div>
            {analysisStage && (
              <div className="bg-primary/10 text-primary text-sm p-2 rounded-md">
                {analysisStage}
              </div>
            )}
          </div>
        )}

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
  );
}
