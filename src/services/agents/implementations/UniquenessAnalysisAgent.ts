
import { UniquenessAnalysisAgent as IUniquenessAnalysisAgent, ModelType } from '../AgentTypes';

export class UniquenessAnalysisAgent implements IUniquenessAnalysisAgent {
  type: 'uniqueness' = 'uniqueness';
  modelType: ModelType = 'embedding';

  async analyze(videoData: any) {
    return this.analyzeUniqueness(videoData);
  }

  async analyzeUniqueness(videoData: any) {
    try {
      const { metadata, frames = [] } = videoData;
      const platformTrends = metadata?.platform_trends || [];
      const contentType = metadata?.content_type;
      
      const originalityScore = this.calculateOriginalityScore(frames, platformTrends);
      const shareabilityScore = this.calculateShareabilityScore(contentType, platformTrends);
      
      return {
        originalityScore,
        shareabilityScore,
        remixPotential: shareabilityScore > 7,
        score: (originalityScore + shareabilityScore) * 5
      };
    } catch (error) {
      console.error("Uniqueness analysis failed:", error);
      return {
        originalityScore: 7,
        shareabilityScore: 7,
        remixPotential: true,
        score: 70
      };
    }
  }

  private calculateOriginalityScore(frames: string[], trends: any[]): number {
    if (!frames.length || !trends.length) return 7;
    
    // Calculate how many trends are being incorporated
    const trendIncorporation = trends.length > 0 ? 
      Math.min(trends.length / 5, 1) * 3 : 0;
    
    // More frames indicate more varied content
    const frameVariety = Math.min(frames.length / 15, 1) * 4;
    
    // Base score plus calculated metrics
    return Math.min(3 + trendIncorporation + frameVariety, 10);
  }

  private calculateShareabilityScore(contentType: string, trends: any[]): number {
    if (!contentType) return 7;
    
    // Content type scoring based on historical viral patterns
    const contentTypeScores: Record<string, number> = {
      'entertainment': 8.5,
      'educational': 7.5,
      'gaming': 8.0,
      'lifestyle': 7.8,
      'music': 8.2,
      'news': 7.0,
      'sports': 7.5
    };

    const baseScore = contentTypeScores[contentType.toLowerCase()] || 7;
    const trendBonus = trends.length > 0 ? Math.min(trends.length * 0.5, 2) : 0;
    
    return Math.min(baseScore + trendBonus, 10);
  }
}
