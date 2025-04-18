
import { KeyMetadataHighlights } from "./KeyMetadataHighlights";
import { NarrativeSnapshot } from "./NarrativeSnapshot";
import { TimelineSummary } from "./TimelineSummary";
import { AnalysisDataType } from "@/types/analysisTypes";

interface SummaryOverviewProps {
  analysisData: AnalysisDataType;
}

export function SummaryOverview({ analysisData }: SummaryOverviewProps) {
  return (
    <div className="space-y-6">
      <KeyMetadataHighlights
        duration={analysisData?.video_metadata?.duration || "1:20"}
        platform={analysisData?.video_metadata?.platform || "Instagram Reels"}
        format={analysisData?.video_metadata?.format || "Portrait"}
        contentType={analysisData?.content_analysis?.content_type || "Lifestyle Skit"}
        targetAudience={analysisData?.target_audience || ["Parents", "Comedy Fans"]}
      />
      
      <NarrativeSnapshot 
        summary={analysisData?.narrative_summary || "A surprise haircut in the mall turns into a heartwarming salon transformation."}
      />
      
      <TimelineSummary 
        timelinePoints={analysisData?.timeline_points || [
          { label: "Hook", description: "Surprising mall approach", timestamp: "0:00" },
          { label: "Conflict", description: "Dad's reaction to prank", timestamp: "0:03" },
          { label: "Payoff", description: "Salon transformation", timestamp: "0:15" },
          { label: "CTA", description: "Royal treatment message", timestamp: "0:27" }
        ]}
      />
    </div>
  );
}
