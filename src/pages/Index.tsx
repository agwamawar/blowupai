import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { PlatformSelector } from "@/components/PlatformSelector";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, Users, Zap } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const features = [
  {
    icon: Copy,
    title: "A/B Testing",
    description: "Upload multiple versions of your video to find the best performer",
  },
  {
    icon: Zap,
    title: "AI-Powered Analysis",
    description: "Compare your content against top-performing viral videos",
  },
  {
    icon: Users,
    title: "Cross-Platform Insights",
    description: "Predict performance across TikTok, Instagram, Facebook, and Snapchat",
  },
];

const Index = () => {
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
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-16">
        <div className="space-y-16 animate-fade-in">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How viral is your video?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Run your video through a real social media algorithm simulator. 
              See how your video will perform before you post.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up" style={{ "--stagger": 1 } as React.CSSProperties}>
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>

          {/* Upload Section */}
          <div className="space-y-8 max-w-3xl mx-auto">
            <VideoUpload onUpload={setFile} />

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
        </div>
      </div>
    </div>
  );
};

export default Index;