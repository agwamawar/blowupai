
import { HighlightMoment } from "@/types/insightTypes";
import { AnalysisDataType } from "@/types/analysisTypes";
import { defaultHighlightMoments } from "@/mocks/contentMocks";

export function generateHighlightMoments(analysisData?: AnalysisDataType): HighlightMoment[] {
  return analysisData?.engagement_prediction?.best_segments?.map(segment => ({
    timestamp: segment.timestamp,
    title: "Key Moment",
    description: segment.reason,
    retention: 85,
    isPositive: true
  })) || defaultHighlightMoments;
}
