
/**
 * Utility functions for calculating virality metrics
 */

/**
 * Calculates video pacing based on frame analysis and audio features
 */
export function calculateVideoPacing(frameAnalysis: any[], audioFeatures: any): number {
  // Default pacing score if we don't have enough data
  if (!frameAnalysis || frameAnalysis.length < 2) return 0.6;
  
  // Check for visual transitions between frames
  const visualChanges = frameAnalysis.slice(1).reduce((changes, frame, index) => {
    // Compare with previous frame
    const prevFrame = frameAnalysis[index];
    const compositionalChange = frame.composition !== prevFrame.composition ? 0.2 : 0;
    const colorChange = frame.dominantColors !== prevFrame.dominantColors ? 0.15 : 0;
    const subjectChange = frame.subjects !== prevFrame.subjects ? 0.25 : 0;
    
    return changes + compositionalChange + colorChange + subjectChange;
  }, 0);
  
  // Calculate audio pacing contribution
  const audioPacing = audioFeatures?.tempo ? (audioFeatures.tempo / 10) : 0.5;
  
  // Combine visual and audio pacing factors
  return Math.min((visualChanges * 0.7) + (audioPacing * 0.3) + 0.3, 1);
}

/**
 * Generates fallback virality metrics based on video data when AI analysis fails
 */
export function getFallbackViralityMetrics(data: any): any {
  const { metadata } = data;
    
  const platform = metadata?.platform?.toLowerCase() || 'tiktok';
  const contentType = metadata?.content_type || 'entertainment';
  const followerCount = metadata?.follower_count || 10000;
  
  // Get content type as string
  const contentTypeString = Array.isArray(contentType) ? contentType.join(', ') : contentType;
  
  // Import utility functions from content type utils
  const { 
    adjustScoreByContentType, 
    predictViewsByContentType,
    predictEngagementByContentType
  } = require('./contentTypeUtils');
  
  // Import improvement utility
  const { getVideoSpecificImprovements } = require('./improvementUtils');
  
  // Calculate a reasonable view prediction based on follower count and content type
  const predictedViews = predictViewsByContentType(contentTypeString, data);
  
  // Calculate score based on concept, technical analysis, and content type
  let score = 65; // Default
  if (data.conceptAnalysis && data.technicalAnalysis) {
    score = Math.round((data.conceptAnalysis.totalScore * 0.7 + data.technicalAnalysis.videoQuality * 10 * 0.3));
    score = adjustScoreByContentType(score, contentTypeString);
  }
  
  return {
    score,
    predictedViews,
    predictedEngagement: predictEngagementByContentType(contentTypeString),
    improvements: getVideoSpecificImprovements(data)
  };
}
