
import { InsightItem } from "@/types/insightTypes";
import { AnalysisDataType } from "@/types/analysisTypes";

export function generateContentInsights(analysisData?: AnalysisDataType): InsightItem[] {
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
  
  // If no insights were generated, return an empty array
  // This is a change from returning defaultContentInsights
  return insights.length > 0 ? insights : [];
}
