
// This file re-exports all insights mock data from separate files
import { highlightMoments } from "./highlightMomentsMock";
import { finalOptimizations } from "./optimizationsMock";
import { socialAmplificationStrategies } from "./strategiesMock";
import { defaultRecommendations } from "./recommendationsMock";
import { defaultContentInsights } from "./contentInsightsMock";

// Re-export types
export type { 
  HighlightMoment, 
  StrategySection,
  RecommendationType,
  InsightItem
} from "@/types/insightTypes";

// Re-export data
export { 
  highlightMoments,
  finalOptimizations,
  socialAmplificationStrategies,
  defaultRecommendations,
  defaultContentInsights
};
