
import { AnalysisDataType } from "@/types/analysisTypes";
import { defaultOptimizations } from "@/mocks/insightsMockData";

export function generateOptimizations(analysisData?: AnalysisDataType): string[] {
  return analysisData?.viralityScore?.improvements || 
         analysisData?.technicalAnalysis?.recommendations || 
         defaultOptimizations;
}
