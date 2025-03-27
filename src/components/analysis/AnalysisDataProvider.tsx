
import { ReactNode } from "react";
import { AnalysisDataType } from "@/types/analysisTypes";

interface AnalysisDataProviderProps {
  analysisData: AnalysisDataType;
  engagementScore?: number;
  viralityScore?: number;
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
  viralityScore = 0,
  followerCount = 0,
  children
}: AnalysisDataProviderProps) {
  // Extract video metadata
  const videoMetadata = analysisData?.video_metadata || {};
  
  // Extract content details
  const contentDetails = analysisData?.content_analysis || {};

  // Extract trending hashtags
  const trendingHashtags = analysisData?.trending_hashtags || [];
  
  // Extract trend opportunities
  const trendOpportunities = analysisData?.trend_opportunities || [];
  
  // Generate content insights from the analysis data
  const contentInsights = analysisData?.content_insights || generateContentInsightsFromAnalysis(analysisData);
  
  // Generate recommendations from the analysis data
  const recommendations = analysisData?.recommendations || generateRecommendationsFromAnalysis(analysisData);

  return children({
    videoMetadata,
    contentDetails,
    trendingHashtags,
    trendOpportunities,
    contentInsights,
    recommendations
  });
}

function generateContentInsightsFromAnalysis(analysisData: AnalysisDataType) {
  const insights = [];
  
  if (analysisData?.conceptAnalysis) {
    const { trendScore, emotionalScore, hookScore, uniquenessScore } = analysisData.conceptAnalysis;
    
    if (trendScore) {
      insights.push({
        label: "Trend Match",
        value: Math.round(trendScore * 100 / 15), // Normalize to 0-100
        icon: { type: "trending-up", color: "blue" },
        description: "How well the content matches current trends"
      });
    }
    
    if (emotionalScore) {
      insights.push({
        label: "Emotional Impact",
        value: Math.round(emotionalScore * 100 / 20), // Normalize to 0-100
        icon: { type: "heart", color: "red" },
        description: "Emotional resonance with the audience"
      });
    }
  }
  
  if (analysisData?.technicalAnalysis) {
    const { videoQuality } = analysisData.technicalAnalysis;
    
    if (videoQuality) {
      insights.push({
        label: "Video Quality",
        value: Math.round(videoQuality * 10),
        icon: { type: "video", color: "green" },
        description: "Overall technical quality of the video"
      });
    }
  }
  
  return insights;
}

function generateRecommendationsFromAnalysis(analysisData: AnalysisDataType) {
  const recommendations = [];
  
  // Add recommendations from viralityScore
  if (analysisData?.viralityScore?.improvements) {
    recommendations.push({
      title: "Virality Improvements",
      description: "Changes to increase viral potential",
      actionItems: analysisData.viralityScore.improvements
    });
  }
  
  // Add recommendations from technicalAnalysis
  if (analysisData?.technicalAnalysis?.recommendations) {
    recommendations.push({
      title: "Technical Improvements",
      description: "Enhance technical quality",
      actionItems: analysisData.technicalAnalysis.recommendations
    });
  }
  
  // Add recommendations from similarContent
  if (analysisData?.similarContent?.recommendations) {
    recommendations.push({
      title: "Content Strategy",
      description: "Based on similar top-performing content",
      actionItems: analysisData.similarContent.recommendations
    });
  }
  
  return recommendations;
}
