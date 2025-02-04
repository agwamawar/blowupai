import { useState } from "react";
import { VideoUpload } from "@/components/VideoUpload";
import { PlatformSelector } from "@/components/PlatformSelector";
import { FeatureCard } from "@/components/FeatureCard";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Copy, Users, Zap, ChartBar, Thermometer } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { MorphingText } from "@/components/MorphingText";

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

const mockHeatmapData = [
  { time: "0s", engagement: 30 },
  { time: "5s", engagement: 45 },
  { time: "10s", engagement: 80 },
  { time: "15s", engagement: 60 },
  { time: "20s", engagement: 40 },
  { time: "25s", engagement: 70 },
  { time: "30s", engagement: 50 },
];

const Index = () => {
  const [platform, setPlatform] = useState("tiktok");
  const [userCount, setUserCount] = useState([1230]);
  const [file, setFile] = useState<File | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [engagementScore] = useState(78); // Mock score for demonstration
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
    
    // Simulate analysis completion
    setTimeout(() => {
      setShowResults(true);
      toast({
        title: "Analysis complete",
        description: "Your video results are ready!",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-24">
        <div className="space-y-20 animate-fade-in">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              How viral is your{" "}
              <span className="text-primary">
                <MorphingText />
              </span>
              ?
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Run your video through a real social media algorithm simulator. 
              See how your video will perform before you post.
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid gap-6 md:grid-cols-3 animate-fade-in-up max-w-3xl mx-auto" style={{ "--stagger": 1 } as React.CSSProperties}>
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

          {/* Results Section */}
          {showResults && (
            <div className="space-y-8 max-w-4xl mx-auto animate-fade-in">
              <h2 className="text-2xl font-bold text-center">Analysis Results</h2>
              
              {/* Engagement Score */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Engagement Score</h3>
                  </div>
                  <span className="text-2xl font-bold">{engagementScore}/100</span>
                </div>
                <Progress value={engagementScore} className="h-3" />
              </div>

              {/* Heatmap Analysis */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ChartBar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Engagement Heatmap</h3>
                </div>
                <div className="h-64 w-full">
                  <ChartContainer
                    className="h-full w-full"
                    config={{
                      line: {
                        color: "hsl(var(--primary))",
                      },
                    }}
                  >
                    <AreaChart data={mockHeatmapData}>
                      <defs>
                        <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.5} />
                          <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <XAxis dataKey="time" />
                      <YAxis />
                      <ChartTooltip
                        content={({ active, payload }) => (
                          <ChartTooltipContent
                            active={active}
                            payload={payload}
                            formatter={(value) => `${value}% engagement`}
                          />
                        )}
                      />
                      <Area
                        type="monotone"
                        dataKey="engagement"
                        stroke="hsl(var(--primary))"
                        fill="url(#gradient)"
                      />
                    </AreaChart>
                  </ChartContainer>
                </div>
              </div>

              {/* Comparison Chart */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ChartBar className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">Performance Comparison</h3>
                </div>
                <div className="p-6 rounded-lg border bg-card text-card-foreground">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Your Video</span>
                      <Progress value={78} className="w-64 h-2" />
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Average Viral Videos</span>
                      <Progress value={92} className="w-64 h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
