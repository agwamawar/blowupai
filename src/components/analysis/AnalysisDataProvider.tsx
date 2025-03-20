import { useMemo } from "react";
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
  const videoMetadata = useMemo(() => ({
    title: analysisData?.video_metadata?.title || "Untitled",
    duration: analysisData?.video_metadata?.duration || "0:00",
    resolution: analysisData?.video_metadata?.resolution || "1080x1920",
    uploadTime: analysisData?.video_metadata?.upload_time || new Date().toISOString(),
    platform: analysisData?.video_metadata?.platform || "Unknown",
    category: analysisData?.video_metadata?.category || "Uncategorized",
    audienceSize: followerCount
  }), [analysisData, followerCount]);

  const contentDetails = useMemo(() => ({
    hashtags: analysisData?.content_analysis?.hashtags || [],
    topics: analysisData?.content_analysis?.topics || [],
    style: analysisData?.content_analysis?.style || "Unknown",
    mood: analysisData?.content_analysis?.mood || "Neutral"
  }), [analysisData]);

  const trendingHashtags = useMemo(() => 
    analysisData?.trend_analysis?.trending_hashtags || [], 
    [analysisData]
  );

  const trendOpportunities = useMemo(() => 
    analysisData?.trend_analysis?.opportunities || [],
    [analysisData]
  );

  const contentInsights = useMemo(() => 
    analysisData?.content_insights || [],
    [analysisData]
  );

  const recommendations = useMemo(() => 
    analysisData?.recommendations || [],
    [analysisData]
  );

  return children({
    videoMetadata,
    contentDetails,
    trendingHashtags,
    trendOpportunities,
    contentInsights,
    recommendations
  });
}