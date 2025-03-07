
import { TrendingAnalysis } from "./TrendingAnalysis";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import { ViralPerformanceMetrics } from "./ViralPerformanceMetrics";
import { KeyViralMoments } from "./KeyViralMoments";
import { CompetitorBenchmark } from "./CompetitorBenchmark";
import { FinalOptimizations } from "./FinalOptimizations";
import { 
  highlightMoments as defaultHighlightMoments,
  finalOptimizations as defaultFinalOptimizations,
  defaultContentInsights,
  HighlightMoment,
  InsightItem
} from "@/mocks/insightsMockData";

interface InsightsSectionProps {
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
  followerCount?: number; // Added follower count prop
}

export function InsightsSection({
  trendScore = 85,
  trendingHashtags,
  trendOpportunities,
  recommendations = [],
  projectedReachBoost = 37,
  targetAudienceMatch = 91,
  highlightMoments = defaultHighlightMoments,
  finalOptimizations = defaultFinalOptimizations,
  contentInsights = defaultContentInsights,
  followerCount
}: InsightsSectionProps) {
  return (
    <>
      <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary text-lg flex items-center">
            <RocketIcon className="h-5 w-5 text-primary mr-2" />
            Viral Performance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Viral Performance Metrics */}
          <ViralPerformanceMetrics 
            trendScore={trendScore}
            projectedReachBoost={projectedReachBoost}
            targetAudienceMatch={targetAudienceMatch}
          />

          {/* Key Viral Moments */}
          <KeyViralMoments highlightMoments={highlightMoments} />
          
          {/* Trending Analysis */}
          <div className="mb-6">
            <TrendingAnalysis 
              trendScore={trendScore} 
              hashtags={trendingHashtags}
              opportunities={trendOpportunities}
            />
          </div>
          
          {/* Recommendations */}
          <div className="mb-6">
            <RecommendationsPanel recommendations={recommendations} />
          </div>
          
          {/* Competitor Benchmark */}
          <div className="mb-6">
            <CompetitorBenchmark insights={contentInsights} />
          </div>
          
          {/* Final Optimizations */}
          <FinalOptimizations optimizations={finalOptimizations} />
        </CardContent>
      </Card>
    </>
  );
}
