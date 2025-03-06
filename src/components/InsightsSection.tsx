
import { ContentQualityInsights } from "./ContentQualityInsights";
import { TrendingAnalysis } from "./TrendingAnalysis";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { CompetitorBenchmark } from "./CompetitorBenchmark";

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
}

export function InsightsSection({
  contentInsights,
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations
}: InsightsSectionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <ContentQualityInsights insights={contentInsights} />
        
        <TrendingAnalysis 
          trendScore={trendScore} 
          hashtags={trendingHashtags}
          opportunities={trendOpportunities}
        />
      </div>
      
      <div className="mb-6">
        <RecommendationsPanel recommendations={recommendations} />
      </div>

      <div className="mb-6">
        <CompetitorBenchmark 
          insights={contentInsights}
        />
      </div>
    </>
  );
}
