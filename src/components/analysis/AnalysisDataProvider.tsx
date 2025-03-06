
import { useMemo } from "react";
import { 
  generatePersonalizedHashtags, 
  generateTrendOpportunities,
  generateContentInsights,
  generatePersonalizedRecommendations 
} from "@/utils/analysisDataUtils";
import { AnalysisDataType, VideoMetadataType, ContentDetailsType } from "@/types/analysisTypes";

interface AnalysisDataProviderProps {
  analysisData: AnalysisDataType | undefined;
  engagementScore: number;
  children: (props: {
    videoMetadata: VideoMetadataType;
    contentDetails: ContentDetailsType;
    trendingHashtags: string[];
    trendOpportunities: string[];
    contentInsights: any[];
    recommendations: any[];
  }) => React.ReactNode;
}

export function AnalysisDataProvider({ 
  analysisData, 
  engagementScore, 
  children 
}: AnalysisDataProviderProps) {
  // Generate video metadata with values from analysisData when available
  const videoMetadata = useMemo(() => ({
    title: "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    resolution: "1080x1920",
    uploadTime: "Just now",
    platform: analysisData?.video_metadata?.platform || "TikTok",
    category: "Entertainment"
  }), [analysisData]);

  // Generate content details for our component
  const contentDetails = useMemo(() => ({
    detectedObjects: analysisData?.content_analysis?.objects || [],
    sceneTransitions: analysisData?.content_analysis?.scene_transitions || "Single scene video",
    detectedText: analysisData?.content_analysis?.text_detected || [],
    mainThemes: ["Entertainment", "Informative"],
    contentType: "Short-form video"
  }), [analysisData]);

  // Generate personalized content-based hashtags
  const trendingHashtags = useMemo(() => 
    generatePersonalizedHashtags(analysisData), [analysisData]);

  // Generate video-specific trend opportunities
  const trendOpportunities = useMemo(() => 
    generateTrendOpportunities(analysisData), [analysisData]);

  // Generate content quality insights
  const contentInsights = useMemo(() => 
    generateContentInsights(analysisData), [analysisData]);

  // Generate content-specific recommendations
  const recommendations = useMemo(() => 
    generatePersonalizedRecommendations(analysisData), [analysisData]);

  return (
    <>
      {children({
        videoMetadata,
        contentDetails,
        trendingHashtags,
        trendOpportunities,
        contentInsights,
        recommendations
      })}
    </>
  );
}
