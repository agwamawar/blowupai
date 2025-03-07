
import { useState } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { InsightsSection } from "./InsightsSection";
import { 
  highlightMoments, 
  finalOptimizations,
  defaultContentInsights
} from "@/mocks/insightsMockData";

interface AnalysisResultsProps {
  engagementScore: number;
  mockHeatmapData: Array<{ time: string; engagement: number }>;
  analysisData?: AnalysisDataType;
}

export function AnalysisResults({ 
  engagementScore, 
  mockHeatmapData, 
  analysisData 
}: AnalysisResultsProps) {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  // Extract follower count for display
  const followerCount = analysisData?.follower_count || 
                        analysisData?.video_metadata?.audience_size || 
                        analysisData?.content_analysis?.audience_demographics?.size || 
                        10000;

  return (
    <AnalysisDashboard 
      activeNavItem={activeNavItem}
      onNavigate={setActiveNavItem}
    >
      <AnalysisDataProvider 
        analysisData={analysisData} 
        engagementScore={engagementScore}
        followerCount={followerCount}
      >
        {({ 
          videoMetadata, 
          contentDetails, 
          trendingHashtags, 
          trendOpportunities, 
          contentInsights, 
          recommendations 
        }) => (
          <>
            {/* Video Preview & Metadata */}
            <VideoSection 
              videoUrl={analysisData?.video_url} 
              metadata={videoMetadata}
              followerCount={followerCount}
            />
            
            {/* Content Quality, Trending Analysis & Recommendations */}
            <div className="mt-6">
              <InsightsSection 
                trendingHashtags={trendingHashtags}
                trendOpportunities={trendOpportunities}
                recommendations={recommendations}
                highlightMoments={highlightMoments}
                finalOptimizations={finalOptimizations}
                contentInsights={contentInsights || defaultContentInsights}
                followerCount={followerCount}
              />
            </div>
          </>
        )}
      </AnalysisDataProvider>
    </AnalysisDashboard>
  );
}
