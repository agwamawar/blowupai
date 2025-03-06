
import { HighlightMoment } from "@/types/insightTypes";

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
