
import { RecommendationType } from "@/types/insightTypes";

export const defaultRecommendations: RecommendationType[] = [
  {
    title: "Optimize Your First 3 Seconds",
    description: "Your opening could be more attention-grabbing to reduce drop-off.",
    actionItems: [
      "Start with a surprising statistic or question",
      "Show the end result first, then explain how to get there",
      "Use motion right away (zoom, slide, or person movement)"
    ]
  },
  {
    title: "Improve Text Overlay Strategy",
    description: "Adding strategic text can increase retention by 38%.",
    actionItems: [
      "Use large, high-contrast text (Recommended: 14-18% screen height)",
      "Keep text on screen for at least 2.5 seconds",
      "Position key points at top of frame for better readability"
    ]
  },
  {
    title: "Enhance Audio Quality and Pacing",
    description: "Clear audio with strategic pacing keeps viewers engaged.",
    actionItems: [
      "Add background music at 20-30% volume level",
      "Speed up explanation segments by 10-15%",
      "Remove silent pauses exceeding 0.5 seconds"
    ]
  },
  {
    title: "Strengthen Your Call-to-Action",
    description: "A specific, action-oriented closing drives more engagement.",
    actionItems: [
      "Ask a direct question to encourage comments",
      "Use 'save this for later' to increase saves",
      "Create urgency with time-limited information"
    ]
  }
];
