
import { useState, useEffect } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { AnalysisResultsContent } from "./analysisResults/AnalysisResultsContent";
import { executionAnalysisMockData } from "@/mocks/execution/executionAnalysisMockData";

interface AnalysisResultsProps {
  engagementScore: number;
  viralityScore: number;
  analysisData?: AnalysisDataType;
}

export function AnalysisResults({ 
  engagementScore, 
  viralityScore,
  analysisData
}: AnalysisResultsProps) {
  // Ensure required data structures exist with defaults
  const processedAnalysisData = {
    video_metadata: analysisData?.video_metadata || {
      duration: "0:45",
      platform: "TikTok",
      title: "Mall Dad Prank Gone Right ✨💇‍♀️"
    },
    content_analysis: analysisData?.content_analysis || {
      objects: ["scissors", "hair", "person", "mall"],
      scene_transitions: "Multiple scenes detected",
      text_detected: ["How we almost got kicked out", "Royalty Treatment"]
    },
    engagement_prediction: analysisData?.engagement_prediction || {
      best_segments: [
        {timestamp: "0:02", reason: "Dad's protective reaction creates viral-worthy moment"},
        {timestamp: "0:15", reason: "Skilled styling sequence with perfect pacing"}
      ]
    },
    technicalAnalysis: analysisData?.technicalAnalysis || executionAnalysisMockData
  };

  useEffect(() => {
    console.log('AnalysisResults: Component mounted');
    console.log('AnalysisResults: Processed data:', processedAnalysisData);
  }, [processedAnalysisData]);

  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  // Extract follower count with fallback
  const followerCount = analysisData?.follower_count || 10000;

  // Ensure we have the necessary technicalAnalysis data
  const enhancedAnalysisData = {
    ...analysisData,
    technicalAnalysis: analysisData?.technicalAnalysis || executionAnalysisMockData
  };

  return (
    <AnalysisDashboard 
      activeNavItem={activeNavItem}
      onNavigate={setActiveNavItem}
      analysisData={enhancedAnalysisData}
    >
      <AnalysisDataProvider 
        analysisData={enhancedAnalysisData} 
        engagementScore={engagementScore}
        viralityScore={viralityScore}
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
          <AnalysisResultsContent
            analysisData={enhancedAnalysisData}
            engagementScore={engagementScore}
            viralityScore={viralityScore}
            followerCount={followerCount}
            videoMetadata={videoMetadata}
            contentDetails={contentDetails}
            trendingHashtags={trendingHashtags}
            trendOpportunities={trendOpportunities}
            contentInsights={contentInsights}
            recommendations={recommendations}
          />
        )}
      </AnalysisDataProvider>
    </AnalysisDashboard>
  );
};
