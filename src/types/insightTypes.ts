
import { ReactNode } from "react";

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
  icon: {
    type: string;
    color: string;
  };
  description: string;
  benchmarkValue?: number;
}
