
import { useState, useEffect } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { AnalysisResultsContent } from "./analysisResults/AnalysisResultsContent";

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
      duration: "0:00",
      platform: "Unknown",
      title: "Untitled Video"
    },
    content_analysis: analysisData?.content_analysis || {
      objects: [],
      scene_transitions: "",
      text_detected: []
    },
    engagement_prediction: analysisData?.engagement_prediction || {
      best_segments: []
    }
  };

  useEffect(() => {
    console.log('AnalysisResults: Component mounted');
    console.log('AnalysisResults: Processed data:', processedAnalysisData);
  }, [processedAnalysisData]);

  const [activeNavItem, setActiveNavItem] = useState("dashboard");

  // Extract follower count with fallback
  const followerCount = analysisData?.follower_count || 10000;

  return (
    <AnalysisDashboard 
      activeNavItem={activeNavItem}
      onNavigate={setActiveNavItem}
      analysisData={analysisData}
    >
      <AnalysisDataProvider 
        analysisData={analysisData} 
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
            analysisData={analysisData}
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
