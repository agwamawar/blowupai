
import { useState, useCallback } from "react";
import { PipelineAnalysisTabs } from "../analysis/PipelineAnalysisTabs";
import { VideoSection } from "../VideoSection";
import { AnalysisDataType } from "@/types/analysisTypes";
import { generateHighlightMoments } from "./HighlightMomentsGenerator";
import { generateOptimizations } from "./OptimizationsGenerator";
import { generateContentInsights } from "./ContentInsightsGenerator";
import { generateRecommendations } from "./RecommendationsGenerator";

interface AnalysisResultsContentProps {
  analysisData?: AnalysisDataType;
  engagementScore: number;
  viralityScore: number;
  followerCount: number;
  videoMetadata: any;
  contentDetails: any;
  trendingHashtags: string[];
  trendOpportunities: string[];
  contentInsights: any[];
  recommendations: any[];
}

export function AnalysisResultsContent({
  analysisData,
  engagementScore,
  viralityScore,
  followerCount,
  videoMetadata,
  contentDetails,
  trendingHashtags,
  trendOpportunities,
  contentInsights,
  recommendations
}: AnalysisResultsContentProps) {
  const [seekToTimestampFn, setSeekToTimestampFn] = useState<((timestamp: string) => void) | null>(null);

  // Generate highlight moments from the best segments in the analysis data
  const highlightMoments = generateHighlightMoments(analysisData);

  // Extract optimization tips from the analysis data
  const finalOptimizations = generateOptimizations(analysisData);

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
      
      {/* Pipeline Analysis Tabs Section */}
      <div className="lg:col-span-2">
        <PipelineAnalysisTabs
          viralityScore={viralityScore}
          engagementScore={engagementScore}
          trendScore={analysisData?.trend_score || analysisData?.conceptAnalysis?.trendScore * 100 / 15 || 75}
          trendingHashtags={trendingHashtags || analysisData?.trending_hashtags || []}
          trendOpportunities={trendOpportunities || analysisData?.trend_opportunities || []}
          recommendations={recommendations || generateRecommendations(analysisData)}
          highlightMoments={highlightMoments}
          finalOptimizations={finalOptimizations}
          contentInsights={contentInsights || generateContentInsights(analysisData)}
          followerCount={followerCount}
          onTimestampClick={handleTimestampClick}
          analysisData={analysisData}
        />
      </div>
    </div>
  );
}
