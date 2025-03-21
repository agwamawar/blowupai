
import { SuccessReport } from "./insights/SuccessReport";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";

interface InsightsPanelProps {
  contentInsights?: InsightItem[];
  trendScore?: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations?: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  bestSegments?: Array<{ timestamp: string; reason: string }>;
  projectedReachBoost?: number;
  targetAudienceMatch?: number;
  highlightMoments?: HighlightMoment[];
  finalOptimizations?: string[];
  followerCount?: number;
  onTimestampClick?: (timestamp: string) => void;
}

export function InsightsPanel({
  trendScore = 85,
  trendingHashtags,
  trendOpportunities,
  recommendations = [],
  projectedReachBoost = 37,
  targetAudienceMatch = 91,
  highlightMoments = [],
  finalOptimizations = [],
  contentInsights = [],
  followerCount,
  onTimestampClick
}: InsightsPanelProps) {
  return (
    <>
      <SuccessReport 
        trendScore={trendScore}
        trendingHashtags={trendingHashtags}
        trendOpportunities={trendOpportunities}
        recommendations={recommendations}
        projectedReachBoost={projectedReachBoost}
        targetAudienceMatch={targetAudienceMatch}
        highlightMoments={highlightMoments}
        finalOptimizations={finalOptimizations}
        contentInsights={contentInsights}
        followerCount={followerCount}
        onTimestampClick={onTimestampClick}
      />
    </>
  );
}
