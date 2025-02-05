import { useState } from "react";
import { VideoUpload } from "./VideoUpload";
import { PlatformSelector } from "./PlatformSelector";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Users } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface UploadSectionProps {
  onAnalyze: () => void;
}

export function UploadSection({ onAnalyze }: UploadSectionProps) {
  const [platform, setPlatform] = useState("tiktok");
  const [userCount, setUserCount] = useState([1230]);
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();

  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "No video selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Analysis started",
      description: "We're processing your video. This may take a few minutes.",
    });
    
    onAnalyze();
  };

  return (
    <div className="space-y-6">
      <VideoUpload onUpload={setFile} />

      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Select Platform</label>
          <PlatformSelector selected={platform} onSelect={setPlatform} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-white">Simulated Users</label>
          <div className="space-y-2">
            <Slider
              value={userCount}
              onValueChange={setUserCount}
              min={100}
              max={10000}
              step={100}
            />
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-gray-400" />
              <span className="text-sm text-gray-400">
                {userCount.toLocaleString()} users
              </span>
            </div>
          </div>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleAnalyze}
        >
          Analyze Video
        </Button>
      </div>
    </div>
  );
}