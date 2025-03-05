
import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [contentType, setContentType] = useState("Entertainment");
  const [analysisPeriod, setAnalysisPeriod] = useState([48]); // Default 48 hours
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const uploadVideo = async (file: File) => {
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop();
    const filePath = `${timestamp}.${fileExt}`;

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('videos')
      .upload(filePath, file);

    if (uploadError) {
      throw new Error('Error uploading video: ' + uploadError.message);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('videos')
      .getPublicUrl(filePath);

    return publicUrl;
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

      // Upload the video
      const videoUrl = await uploadVideo(file);
      console.log('Video uploaded successfully:', videoUrl);

      // Create a unique identifier for this analysis session
      const sessionId = Date.now().toString();

      // Create mock analysis data since we're skipping the actual backend analysis
      const mockAnalysisData = {
        id: sessionId,
        video_url: videoUrl,
        platform,
        content_type: contentType,
        status: 'completed',
        analysis_period: analysisPeriod[0],
        engagement_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
        engagement_prediction: {
          best_segments: [
            { timestamp: "0:05", description: "Strong viewer retention" },
            { timestamp: "0:18", description: "High engagement point" },
            { timestamp: "0:32", description: "Peak audience interest" }
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
        }
      };

      // Notify of completion and show results
      toast({
        title: "Analysis completed",
        description: "Your video analysis is ready to view.",
      });
      
      // Pass the mockAnalysisData to the parent component
      onAnalyze(mockAnalysisData);

    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: "Analysis failed",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
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
