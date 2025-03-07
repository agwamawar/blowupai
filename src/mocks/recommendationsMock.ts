
import { RecommendationType } from "@/types/insightTypes";

export const defaultRecommendations: RecommendationType[] = [
  {
    title: "Make Your First 3 Seconds Count",
    description: "Your opening needs to grab attention quickly to keep viewers watching.",
    actionItems: [
      "Start with a surprising fact or question",
      "Show the end result first, then explain how to get there",
      "Add movement right away (zoom, slide, or person moving)"
    ]
  },
  {
    title: "Add Better Text to Your Video",
    description: "Adding the right text can keep 38% more people watching.",
    actionItems: [
      "Use big, easy-to-read text (14-18% of screen height)",
      "Keep text on screen for at least 2.5 seconds",
      "Put important text at the top of the screen"
    ]
  },
  {
    title: "Improve Your Sound and Pacing",
    description: "Good sound and timing keeps viewers engaged.",
    actionItems: [
      "Add background music at 20-30% volume",
      "Speed up talking parts by 10-15%",
      "Cut out silent pauses longer than 0.5 seconds"
    ]
  },
  {
    title: "End with a Strong Call-to-Action",
    description: "A clear ending drives more engagement.",
    actionItems: [
      "Ask a specific question to get comments",
      "Say 'save this for later' to get more saves",
      "Create urgency with 'limited time' info"
    ]
  }
];
