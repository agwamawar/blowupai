
import { HighlightMoment } from "@/types/insightTypes";
import { defaultHighlightMoments } from "@/mocks/insightsMockData";
import { AnalysisDataType } from "@/types/analysisTypes";

export function generateHighlightMoments(analysisData?: AnalysisDataType): HighlightMoment[] {
  return analysisData?.engagement_prediction?.best_segments?.map(segment => ({
    timestamp: segment.timestamp,
    title: "Key Moment",
    description: segment.reason,
    retention: 85,
    isPositive: true
  })) || defaultHighlightMoments;
}
