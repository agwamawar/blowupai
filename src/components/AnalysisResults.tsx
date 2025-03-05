
import { useState } from "react";
import { ChartBar, ThumbsUp, Thermometer, Share2, TrendingUp, Download, Lightbulb, Film, Clock, Volume2, RefreshCw } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { DetailedAnalysis } from "./DetailedAnalysis";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PlatformRecommendations } from "./PlatformRecommendations";
import { VideoPreview } from "./VideoPreview";
import { useToast } from "@/hooks/use-toast";

interface AnalysisResultsProps {
  engagementScore: number;
  mockHeatmapData: Array<{ time: string; engagement: number }>;
  analysisData?: any;
}

export function AnalysisResults({ engagementScore, mockHeatmapData, analysisData }: AnalysisResultsProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const { toast } = useToast();
  
  // Get engagement score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-500";
    if (score >= 60) return "text-amber-500";
    return "text-red-500";
  };

  // Mock trend matching score
  const trendMatchingScore = Math.floor(Math.random() * 30) + 70; // Random between 70-100

  // Mock video metadata
  const videoMetadata = {
    title: "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    resolution: "1080x1920",
    uploadTime: "Just now"
  };

  // Mock trending hashtags
  const trendingHashtags = [
    "#viralcontent", "#trending2023", "#foryoupage", 
    "#contentcreator", "#socialmedia", "#trending"
  ];

  // Mock actionable recommendations
  const actionableRecommendations = [
    { 
      icon: <Clock className="h-5 w-5 text-primary" />,
      title: "Optimize First 5 Seconds", 
      description: "Create a stronger hook in the first 3 seconds to grab attention immediately."
    },
    { 
      icon: <Film className="h-5 w-5 text-primary" />,
      title: "Add Text Overlays", 
      description: "Include more on-screen text to increase viewer retention."
    },
    { 
      icon: <Volume2 className="h-5 w-5 text-primary" />,
      title: "Use Trending Sounds", 
      description: "Incorporate popular sounds to increase discoverability."
    }
  ];

  // Function to handle download report
  const handleDownloadReport = () => {
    toast({
      title: "Report Download",
      description: "Your report is being generated and will download shortly.",
    });
  };

  // Function to handle share analysis
  const handleShareAnalysis = () => {
    toast({
      title: "Share Analysis",
      description: "Share link copied to clipboard!",
    });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Dashboard-like header with video preview and metadata */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 className="text-3xl font-bold gradient-text">Analysis Dashboard</h2>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShareAnalysis} className="bg-[#1A1F2C]/50 border-[#6E59A5]/20 hover:bg-[#1A1F2C]/80">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReport} className="bg-[#1A1F2C]/50 border-[#6E59A5]/20 hover:bg-[#1A1F2C]/80">
              <Download className="mr-2 h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>
      </div>
      
      {/* Video Preview & Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1 bg-[#1A1F2C]/50 border-[#6E59A5]/20 backdrop-blur-sm">
          <CardContent className="pt-6">
            <VideoPreview videoUrl={analysisData?.video_url} />
            <div className="mt-4 space-y-2">
              <h3 className="font-medium text-[#D6BCFA]">Video Details</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-[#8E9196]">Duration</span>
                  <span>{videoMetadata.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E9196]">Resolution</span>
                  <span>{videoMetadata.resolution}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8E9196]">Uploaded</span>
                  <span>{videoMetadata.uploadTime}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 bg-[#1A1F2C]/50 border-[#6E59A5]/20 backdrop-blur-sm">
          <CardHeader className="pb-0">
            <CardTitle className="text-[#D6BCFA]">
              <div className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-[#9b87f5]" />
                Engagement Score
              </div>
            </CardTitle>
            <CardDescription>
              Overall engagement prediction based on content analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="text-center">
                <div className={`text-6xl font-bold animate-pulse ${getScoreColor(engagementScore)}`}>
                  {engagementScore}
                </div>
                <p className="text-[#8E9196] mt-2">Out of 100</p>
              </div>
              <div className="flex-1 space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Watch Time</span>
                    <span className="font-medium">85%</span>
                  </div>
                  <Progress value={85} className="h-2 bg-[#1A1F2C] [&>div]:bg-[#9b87f5]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Viewer Retention</span>
                    <span className="font-medium">78%</span>
                  </div>
                  <Progress value={78} className="h-2 bg-[#1A1F2C] [&>div]:bg-[#9b87f5]" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Predicted Shares</span>
                    <span className="font-medium">92%</span>
                  </div>
                  <Progress value={92} className="h-2 bg-[#1A1F2C] [&>div]:bg-[#9b87f5]" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Tabs Navigation - Dashboard style */}
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab} 
        className="w-full"
      >
        <TabsList className="grid grid-cols-3 mb-6 bg-[#1A1F2C]/70 p-1">
          <TabsTrigger 
            value="overview" 
            className="data-[state=active]:bg-[#6E59A5]/30 data-[state=active]:text-white"
          >
            Overview
          </TabsTrigger>
          <TabsTrigger 
            value="insights"
            className="data-[state=active]:bg-[#6E59A5]/30 data-[state=active]:text-white"
          >
            Detailed Insights
          </TabsTrigger>
          <TabsTrigger 
            value="recommendations"
            className="data-[state=active]:bg-[#6E59A5]/30 data-[state=active]:text-white"
          >
            Recommendations
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Engagement Heatmap */}
          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#D6BCFA]">
                <ChartBar className="h-5 w-5 text-[#9b87f5]" />
                Engagement Heatmap
              </CardTitle>
              <CardDescription>
                See which parts of your video are most engaging
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="h-64 w-full">
                <ChartContainer
                  className="h-full w-full"
                  config={{
                    line: {
                      color: "#9b87f5",
                    },
                  }}
                >
                  <AreaChart data={mockHeatmapData}>
                    <defs>
                      <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#9b87f5" stopOpacity={0.5} />
                        <stop offset="100%" stopColor="#9b87f5" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="time" 
                      stroke="#8E9196" 
                      tickLine={false}
                    />
                    <YAxis 
                      stroke="#8E9196" 
                      tickLine={false}
                      axisLine={false}
                    />
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
                      stroke="#9b87f5"
                      fill="url(#gradient)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                {analysisData?.engagement_prediction?.best_segments.map((segment: any, idx: number) => (
                  <div key={idx} className="bg-[#6E59A5]/10 p-3 rounded-lg flex items-start gap-2">
                    <div className="min-w-8 h-8 rounded-full bg-[#6E59A5]/20 flex items-center justify-center">
                      <span className="font-medium text-[#9b87f5]">{segment.timestamp}</span>
                    </div>
                    <p className="text-sm">{segment.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          {/* Content Virality Insights - Dashboard Style */}
          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#D6BCFA]">
                <TrendingUp className="h-5 w-5 text-[#9b87f5]" />
                Content Virality Insights
              </CardTitle>
              <CardDescription>
                Factors that contribute to your content's virality potential
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-[#D6BCFA]">What Works Well</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 bg-[#6E59A5]/10 p-2 rounded">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-1" />
                      <span>Strong emotional appeal in middle section</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#6E59A5]/10 p-2 rounded">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-1" />
                      <span>Effective use of transitions throughout</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#6E59A5]/10 p-2 rounded">
                      <ThumbsUp className="h-4 w-4 text-green-500 mt-1" />
                      <span>Good visual quality and lighting</span>
                    </li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-[#D6BCFA]">Areas to Improve</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 bg-[#6E59A5]/10 p-2 rounded">
                      <RefreshCw className="h-4 w-4 text-amber-500 mt-1" />
                      <span>First 3 seconds lacks a strong hook</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#6E59A5]/10 p-2 rounded">
                      <RefreshCw className="h-4 w-4 text-amber-500 mt-1" />
                      <span>Limited on-screen text elements</span>
                    </li>
                    <li className="flex items-start gap-2 bg-[#6E59A5]/10 p-2 rounded">
                      <RefreshCw className="h-4 w-4 text-amber-500 mt-1" />
                      <span>Background audio could be more trending</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 bg-[#1A1F2C]/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-[#D6BCFA]">Trend Matching Score</h4>
                <div className="flex items-center gap-4">
                  <Progress value={trendMatchingScore} className="h-3 flex-1 bg-[#1A1F2C] [&>div]:bg-[#9b87f5]" />
                  <span className="font-bold">{trendMatchingScore}%</span>
                </div>
              </div>
              
              <div className="mt-6 bg-[#1A1F2C]/30 p-4 rounded-lg">
                <h4 className="font-medium mb-3 text-[#D6BCFA]">Suggested Hashtags</h4>
                <div className="flex flex-wrap gap-2">
                  {trendingHashtags.map((tag, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs bg-[#6E59A5]/20 text-[#D6BCFA] hover:bg-[#6E59A5]/30">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Detailed Insights Tab */}
        <TabsContent value="insights" className="space-y-8">
          <DetailedAnalysis analysis={analysisData} />
        </TabsContent>
        
        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-8">
          <Card className="bg-[#1A1F2C]/50 border-[#6E59A5]/20 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[#D6BCFA]">
                <Lightbulb className="h-5 w-5 text-[#9b87f5]" />
                Actionable Recommendations
              </CardTitle>
              <CardDescription>
                AI-powered suggestions to optimize your content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {actionableRecommendations.map((rec, idx) => (
                  <Card key={idx} className="bg-[#6E59A5]/10 border-[#6E59A5]/20 h-full">
                    <CardContent className="pt-6">
                      <div className="flex flex-col items-center text-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-[#6E59A5]/20 flex items-center justify-center">
                          {rec.icon}
                        </div>
                        <h3 className="font-medium text-[#D6BCFA]">{rec.title}</h3>
                        <p className="text-sm text-[#8E9196]">{rec.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-8 space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4 text-[#D6BCFA]">AI-Generated Title & Caption</h3>
                  <Card className="bg-[#6E59A5]/10 border-[#6E59A5]/20">
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm text-[#8E9196] mb-1">Title</p>
                          <p className="font-medium">"How I Doubled My Views With This One Simple Trick!"</p>
                        </div>
                        <div>
                          <p className="text-sm text-[#8E9196] mb-1">Caption</p>
                          <p>Finally sharing my biggest content creation secret! 🔥 This technique changed everything for my channel. Watch until the end to see the before & after results! #contentcreator #viralvideo</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <PlatformRecommendations platform={analysisData?.platform} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
