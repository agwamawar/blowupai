
import { InsightItem } from "@/types/insightTypes";

export const competitorBenchmarkData: InsightItem[] = [
  {
    label: "Hook Strength",
    value: 85,
    icon: {
      type: "Flame",
      color: "text-red-400"
    },
    description: "Strong opening captures attention",
    benchmarkValue: 78
  },
  {
    label: "Pacing",
    value: 72,
    icon: {
      type: "Zap",
      color: "text-yellow-400"
    },
    description: "Good rhythm with room to improve",
    benchmarkValue: 82
  },
  {
    label: "Audio Quality",
    value: 90,
    icon: {
      type: "Music",
      color: "text-blue-400"
    },
    description: "Excellent sound choice and quality",
    benchmarkValue: 75
  },
  {
    label: "Retention Factors",
    value: 78,
    icon: {
      type: "Clock",
      color: "text-green-400"
    },
    description: "Good viewer retention expected",
    benchmarkValue: 68
  }
];
