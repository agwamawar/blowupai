
import { useState } from "react";
import { ChartBar } from "lucide-react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { VideoContentDetails } from "./VideoContentDetails";
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
  
  // Generate personalized content-based hashtags
  const generatePersonalizedHashtags = () => {
    const baseHashtags = ["#contentcreator", "#socialmedia"];
    const detectedObjects = analysisData?.content_analysis?.objects || [];
    
    // Add hashtags based on detected objects
    const objectHashtags = detectedObjects
      .slice(0, 3)
      .map((obj: string) => `#${obj.toLowerCase().replace(/\s+/g, '')}`);
    
    // Add platform-specific hashtag
    const platformHashtag = analysisData?.video_metadata?.platform 
      ? [`#${analysisData.video_metadata.platform.toLowerCase()}`]
      : ["#trending"];
      
    return [...baseHashtags, ...objectHashtags, ...platformHashtag];
  };
  
  const trendingHashtags = generatePersonalizedHashtags();

  // Generate video-specific trend opportunities
  const generateTrendOpportunities = () => {
    const objects = analysisData?.content_analysis?.objects || [];
    const platform = analysisData?.video_metadata?.platform || "TikTok";
    
    const baseOpportunities = [
      `${platform} viewers are engaging more with ${objects.length > 0 ? objects[0] : "content"} related videos`,
      `Short-form ${objects.length > 1 ? objects[1] : "educational"} content is gaining traction`
    ];
    
    // Add platform-specific opportunity
    if (platform === "TikTok") {
      baseOpportunities.push("Using trending sounds could boost your video's reach");
    } else if (platform === "Instagram") {
      baseOpportunities.push("Reels with on-screen text get 44% more engagement");
    } else if (platform === "YouTube") {
      baseOpportunities.push("Adding chapters to longer videos improves retention");
    }
    
    return baseOpportunities;
  };
  
  const trendOpportunities = generateTrendOpportunities();
  
  // Mock video metadata with values from analysisData when available
  const videoMetadata = {
    title: "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    resolution: "1080x1920",
    uploadTime: "Just now",
    platform: analysisData?.video_metadata?.platform || "TikTok",
    category: "Entertainment"
  };

  // Content quality insights based on specific video elements
  const contentInsights = [
    {
      label: "Hook Strength",
      value: analysisData?.engagement_prediction?.best_segments?.[0] ? 85 : 65,
      icon: <ChartBar className="h-4 w-4 text-red-400" />,
      description: analysisData?.engagement_prediction?.best_segments?.[0] 
        ? "Strong opening captures attention" 
        : "Consider improving your video's opening hook"
    },
    {
      label: "Pacing",
      value: 72,
      icon: <ChartBar className="h-4 w-4 text-yellow-400" />,
      description: analysisData?.content_analysis?.scene_transitions === "Multiple scenes detected"
        ? "Multiple scene transitions keep viewers engaged"
        : "Single scene format works well for short videos"
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
      description: `Good viewer retention expected for ${videoMetadata.duration} content`
    }
  ];

  // Content-specific recommendations
  const generatePersonalizedRecommendations = () => {
    const objects = analysisData?.content_analysis?.objects || [];
    const bestSegments = analysisData?.engagement_prediction?.best_segments || [];
    
    const recommendations = [
      {
        title: bestSegments.length > 0 ? "Optimize Your Best Segments" : "Optimize First 3 Seconds",
        description: bestSegments.length > 0 
          ? `Your best moment at ${bestSegments[0]?.timestamp} could work well as a preview or thumbnail.`
          : "Add a stronger hook at the beginning to grab viewer attention immediately."
      }
    ];
    
    // Add object-based recommendation
    if (objects.length > 0) {
      recommendations.push({
        title: `Highlight ${objects[0]} More Prominently`,
        description: `${objects[0]} appears to be a key element in your video that viewers respond to.`
      });
    }
    
    // Add platform-specific recommendation
    const platform = videoMetadata.platform;
    if (platform === "TikTok") {
      recommendations.push({
        title: "Use Trending Audio",
        description: "Incorporate popular TikTok sounds to boost discoverability on the platform."
      });
    } else if (platform === "Instagram") {
      recommendations.push({
        title: "Add Instagram-Optimized Captions",
        description: "Use 3-5 relevant hashtags and keep your caption under 125 characters."
      });
    } else {
      recommendations.push({
        title: "Add Text Overlays",
        description: "Include on-screen text to increase retention and highlight key points."
      });
    }
    
    // Add final recommendation
    recommendations.push({
      title: "Adjust Video Pacing",
      description: `For videos around ${videoMetadata.duration} in length, aim for 2-3 scene changes to maintain engagement.`
    });
    
    return recommendations;
  };

  const recommendations = generatePersonalizedRecommendations();
  
  // Content details for our new component
  const contentDetails = {
    detectedObjects: analysisData?.content_analysis?.objects || [],
    sceneTransitions: analysisData?.content_analysis?.scene_transitions || "Single scene video",
    detectedText: analysisData?.content_analysis?.text_detected || [],
    mainThemes: ["Entertainment", "Informative"],
    contentType: "Short-form video"
  };

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
      
      {/* Video Content Analysis - New Section */}
      <VideoContentDetails
        videoMetadata={videoMetadata}
        contentDetails={contentDetails}
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
