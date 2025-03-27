
import { ReactNode } from "react";
import { RocketIcon } from "lucide-react";
import { InsightCard } from "./InsightCard";
import { ViralMetrics } from "../ViralMetrics";
import { KeyMoments } from "../KeyMoments";
import { TrendAnalysis } from "../TrendAnalysis";
import { RecommendationsPanel } from "../RecommendationsPanel";
import { OptimizationTips } from "../OptimizationTips";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";

interface SuccessReportProps {
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  projectedReachBoost: number;
  targetAudienceMatch: number;
  highlightMoments: HighlightMoment[];
  finalOptimizations: string[];
  contentInsights: InsightItem[];
  followerCount?: number;
  onTimestampClick?: (timestamp: string) => void;
}

export function SuccessReport({
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations,
  projectedReachBoost,
  targetAudienceMatch,
  highlightMoments,
  finalOptimizations,
  contentInsights,
  followerCount,
  onTimestampClick
}: SuccessReportProps) {
  return (
    <InsightCard 
      icon={<RocketIcon className="h-5 w-5 text-primary mr-2" />} 
      title="Video Success Report"
    >
      {/* Performance Stats */}
      <ViralMetrics 
        trendScore={trendScore}
        projectedReachBoost={projectedReachBoost}
        targetAudienceMatch={targetAudienceMatch}
      />

      {/* Key Video Moments */}
      <KeyMoments 
        highlightMoments={highlightMoments}
        onTimestampClick={onTimestampClick} 
      />
      
      {/* Trending Analysis */}
      <div className="mb-6">
        <TrendAnalysis 
          trendScore={trendScore} 
          trendingHashtags={trendingHashtags}
          opportunities={trendOpportunities}
        />
      </div>
      
      {/* Recommendations */}
      <div className="mb-6">
        <RecommendationsPanel recommendations={recommendations} />
      </div>
      
      {/* Quick Fixes */}
      <OptimizationTips optimizations={finalOptimizations} />
    </InsightCard>
  );
}
