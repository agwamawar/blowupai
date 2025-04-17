
import React from "react";
import { PipelineAnalysisTabs } from "@/components/analysis/PipelineAnalysisTabs";

interface AnalysisTabsContainerProps {
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

export function AnalysisTabsContainer({
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
}: AnalysisTabsContainerProps) {
  return (
    <div className="bg-white/30 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/20">
      <PipelineAnalysisTabs
        viralityScore={viralityScore}
        engagementScore={engagementScore}
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
