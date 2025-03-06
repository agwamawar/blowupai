
import { ContentQualityInsights } from "./ContentQualityInsights";
import { TrendingAnalysis } from "./TrendingAnalysis";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { CompetitorBenchmark } from "./CompetitorBenchmark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import { ViralPerformanceMetrics } from "./ViralPerformanceMetrics";
import { KeyViralMoments } from "./KeyViralMoments";
import { SocialAmplificationStrategy } from "./SocialAmplificationStrategy";
import { FinalOptimizations } from "./FinalOptimizations";
import { 
  highlightMoments as defaultHighlightMoments,
  finalOptimizations as defaultFinalOptimizations,
  socialAmplificationStrategies as defaultSocialStrategies,
  HighlightMoment,
  StrategySection
} from "@/mocks/insightsMockData";

interface InsightItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  benchmarkValue?: number;
}

interface InsightsSectionProps {
  contentInsights: InsightItem[];
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  bestSegments?: Array<{ timestamp: string; reason: string }>;
  projectedReachBoost?: number;
  targetAudienceMatch?: number;
  highlightMoments?: HighlightMoment[];
  finalOptimizations?: string[];
  socialAmplificationStrategies?: StrategySection[];
}

export function InsightsSection({
  contentInsights,
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations,
  bestSegments = [],
  projectedReachBoost = 37,
  targetAudienceMatch = 91,
  highlightMoments = defaultHighlightMoments,
  finalOptimizations = defaultFinalOptimizations,
  socialAmplificationStrategies = defaultSocialStrategies
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
          
          {/* Content Quality and Trending Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ContentQualityInsights insights={contentInsights} />
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
          
          {/* Social Amplification Strategy */}
          <div className="mb-6">
            <SocialAmplificationStrategy strategies={socialAmplificationStrategies} />
          </div>
          
          {/* Final Optimizations */}
          <FinalOptimizations optimizations={finalOptimizations} />
        </CardContent>
      </Card>
    </>
  );
}
