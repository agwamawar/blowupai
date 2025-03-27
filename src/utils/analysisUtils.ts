
/**
 * Index file that exports all analysis utilities
 */

export { generatePersonalizedHashtags } from './hashtagUtils';
export { generateTrendOpportunities } from './trendUtils';
export { generateContentInsights } from './contentInsightUtils';
export { generatePersonalizedRecommendations } from './recommendationUtils';
export { getPlatformSpecificHashtags } from './platformHashtagUtils';
export { getRelevantCategories } from './contentCategoryUtils';
export { getContentSpecificOpportunities } from './contentOpportunityUtils';
export { getFallbackTrendData } from './trendAnalysisFallback';
export { enhanceWithVideoSpecificData } from './videoSpecificEnhancer';
export { 
  calculateTrendScoreForContentType,
  enhanceHashtagsForContentType,
  enhanceCategoriesForContentType,
  enhanceTrendOpportunitiesForContentType 
} from './trendScore';
