
import { HighlightMoment } from "@/types/insightTypes";
import { AnalysisDataType } from "@/types/analysisTypes";

// Default highlight moments based on the kids haircut prank video
const defaultHighlightMoments: HighlightMoment[] = [
  {
    timestamp: "0:00-0:03",
    title: "Surprising Opening Hook",
    description: "Your approach to the dad holding his daughter in the mall with scissors creates immediate tension and curiosity",
    retention: 95,
    isPositive: true,
    fix: "Add a freeze-frame with sound effect right when the dad's expression changes for even more impact"
  },
  {
    timestamp: "0:03-0:07",
    title: "Conflict Resolution",
    description: "The moment when you explain to the angry dad about his daughter's hair being royalty shows your character and professionalism",
    retention: 87,
    isPositive: true,
    fix: "Include a subtle text overlay with your salon name during this exchange"
  },
  {
    timestamp: "0:08-0:15",
    title: "Environment Transition",
    description: "The whip-pan transition from mall to salon creates a satisfying scene change showing professional environment",
    retention: 82,
    isPositive: true,
    fix: "Add a quick b-roll of your tools to emphasize professionalism during the transition"
  },
  {
    timestamp: "0:16-0:22",
    title: "Skill Showcase",
    description: "Montage of you working on the biracial child's hair demonstrates your expertise with diverse hair types",
    retention: 89,
    isPositive: true,
    fix: "Include a close-up of a particularly challenging curl pattern you're fixing for more technical credibility"
  },
  {
    timestamp: "0:23-0:27",
    title: "Transformation Reveal",
    description: "The before/after comparison with 'princess' messaging perfectly concludes the narrative arc",
    retention: 93,
    isPositive: true,
    fix: "Add a branded sparkle effect to make your reveal more memorable and shareable"
  }
];

export function generateHighlightMoments(analysisData?: AnalysisDataType): HighlightMoment[] {
  return analysisData?.engagement_prediction?.best_segments?.map(segment => ({
    timestamp: segment.timestamp,
    title: "Key Moment",
    description: segment.reason,
    retention: 85,
    isPositive: true
  })) || defaultHighlightMoments;
}
