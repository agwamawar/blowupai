
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
    "Enhance the dad's reaction with a record-scratch sound effect and freeze frame",
    "Add text overlay explaining you specialize in kids' textured/curly hair during salon scenes",
    "Include close-up shots of your techniques for styling mixed-race hair textures",
    "Add your salon information and booking details in the final frames",
    "Create a follow-up video showing the parents' reaction to the final result"
  ];
}
