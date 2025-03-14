
import { InsightItem } from "@/types/insightTypes";

const createFlameIcon = () => {
  return { 
    type: "flame",
    color: "text-red-400" 
  };
};

const createZapIcon = () => {
  return { 
    type: "zap",
    color: "text-yellow-400" 
  };
};

const createMusicIcon = () => {
  return { 
    type: "music",
    color: "text-blue-400" 
  };
};

const createClockIcon = () => {
  return { 
    type: "clock",
    color: "text-green-400" 
  };
};

export const defaultContentInsights: InsightItem[] = [
  {
    label: "Hook Strength",
    value: 85,
    icon: createFlameIcon(),
    description: "Strong opening captures attention"
  },
  {
    label: "Pacing",
    value: 72,
    icon: createZapIcon(),
    description: "Good rhythm with room to improve"
  },
  {
    label: "Audio Quality",
    value: 90,
    icon: createMusicIcon(),
    description: "Excellent sound choice and quality"
  },
  {
    label: "Retention Factors",
    value: 78,
    icon: createClockIcon(),
    description: "Good viewer retention expected"
  }
];
