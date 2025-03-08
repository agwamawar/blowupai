
import { useState, useCallback } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { InsightsPanel } from "./InsightsPanel";
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
            {/* Fixed Video Preview Section - Hidden on large screens */}
            <div className="lg:hidden">
              <VideoSection 
                videoUrl={analysisData?.video_url} 
                metadata={videoMetadata}
                followerCount={followerCount}
                onSeekToTimestamp={handleSeekToTimestamp}
                isFixed={false}
              />
            </div>
            
            {/* Fixed Video Preview Section - Only visible on large screens */}
            <div className="hidden lg:block">
              <VideoSection 
                videoUrl={analysisData?.video_url} 
                metadata={videoMetadata}
                followerCount={followerCount}
                onSeekToTimestamp={handleSeekToTimestamp}
                isFixed={true}
              />
            </div>
            
            {/* Content Analysis Section with left margin on large screens to account for fixed video */}
            <div className="lg:col-span-3 lg:ml-[420px]">
              {/* Content Quality, Trending Analysis & Recommendations */}
              <InsightsPanel 
                trendingHashtags={trendingHashtags}
                trendOpportunities={trendOpportunities}
                recommendations={recommendations}
                highlightMoments={highlightMoments}
                finalOptimizations={finalOptimizations}
                contentInsights={contentInsights || defaultContentInsights}
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
