
/**
 * Utility functions for calculating trend scores based on content type
 */

/**
 * Calculates trend score based on content type
 */
export function calculateTrendScoreForContentType(contentType: string): number {
  const baseScore = 75;
  
  if (!contentType) return baseScore;
  
  // Adjust score based on content type and current trends
  if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
    return baseScore + 15; // Challenges tend to be highly trending
  } else if (contentType.includes('Skits') || contentType.includes('Funny')) {
    return baseScore + 10; // Comedy content performs well generally
  } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
    return baseScore + 5; // Educational content has steady performance
  } else if (contentType.includes('Reaction')) {
    return baseScore + 8; // Reaction videos have good engagement
  } else if (contentType.includes('Review')) {
    return baseScore + 3; // Reviews have moderate trend alignment
  }
  
  return baseScore;
}
