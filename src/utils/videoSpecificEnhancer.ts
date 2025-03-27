
/**
 * Utility functions for enhancing trend data with video-specific information
 */

import { getPlatformSpecificHashtags } from './platformHashtagUtils';
import { getContentSpecificOpportunities } from './contentOpportunityUtils';

/**
 * Enhances trend data with video-specific information
 */
export const enhanceWithVideoSpecificData = (trendData: any, metadata?: any): any => {
  if (!metadata) return trendData;
  
  const platform = metadata.platform?.toLowerCase() || 'tiktok';
  const contentType = metadata.content_type || 'entertainment';
  
  // Make hashtags platform-specific
  trendData.trendingHashtags = getPlatformSpecificHashtags(platform, contentType);
  
  // Make trend opportunities more specific to the content and platform
  trendData.trendOpportunities = getContentSpecificOpportunities(platform, contentType);
  
  return trendData;
};

