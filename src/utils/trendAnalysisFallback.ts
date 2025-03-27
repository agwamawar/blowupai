
/**
 * Utility functions for trend analysis fallback data
 */

import { getPlatformSpecificHashtags } from './platformHashtagUtils';
import { getRelevantCategories } from './contentCategoryUtils';
import { getContentSpecificOpportunities } from './contentOpportunityUtils';
import { getFallbackTrendData as getVideoFallbackTrendData } from './trendVideoUtils';

/**
 * Generates fallback trend data when API calls fail
 */
export const getFallbackTrendData = (metadata?: any): any => {
  // If no metadata is provided, use the simplified version with an empty string
  if (!metadata) {
    return getVideoFallbackTrendData('');
  }
  
  const platform = metadata?.platform?.toLowerCase() || 'tiktok';
  const contentType = metadata?.content_type || 'entertainment';
  
  return {
    trendScore: 75,
    trendingHashtags: getPlatformSpecificHashtags(platform, contentType),
    categories: getRelevantCategories(contentType),
    trendOpportunities: getContentSpecificOpportunities(platform, contentType)
  };
};
