
import { MetadataEnhancer } from '../services/agents/utils/metadataEnhancer';

/**
 * Gets fallback trend data for a content type
 */
export const getFallbackTrendData = (contentType: string): {
  trendScore: number;
  trendingHashtags: string[];
  categories: string[];
  trendOpportunities: string[];
} => {
  const metadataEnhancer = new MetadataEnhancer();
  
  // Base fallback data
  const baseData = {
    trendScore: 75,
    trendingHashtags: ['#viral', '#trending', '#foryou'],
    categories: ['Entertainment', 'Social Media'],
    trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
  };
  
  // Get weights for the content type
  const weights = metadataEnhancer.enhanceMetadataWithContentContext({ 
    content_type: contentType 
  }).analysis_weights;
  
  // Adjust trend score based on content type weights
  let adjustedTrendScore = baseData.trendScore;
  if (weights && weights.trend) {
    adjustedTrendScore = Math.round(baseData.trendScore * (1 + (weights.trend - 0.3) * 2));
  }
  
  return {
    ...baseData,
    trendScore: adjustedTrendScore
  };
};
