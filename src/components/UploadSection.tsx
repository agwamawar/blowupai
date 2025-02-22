import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from 'react-router-dom'; // Added useNavigate import


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
  const navigate = useNavigate(); // Added navigate hook

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

      // Get the current user's ID
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        navigate("/auth"); // Redirect to auth page if not logged in
        return;
      }

      const videoUrl = await uploadVideo(file);
      console.log('Video uploaded successfully:', videoUrl);

      // First, create the analysis record in the database
      const { data: analysisRecord, error: analysisError } = await supabase
        .from('video_analysis')
        .insert({
          video_url: videoUrl,
          platform,
          content_type: contentType,
          user_id: user.id, // Explicitly set the user_id
          status: 'pending',
          analysis_period: analysisPeriod[0]
        })
        .select()
        .single();

      if (analysisError) throw analysisError;

      // Then trigger the analysis
      const { data, error } = await supabase.functions.invoke('analyze-video', {
        body: {
          analysisId: analysisRecord.id,
          videoUrl,
          platform,
          analysisPeriod: analysisPeriod[0]
        },
      });

      if (error) throw error;

      console.log('Analysis initiated:', data);

      // Poll for analysis completion
      const interval = setInterval(async () => {
        const { data: status, error: statusError } = await supabase
          .from('video_analysis')
          .select('*')
          .eq('id', analysisRecord.id)
          .single();

        if (statusError) {
          clearInterval(interval);
          throw statusError;
        }

        if (status.status === 'completed') {
          clearInterval(interval);
          toast({
            title: "Analysis completed",
            description: "Your video analysis is ready to view.",
          });
          onAnalyze(status);
        } else if (status.status === 'failed') {
          clearInterval(interval);
          throw new Error('Analysis failed');
        }
      }, 5000); // Poll every 5 seconds

      // Clean up interval after 5 minutes (timeout)
      setTimeout(() => {
        clearInterval(interval);
        toast({
          title: "Analysis timeout",
          description: "The analysis is taking longer than expected. Please try again.",
          variant: "destructive",
        });
      }, 300000);

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