
/**
 * Helper service to calculate and compute analysis scores
 */

import { calculateEngagementScore, calculateViralityScore } from '../utils/scoreCalculators';

export class AnalysisScoreCalculator {
  /**
   * Calculates engagement and virality scores based on analysis results
   */
  calculateScores(
    conceptAnalysis: any,
    technicalAnalysis: any,
    trendAnalysis: any,
    viralityPrediction: any
  ): { 
    engagement_score: number; 
    virality_score: number;
  } {
    // Calculate engagement score as weighted average of different metrics
    const engagementScore = calculateEngagementScore(
      conceptAnalysis,
      technicalAnalysis,
      trendAnalysis
    );
    
    const viralityScore = calculateViralityScore(
      viralityPrediction,
      conceptAnalysis,
      technicalAnalysis
    );

    return {
      engagement_score: engagementScore,
      virality_score: viralityScore
    };
  }
}
