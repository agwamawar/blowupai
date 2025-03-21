
import { useState, useCallback, useEffect } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { InsightsPanel } from "./InsightsPanel";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";

// Sample data for highlight moments (will be replaced with real data later)
const sampleHighlightMoments: HighlightMoment[] = [
  {
    timestamp: "00:12",
    title: "Strong Hook",
    description: "The opening hook captures attention effectively",
    retention: 95,
    isPositive: true
  },
  {
    timestamp: "00:45",
    title: "Key Information",
    description: "Important information presented clearly",
    retention: 85,
    isPositive: true
  }
];

// Sample data for optimization tips
const sampleOptimizations: string[] = [
  "Add captions to improve accessibility",
  "Include a clear call-to-action at the end",
  "Use more visual transitions between key points"
];

// Sample content insights
const sampleContentInsights: InsightItem[] = [
  {
    label: "Pacing",
    value: 85,
    icon: {
      type: "timer",
      color: "blue"
    },
    description: "Good pacing throughout the video"
  },
  {
    label: "Visual Quality",
    value: 92,
    icon: {
      type: "image",
      color: "violet"
    },
    description: "High quality visuals with good lighting"
  }
];

interface AnalysisResultsProps {
  engagementScore: number;
  analysisData?: AnalysisDataType;
}

export function AnalysisResults({ 
  engagementScore, 
  analysisData
}: AnalysisResultsProps) {
  useEffect(() => {
    console.log('Rendering Analysis Results with:', {
      engagementScore,
      hasAnalysisData: !!analysisData,
      analysisDataKeys: analysisData ? Object.keys(analysisData) : []
    });
  }, [engagementScore, analysisData]);

  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [seekToTimestampFn, setSeekToTimestampFn] = useState<((timestamp: string) => void) | null>(null);

  // Extract follower count for display
  const followerCount = analysisData?.follower_count || 
                        analysisData?.video_metadata?.audience_size || 
                        analysisData?.content_analysis?.audience_demographics?.size || 
                        10000;

  // Register video player's seek function                      
  const handleSeekToTimestamp = useCallback((seekFn: (timestamp: string) => void) => {
    setSeekToTimestampFn(() => seekFn);
  }, []);

  // Handler for when a timestamp is clicked
  const handleTimestampClick = useCallback((timestamp: string) => {
    if (seekToTimestampFn) {
      seekToTimestampFn(timestamp);
    }
  }, [seekToTimestampFn]);

  return (
    <AnalysisDashboard 
      activeNavItem={activeNavItem}
      onNavigate={setActiveNavItem}
      analysisData={analysisData}
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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Fixed Video Preview Section */}
            <div className="lg:col-span-1">
              <VideoSection 
                videoUrl={analysisData?.video_url} 
                metadata={videoMetadata}
                followerCount={followerCount}
                onSeekToTimestamp={handleSeekToTimestamp}
                isFixed={true}
              />
            </div>
            
            {/* Content Analysis Section */}
            <div className="lg:col-span-2">
              {/* Content Quality, Trending Analysis & Recommendations */}
              <InsightsPanel 
                trendingHashtags={trendingHashtags}
                trendOpportunities={trendOpportunities}
                recommendations={recommendations}
                highlightMoments={sampleHighlightMoments}
                finalOptimizations={sampleOptimizations}
                contentInsights={contentInsights || sampleContentInsights}
                followerCount={followerCount}
                onTimestampClick={handleTimestampClick}
              />
            </div>
          </div>
        )}
      </AnalysisDataProvider>
    </AnalysisDashboard>
  );
}
