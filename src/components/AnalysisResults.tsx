
import { useState, useCallback, useEffect } from "react";
import { AnalysisDashboard } from "./AnalysisDashboard";
import { VideoSection } from "./VideoSection";
import { AnalysisDataProvider } from "./analysis/AnalysisDataProvider";
import { AnalysisDataType } from "@/types/analysisTypes";
import { InsightsPanel } from "./InsightsPanel";
import { HighlightMoment, InsightItem } from "@/types/insightTypes";
import { topPerformingContent } from "@/mocks/insightsMockData";

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

  // Generate highlight moments from the best segments in the analysis data
  const highlightMoments: HighlightMoment[] = analysisData?.engagement_prediction?.best_segments?.map(segment => ({
    timestamp: segment.timestamp,
    title: "Key Moment",
    description: segment.reason,
    retention: 85,
    isPositive: true
  })) || [];

  // Extract optimization tips from the analysis data
  const finalOptimizations: string[] = analysisData?.viralityScore?.improvements || 
                                     analysisData?.technicalAnalysis?.recommendations || 
                                     [];

  // Generate content insights from the analysis data
  const generateContentInsights = (): InsightItem[] => {
    const insights: InsightItem[] = [];
    
    if (analysisData?.conceptAnalysis) {
      const { trendScore, emotionalScore, hookScore, uniquenessScore } = analysisData.conceptAnalysis;
      
      if (trendScore) {
        insights.push({
          label: "Trend Match",
          value: Math.round(trendScore * 100 / 15), // Normalize to 0-100
          icon: { type: "trending-up", color: "blue" },
          description: "How well the content matches current trends"
        });
      }
      
      if (emotionalScore) {
        insights.push({
          label: "Emotional Impact",
          value: Math.round(emotionalScore * 100 / 20), // Normalize to 0-100
          icon: { type: "heart", color: "red" },
          description: "Emotional resonance with the audience"
        });
      }
      
      if (hookScore) {
        insights.push({
          label: "Hook Strength",
          value: Math.round(hookScore * 100 / 20), // Normalize to 0-100
          icon: { type: "anchor", color: "violet" },
          description: "Effectiveness of the opening hook"
        });
      }
      
      if (uniquenessScore) {
        insights.push({
          label: "Uniqueness",
          value: Math.round(uniquenessScore * 100 / 15), // Normalize to 0-100
          icon: { type: "sparkles", color: "amber" },
          description: "Originality compared to similar content"
        });
      }
    }
    
    if (analysisData?.technicalAnalysis) {
      const { videoQuality, stabilization, lighting } = analysisData.technicalAnalysis;
      
      if (videoQuality) {
        insights.push({
          label: "Video Quality",
          value: Math.round(videoQuality * 10),
          icon: { type: "video", color: "green" },
          description: "Overall technical quality of the video"
        });
      }
      
      if (stabilization) {
        insights.push({
          label: "Stability",
          value: Math.round(stabilization * 10),
          icon: { type: "check-circle", color: "teal" },
          description: "Stability and smoothness of footage"
        });
      }
      
      if (lighting) {
        insights.push({
          label: "Lighting",
          value: Math.round(lighting * 10),
          icon: { type: "sun", color: "yellow" },
          description: "Quality of lighting throughout the video"
        });
      }
    }
    
    return insights.length > 0 ? insights : [];
  };

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

  // Generate recommendations from the analysis data
  const generateRecommendations = () => {
    const recommendations = [];
    
    // Add recommendations from viralityScore
    if (analysisData?.viralityScore?.improvements) {
      recommendations.push({
        title: "Virality Improvements",
        description: "Changes to increase viral potential",
        actionItems: analysisData.viralityScore.improvements
      });
    }
    
    // Add recommendations from technicalAnalysis
    if (analysisData?.technicalAnalysis?.recommendations) {
      recommendations.push({
        title: "Technical Improvements",
        description: "Enhance technical quality",
        actionItems: analysisData.technicalAnalysis.recommendations
      });
    }
    
    // Add recommendations from similarContent
    if (analysisData?.similarContent?.recommendations) {
      recommendations.push({
        title: "Content Strategy",
        description: "Based on similar top-performing content",
        actionItems: analysisData.similarContent.recommendations
      });
    }
    
    return recommendations.length > 0 ? recommendations : [
      {
        title: "Enhance Engagement",
        description: "Recommendations to increase viewer interaction",
        actionItems: ["Add pattern interrupts", "Include clear calls-to-action", "Use trending audio"]
      }
    ];
  };

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
                trendScore={analysisData?.trend_score || analysisData?.conceptAnalysis?.trendScore * 100 / 15 || 75}
                trendingHashtags={trendingHashtags || analysisData?.trending_hashtags || []}
                trendOpportunities={trendOpportunities || analysisData?.trend_opportunities || []}
                recommendations={recommendations || generateRecommendations()}
                highlightMoments={highlightMoments}
                finalOptimizations={finalOptimizations}
                contentInsights={contentInsights || generateContentInsights()}
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
