
import { useState } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { 
  highlightMoments, 
  finalOptimizations, 
  socialAmplificationStrategies 
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

  return (
    <AnalysisDashboard 
      activeNavItem={activeNavItem}
      onNavigate={setActiveNavItem}
    >
      <AnalysisDataProvider 
        analysisData={analysisData} 
        engagementScore={engagementScore}
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
            />
            
            {/* Content Quality, Trending Analysis & Recommendations */}
            <div className="mt-6">
              <InsightsSection 
                trendingHashtags={trendingHashtags}
                trendOpportunities={trendOpportunities}
                recommendations={recommendations}
                highlightMoments={highlightMoments}
                finalOptimizations={finalOptimizations}
                socialAmplificationStrategies={socialAmplificationStrategies}
              />
            </div>
          </>
        )}
      </AnalysisDataProvider>
    </AnalysisDashboard>
  );
}
