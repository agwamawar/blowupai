
/**
 * Utility functions for calculating various score metrics from agent analysis data
 */

/**
 * Calculate engagement score as weighted average of different metrics
 */
export const calculateEngagementScore = (
  conceptAnalysis: any, 
  technicalAnalysis: any, 
  trendAnalysis: any
): number => {
  let score = 0;
  let weightSum = 0;

  if (conceptAnalysis?.totalScore) {
    score += conceptAnalysis.totalScore * 0.4;
    weightSum += 0.4;
  }
  if (technicalAnalysis?.qualityScore) {
    score += technicalAnalysis.qualityScore * 0.3;
    weightSum += 0.3;
  }
  if (trendAnalysis?.trendScore) {
    score += trendAnalysis.trendScore * 0.3;
    weightSum += 0.3;
  }

  return weightSum > 0 ? Math.round(score / weightSum) : 50;
};

/**
 * Calculate virality score as weighted average of prediction and content scores
 */
export const calculateViralityScore = (
  viralityPrediction: any, 
  conceptAnalysis: any, 
  technicalAnalysis: any
): number => {
  let score = 0;
  let weightSum = 0;
  
  if (viralityPrediction?.predictedScore) {
    score += viralityPrediction.predictedScore * 0.5;
    weightSum += 0.5;
  }
  if (conceptAnalysis?.totalScore) {
    score += conceptAnalysis.totalScore * 0.3;
    weightSum += 0.3;
  }
  if (technicalAnalysis?.qualityScore) {
    score += technicalAnalysis.qualityScore * 0.2;
    weightSum += 0.2;
  }
  
  return weightSum > 0 ? Math.round(score / weightSum) : 50;
};
