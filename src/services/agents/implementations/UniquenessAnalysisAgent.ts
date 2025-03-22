
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
    return frames.length > 0 ? 8.5 : 7;
  }

  private calculateShareabilityScore(contentType: string, trends: any[]): number {
    return contentType ? 9 : 7;
  }
}
