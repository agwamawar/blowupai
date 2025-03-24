
/**
 * Utility functions for video processing in trend analysis
 */

import { 
  calculateTrendScoreForContentType,
  enhanceHashtagsForContentType,
  enhanceCategoriesForContentType,
  enhanceTrendOpportunitiesForContentType
} from './trendContentUtils';

/**
 * Samples frames evenly across the video to maintain coverage
 * while reducing the total number of frames
 */
export function sampleFramesEvenly(frames: string[], maxFrames: number): string[] {
  if (frames.length <= maxFrames) return frames;
  
  const result: string[] = [];
  
  // Always include first and last frame
  result.push(frames[0]);
  
  // Sample frames evenly from the rest
  const step = (frames.length - 2) / (maxFrames - 2);
  for (let i = 1; i < maxFrames - 1; i++) {
    const index = Math.min(Math.floor(i * step) + 1, frames.length - 2);
    result.push(frames[index]);
  }
  
  // Add the last frame
  result.push(frames[frames.length - 1]);
  
  return result;
}

/**
 * Generates fallback trend data when API calls fail
 */
export function getFallbackTrendData(contentType: string = ''): {
  trendScore: number;
  trendingHashtags: string[];
  categories: string[];
  trendOpportunities: string[];
} {
  // Base fallback data
  const baseData = {
    trendScore: 75,
    trendingHashtags: ['#viral', '#trending', '#foryou'],
    categories: ['Entertainment', 'Social Media'],
    trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
  };
  
  // Enhance fallback data based on content type
  return {
    trendScore: calculateTrendScoreForContentType(contentType),
    trendingHashtags: enhanceHashtagsForContentType(baseData.trendingHashtags, contentType),
    categories: enhanceCategoriesForContentType(baseData.categories, contentType),
    trendOpportunities: enhanceTrendOpportunitiesForContentType(baseData.trendOpportunities, contentType)
  };
}
