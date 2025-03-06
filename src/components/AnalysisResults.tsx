
import { useState } from "react";
import { ChartBar } from "lucide-react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { EngagementSection } from "./EngagementSection";
import { InsightsSection } from "./InsightsSection";

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

  // Content quality insights
  const contentInsights = [
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
  ];

  // Recommendations
  const recommendations = [
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
  ];

  return (
    <AnalysisDashboard 
      activeNavItem={activeNavItem}
      onNavigate={setActiveNavItem}
    >
      {/* Video Preview & Metadata */}
      <VideoSection 
        videoUrl={analysisData?.video_url} 
        metadata={videoMetadata}
      />
      
      {/* Engagement Score & Heatmap */}
      <EngagementSection 
        engagementScore={engagementScore}
        heatmapData={mockHeatmapData}
        bestSegments={analysisData?.engagement_prediction?.best_segments}
      />
      
      {/* Content Quality, Trending Analysis & Recommendations */}
      <InsightsSection 
        contentInsights={contentInsights}
        trendScore={85}
        trendingHashtags={trendingHashtags}
        trendOpportunities={trendOpportunities}
        recommendations={recommendations}
      />
    </AnalysisDashboard>
  );
}
