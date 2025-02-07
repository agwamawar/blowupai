import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { PlatformSelector } from "./PlatformSelector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

interface UploadSectionProps {
  onAnalyze: (analysisData: any) => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [userCount, setUserCount] = useState([1230]);
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
      
      // Upload video and get public URL
      const videoUrl = await uploadVideo(file);
      console.log('Video uploaded successfully:', videoUrl);

      // Call the analyze-video edge function
      const { data, error } = await supabase.functions.invoke('analyze-video', {
        body: {
          videoUrl,
          platform,
          userId: (await supabase.auth.getUser()).data.user?.id,
          simulatedUsers: userCount[0]
        },
      });

      if (error) throw error;

      console.log('Analysis completed:', data);

      toast({
        title: "Analysis completed",
        description: "Your video analysis is ready to view.",
      });

      // Pass the analysis data to the parent component
      onAnalyze(data);
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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      <div className="space-y-6">
        <VideoUpload onUpload={setFile} />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <label className="text-sm font-medium">Select Platform</label>
          <PlatformSelector selected={platform} onSelect={setPlatform} />
        </div>

        <div className="space-y-4">
          <label className="text-sm font-medium">Simulated Users</label>
          <div className="space-y-2">
            <Slider
              value={userCount}
              onValueChange={setUserCount}
              min={100}
              max={10000}
              step={100}
            />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {userCount[0].toLocaleString()} users
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