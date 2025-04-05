
/**
 * Utility functions for content-type specific operations
 */

/**
 * Adjusts score based on content type
 */
export function adjustScoreByContentType(baseScore: number, contentType: string): number {
  if (!contentType) return baseScore;
  
  // Content type specific adjustments based on current platform trends
  if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
    return Math.min(baseScore + 15, 100); // Challenges have high virality potential
  } else if (contentType.includes('Reaction')) {
    return Math.min(baseScore + 10, 100); // Reaction videos do well for engagement
  } else if (contentType.includes('Skits') || contentType.includes('Comedy')) {
    return Math.min(baseScore + 8, 100); // Comedy content has good sharing potential
  } else if (contentType.includes('How-To') || contentType.includes('Tutorial')) {
    return Math.min(baseScore + 5, 100); // How-to content has steady performance
  } else if (contentType.includes('Storytime') || contentType.includes('Storytelling')) {
    return Math.min(baseScore + 7, 100); // Stories can create emotional connection
  }
  
  return baseScore;
}

/**
 * Predicts views based on content type and metadata
 */
export function predictViewsByContentType(contentType: string, data: any): number {
  // Base prediction factors
  const followerCount = data.metadata?.follower_count || 10000;
  const basePrediction = followerCount * 0.2;
  
  // Content type specific multipliers
  let multiplier = 1;
  
  if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
    multiplier = 2.5; // Challenges can reach wider audience
  } else if (contentType.includes('Reaction')) {
    multiplier = 1.8; // Reactions have good discovery
  } else if (contentType.includes('Comedy') || contentType.includes('Skits')) {
    multiplier = 2.0; // Comedy has high sharing potential
  } else if (contentType.includes('Review')) {
    multiplier = 1.2; // Reviews have niche but dedicated audiences
  } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
    multiplier = 1.4; // Tutorials have long-term discovery
  }
  
  return Math.round(basePrediction * multiplier);
}

/**
 * Predicts engagement rate based on content type
 */
export function predictEngagementByContentType(contentType: string): number {
  // Base engagement rate
  let baseEngagement = 8.5;
  
  // Content type specific adjustments
  if (contentType.includes('Reaction')) {
    baseEngagement = 12.3; // Reactions drive comments and discussion
  } else if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
    baseEngagement = 10.8; // Challenges get participation engagement
  } else if (contentType.includes('Controversial') || contentType.includes('Opinion')) {
    baseEngagement = 14.5; // Controversial content drives debate
  } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
    baseEngagement = 7.2; // Tutorials get saved but less commented on
  }
  
  return baseEngagement;
}
