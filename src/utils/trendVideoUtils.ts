
import { MetadataEnhancer } from '../services/agents/utils/metadataEnhancer';

/**
 * Evenly samples frames from a video to ensure good coverage
 * @param frames All extracted frames
 * @param sampleCount Number of frames to sample
 * @returns Evenly distributed sample of frames
 */
export const sampleFramesEvenly = (frames: string[], sampleCount: number): string[] => {
  if (!frames || frames.length === 0) return [];
  if (frames.length <= sampleCount) return frames;
  
  const result: string[] = [];
  const step = frames.length / sampleCount;
  
  for (let i = 0; i < sampleCount; i++) {
    const index = Math.min(Math.floor(i * step), frames.length - 1);
    result.push(frames[index]);
  }
  
  return result;
};

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
