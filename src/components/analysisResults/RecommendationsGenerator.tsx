
import { AnalysisDataType } from "@/types/analysisTypes";

export function generateRecommendations(analysisData?: AnalysisDataType) {
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
}
