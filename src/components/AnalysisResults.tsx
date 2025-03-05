
import { useState } from "react";
import { ChartBar, BarChart2 } from "lucide-react";
import { Area, AreaChart, XAxis, YAxis } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { VideoPreview } from "./VideoPreview";
import { VideoMetadata } from "./VideoMetadata";
import { EngagementScoreDisplay } from "./EngagementScoreDisplay";
import { ContentQualityInsights } from "./ContentQualityInsights";
import { TrendingAnalysis } from "./TrendingAnalysis";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { ActionButtons } from "./ActionButtons";
import { DashboardSidebar } from "./DashboardSidebar";

interface AnalysisResultsProps {
  engagementScore: number;
  mockHeatmapData: Array<{ time: string; engagement: number }>;
  analysisData?: any;
}

export function AnalysisResults({ 
  engagementScore, 
  mockHeatmapData, 
  analysisData 
}: AnalysisResultsProps) {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  
  // Mock trending hashtags
  const trendingHashtags = [
    "#viralcontent", "#trending2023", "#foryoupage", 
    "#contentcreator", "#socialmedia", "#trending"
  ];

  // Mock trend opportunities
  const trendOpportunities = [
    "Dance challenge trend gaining momentum",
    "Product reveal format has 3x engagement",
    "Educational quick tips are trending in your niche"
  ];
  
  // Mock video metadata
  const videoMetadata = {
    title: "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    resolution: "1080x1920",
    uploadTime: "Just now",
    platform: "TikTok",
    category: "Entertainment"
  };

  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      <DashboardSidebar 
        activeItem={activeNavItem}
        onNavigate={setActiveNavItem}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <BarChart2 className="mr-2 text-primary" />
              Video Analysis Dashboard
            </h1>
            
            <ActionButtons />
          </div>
          
          {/* Video Preview & Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-2">
              <VideoPreview 
                videoUrl={analysisData?.video_url} 
                title={videoMetadata.title}
                duration={videoMetadata.duration}
              />
            </div>
            <div className="md:col-span-1">
              <VideoMetadata 
                title={videoMetadata.title}
                duration={videoMetadata.duration}
                resolution={videoMetadata.resolution}
                uploadTime={videoMetadata.uploadTime}
                platform={videoMetadata.platform}
                category={videoMetadata.category}
              />
            </div>
          </div>
          
          {/* Engagement Score & Heatmap */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="md:col-span-1">
              <EngagementScoreDisplay score={engagementScore} compareScore={75} />
            </div>
            <div className="md:col-span-2">
              <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 h-full">
                <div className="flex items-center mb-4">
                  <ChartBar className="h-5 w-5 text-primary mr-2" />
                  <h3 className="font-semibold text-lg text-white">Engagement Heatmap</h3>
                </div>
                
                <div className="h-[160px] w-full">
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
                
                <div className="mt-2 grid grid-cols-3 gap-2">
                  {analysisData?.engagement_prediction?.best_segments?.slice(0, 3).map((segment: any, idx: number) => (
                    <div key={idx} className="bg-slate-700/50 p-2 rounded-md flex items-start gap-2 text-xs">
                      <div className="min-w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-medium text-primary text-xs">{segment.timestamp}</span>
                      </div>
                      <span className="text-slate-300">{segment.reason}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Content Quality & Trending Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ContentQualityInsights insights={[
              {
                label: "Hook Strength",
                value: 85,
                icon: <ChartBar className="h-4 w-4 text-red-400" />,
                description: "Strong opening captures attention"
              },
              {
                label: "Pacing",
                value: 72,
                icon: <ChartBar className="h-4 w-4 text-yellow-400" />,
                description: "Good rhythm with room to improve"
              },
              {
                label: "Audio Quality",
                value: 90,
                icon: <ChartBar className="h-4 w-4 text-blue-400" />,
                description: "Excellent sound choice and quality"
              },
              {
                label: "Retention Factors",
                value: 78,
                icon: <ChartBar className="h-4 w-4 text-green-400" />,
                description: "Good viewer retention expected"
              }
            ]} />
            
            <TrendingAnalysis 
              trendScore={85} 
              hashtags={trendingHashtags}
              opportunities={trendOpportunities}
            />
          </div>
          
          {/* Recommendations */}
          <div className="mb-6">
            <RecommendationsPanel recommendations={[
              {
                title: "Optimize First 3 Seconds",
                description: "Add a stronger hook at the beginning to grab viewer attention immediately."
              },
              {
                title: "Add Text Overlays",
                description: "Include on-screen text to increase retention and highlight key points."
              },
              {
                title: "Use Trending Audio",
                description: "Incorporate popular sounds to boost discoverability on the platform."
              },
              {
                title: "Adjust Video Pacing",
                description: "Speed up transitions between 0:15-0:25 to maintain viewer engagement."
              }
            ]} />
          </div>
        </div>
      </div>
    </div>
  );
}
