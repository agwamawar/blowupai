
import React from "react";
import { AnalysisTabsContainer } from "./sections/AnalysisTabsContainer";
import { AnalysisDataType } from "@/types/analysisTypes";

interface AnalysisContentProps {
  engagementScore: number;
  viralityScore: number;
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  highlightMoments: any[];
  finalOptimizations: string[];
  contentInsights: any[];
  followerCount: number;
  analysisData: any;
  onTimestampClick: (timestamp: string) => void;
}

export function AnalysisContent({
  engagementScore,
  viralityScore,
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations,
  highlightMoments,
  finalOptimizations,
  contentInsights,
  followerCount,
  analysisData,
  onTimestampClick
}: AnalysisContentProps) {
  return (
    <div className="flex-1">
      {/* Tabbed Analysis Section */}
      <AnalysisTabsContainer 
        engagementScore={engagementScore}
        viralityScore={viralityScore}
        trendScore={trendScore}
        trendingHashtags={trendingHashtags}
        trendOpportunities={trendOpportunities}
        recommendations={recommendations}
        highlightMoments={highlightMoments}
        finalOptimizations={finalOptimizations}
        contentInsights={contentInsights}
        followerCount={followerCount}
        analysisData={analysisData}
        onTimestampClick={onTimestampClick}
      />
    </div>
  );
}
