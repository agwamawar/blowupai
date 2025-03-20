import { ReactNode } from "react";
import { AnalysisDataType } from "@/types/analysisTypes";

interface AnalysisDataProviderProps {
  analysisData: AnalysisDataType;
  engagementScore?: number;
  followerCount?: number;
  children: (data: {
    videoMetadata: any;
    contentDetails: any;
    trendingHashtags: string[];
    trendOpportunities: string[];
    contentInsights: any[];
    recommendations: any[];
  }) => ReactNode;
}

export function AnalysisDataProvider({
  analysisData,
  engagementScore = 0,
  followerCount = 0,
  children
}: AnalysisDataProviderProps) {
  const videoMetadata = analysisData?.video_metadata || {};
  const contentDetails = analysisData?.content_analysis || {};

  const trendingHashtags = analysisData?.trending_hashtags || [];
  const trendOpportunities = analysisData?.trend_opportunities || [];
  const contentInsights = analysisData?.content_insights || [];
  const recommendations = analysisData?.recommendations || [];

  return children({
    videoMetadata,
    contentDetails,
    trendingHashtags,
    trendOpportunities,
    contentInsights,
    recommendations
  });
}