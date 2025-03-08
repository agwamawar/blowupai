
import { useState, useCallback, useEffect } from "react";
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
  onThumbnailReady?: (isReady: boolean) => void;
}

export function AnalysisResults({ 
  engagementScore, 
  mockHeatmapData, 
  analysisData,
  onThumbnailReady
}: AnalysisResultsProps) {
  const [activeNavItem, setActiveNavItem] = useState("dashboard");
  const [seekToTimestampFn, setSeekToTimestampFn] = useState<((timestamp: string) => void) | null>(null);
  const [isThumbnailReady, setIsThumbnailReady] = useState(false);

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
  
  // Handle thumbnail ready state
  const handleThumbnailReady = useCallback((isReady: boolean) => {
    setIsThumbnailReady(isReady);
    if (onThumbnailReady) {
      onThumbnailReady(isReady);
    }
  }, [onThumbnailReady]);
  
  // If there's no video URL, mark thumbnail as ready immediately
  useEffect(() => {
    if (!analysisData?.video_url && onThumbnailReady) {
      handleThumbnailReady(true);
    }
  }, [analysisData?.video_url, onThumbnailReady, handleThumbnailReady]);

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
                onThumbnailReady={handleThumbnailReady}
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
