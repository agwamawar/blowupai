
import { useState } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { VideoContentDetails } from "./VideoContentDetails";
import { EngagementSection } from "./EngagementSection";
import { InsightsSection } from "./InsightsSection";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";

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
            
            {/* Video Content Analysis */}
            <VideoContentDetails
              videoMetadata={videoMetadata}
              contentDetails={contentDetails}
            />
            
            {/* Engagement Score & Heatmap */}
            <EngagementSection 
              engagementScore={engagementScore}
              heatmapData={mockHeatmapData}
              bestSegments={analysisData?.engagement_prediction?.best_segments}
            />
            
            {/* Content Quality, Trending Analysis & Recommendations */}
            <InsightsSection 
              contentInsights={contentInsights}
              trendScore={85}
              trendingHashtags={trendingHashtags}
              trendOpportunities={trendOpportunities}
              recommendations={recommendations}
            />
          </>
        )}
      </AnalysisDataProvider>
    </AnalysisDashboard>
  );
}
