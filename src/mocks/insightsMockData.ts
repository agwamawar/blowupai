
import { ReactNode } from "react";
import { Flame, Zap, Music, Clock } from "lucide-react";

export interface HighlightMoment {
  timestamp: string;
  title: string;
  description: string;
  retention: number;
  isPositive: boolean;
  fix?: string;
}

export interface StrategySection {
  title: string;
  items: string[];
}

export interface RecommendationType {
  title: string;
  description: string;
  actionItems?: string[];
}

export interface InsightItem {
  label: string;
  value: number;
  icon: ReactNode;
  description: string;
  benchmarkValue?: number;
}

// Enhanced moments with specific insights and actionable fixes
export const highlightMoments: HighlightMoment[] = [
  {
    timestamp: "0:03",
    title: "Strong Hook",
    description: "Your opening hook instantly captures attention",
    retention: 94,
    isPositive: true
  },
  {
    timestamp: "0:15",
    title: "Engagement Peak",
    description: "Smooth transition + visual focus drives engagement",
    retention: 96,
    isPositive: true
  },
  {
    timestamp: "0:20",
    title: "Viewers Start Skipping",
    description: "Attention drop detected at this timestamp",
    retention: 68,
    isPositive: false,
    fix: "Add a 1-second text pop-up with a \"Wait for it…\" teaser"
  },
  {
    timestamp: "0:29",
    title: "CTA is Weak",
    description: "Only 30% of viewers act on this call to action",
    retention: 72,
    isPositive: false,
    fix: "Change the CTA to \"Comment '🔥' if you're watching till the end!\""
  },
  {
    timestamp: "0:32",
    title: "Small Engagement Dip",
    description: "Temporary drop in viewer attention",
    retention: 70,
    isPositive: false,
    fix: "Insert a 0.5-second screen shake or zoom effect to re-engage viewers"
  },
  {
    timestamp: "0:38",
    title: "Shareable Moment Detected",
    description: "Good close, but lacks strong CTA for action",
    retention: 88,
    isPositive: true,
    fix: "Add \"Tag someone who needs to see this!\" text overlay"
  }
];

// Final optimized changes for maximum impact
export const finalOptimizations = [
  "Move best scene (0:15) to earlier in the video (0:05)",
  "Replace current CTA with: \"Comment '🔥' if you're watching till the end!\"",
  "Add a \"Wait for it…\" pop-up at 0:20 to reduce drop-off",
  "Use trending audio from TikTok's trending sounds library",
  "Insert zoom/shake effect at 0:32 to re-engage viewers"
];

// Social amplification strategies
export const socialAmplificationStrategies = [
  {
    title: "Optimized Video Edits",
    items: [
      "Crop video into a square format (1080x1080) for reposting on Instagram Reels",
      "Add auto-generated captions at the bottom for 15% longer watch time"
    ]
  },
  {
    title: "TikTok SEO Optimization",
    items: [
      "Change caption to: \"Wait for the 🔥 moment at 0:38! #ForYouPage\"",
      "Include exactly 3-5 trending hashtags in your first comment"
    ]
  },
  {
    title: "Repost Strategy",
    items: [
      "Repost on YouTube Shorts with this new title: \"Viral TikTok Trend You Need to See!\"",
      "Create a teaser for Instagram stories with a link to your main profile"
    ]
  }
];

// Default recommendations with specific actionable steps
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

// Default content insights
export const defaultContentInsights: InsightItem[] = [
  {
    label: "Hook Strength",
    value: 85,
    icon: <Flame className="h-4 w-4 text-red-400" />,
    description: "Strong opening captures attention"
  },
  {
    label: "Pacing",
    value: 72,
    icon: <Zap className="h-4 w-4 text-yellow-400" />,
    description: "Good rhythm with room to improve"
  },
  {
    label: "Audio Quality",
    value: 90,
    icon: <Music className="h-4 w-4 text-blue-400" />,
    description: "Excellent sound choice and quality"
  },
  {
    label: "Retention Factors",
    value: 78,
    icon: <Clock className="h-4 w-4 text-green-400" />,
    description: "Good viewer retention expected"
  }
];
