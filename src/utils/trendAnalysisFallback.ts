
/**
 * Utility functions for trend analysis fallback data
 */

import { getPlatformSpecificHashtags } from './platformHashtagUtils';
import { getRelevantCategories } from './contentCategoryUtils';
import { getContentSpecificOpportunities } from './contentOpportunityUtils';

/**
 * Generates fallback trend data when API calls fail
 */
export const getFallbackTrendData = (metadata?: any): any => {
  const platform = metadata?.platform?.toLowerCase() || 'tiktok';
  const contentType = metadata?.content_type || 'entertainment';
  
  return {
    trendScore: 75,
    trendingHashtags: getPlatformSpecificHashtags(platform, contentType),
    categories: getRelevantCategories(contentType),
    trendOpportunities: getContentSpecificOpportunities(platform, contentType)
  };
};

