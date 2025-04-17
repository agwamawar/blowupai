
import { AnalysisDataType } from "@/types/analysisTypes";

export function generateOptimizations(analysisData?: AnalysisDataType): string[] {
  const optimizations: string[] = [];
  
  // Extract optimizations from viralityScore
  if (analysisData?.viralityScore?.optimizations) {
    optimizations.push(...analysisData.viralityScore.optimizations);
  }
  
  // Extract optimizations from technicalAnalysis
  if (analysisData?.technicalAnalysis?.optimizations) {
    optimizations.push(...analysisData.technicalAnalysis.optimizations);
  }
  
  // Extract optimizations from contentAnalysis
  if (analysisData?.contentAnalysis?.optimizations) {
    optimizations.push(...analysisData.contentAnalysis.optimizations);
  }
  
  return optimizations.length > 0 ? optimizations : [
    "Add a strong hook in the first 3 seconds to capture attention",
    "Include text overlays to improve viewer comprehension",
    "Add music that matches the mood and pace of your content",
    "Ensure your lighting is consistent throughout the video",
    "Use pattern interrupts (transitions, sound effects) to maintain engagement"
  ];
}
