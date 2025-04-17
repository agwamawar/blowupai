
import React from "react";
import { BarChart, Brain, Lightbulb, TrendingUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PipelineAnalysisTabs } from "@/components/analysis/PipelineAnalysisTabs";
import { ViralMetrics } from "@/components/ViralMetrics";
import { InsightsPanel } from "@/components/InsightsPanel";
import { EngagementInsights } from "./EngagementInsights";
import { TrendingContentAnalysis } from "./TrendingContentAnalysis";
import { AnalysisHeader } from "./sections/AnalysisHeader";
import { AnalysisTabsContainer } from "./sections/AnalysisTabsContainer";

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
    <div className="flex-1 px-8 py-8">
      <AnalysisHeader />
      
      {/* Overall Metrics Summary */}
      <div className="mb-8">
        <ViralMetrics 
          trendScore={trendScore}
          projectedReachBoost={37}
          targetAudienceMatch={91}
        />
      </div>
      
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
