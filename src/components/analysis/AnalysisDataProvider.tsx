
import { useMemo } from "react";
import { 
  generatePersonalizedHashtags, 
  generateTrendOpportunities,
  generateContentInsights,
  generatePersonalizedRecommendations 
} from "@/utils/analysisUtils";
import { AnalysisDataType, VideoMetadataType, ContentDetailsType } from "@/types/analysisTypes";

interface AnalysisDataProviderProps {
  analysisData: AnalysisDataType | undefined;
  engagementScore: number;
  followerCount: number;
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
  followerCount,
  children 
}: AnalysisDataProviderProps) {
  // Extract content types from analysis data
  const contentTypes = useMemo(() => {
    const contentTypeString = analysisData?.video_metadata?.content_type || "Challenges";
    return contentTypeString.split(', ');
  }, [analysisData]);

  // Generate video metadata with values from analysisData when available
  const videoMetadata = useMemo(() => ({
    title: "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    resolution: "1080x1920",
    uploadTime: "Just now",
    platform: analysisData?.video_metadata?.platform || "TikTok",
    category: "Entertainment",
    audienceSize: followerCount
  }), [analysisData, followerCount]);

  // Generate content details for our component
  const contentDetails = useMemo(() => ({
    detectedObjects: analysisData?.content_analysis?.objects || [],
    sceneTransitions: analysisData?.content_analysis?.scene_transitions || "Single scene video",
    detectedText: analysisData?.content_analysis?.text_detected || [],
    mainThemes: contentTypes,
    contentType: "Short-form video",
    audienceSize: followerCount
  }), [analysisData, followerCount, contentTypes]);

  // Generate personalized content-based hashtags
  const trendingHashtags = useMemo(() => 
    generatePersonalizedHashtags(analysisData, followerCount), [analysisData, followerCount]);

  // Generate video-specific trend opportunities
  const trendOpportunities = useMemo(() => 
    generateTrendOpportunities(analysisData, followerCount), [analysisData, followerCount]);

  // Generate content quality insights
  const contentInsights = useMemo(() => 
    generateContentInsights(analysisData, followerCount), [analysisData, followerCount]);

  // Generate content-specific recommendations
  const recommendations = useMemo(() => 
    generatePersonalizedRecommendations(analysisData, followerCount), [analysisData, followerCount]);

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
