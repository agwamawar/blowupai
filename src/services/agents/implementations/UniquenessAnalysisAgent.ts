import { UniquenessAnalysisAgent as IUniquenessAnalysisAgent, ModelType } from '../AgentTypes';

export class UniquenessAnalysisAgent implements IUniquenessAnalysisAgent {
  type: 'uniqueness' = 'uniqueness';
  modelType: ModelType = 'embedding';
  model: any; // Placeholder for the model used for frame analysis

  constructor(model: any) {
    this.model = model;
  }

  async analyze(videoData: any) {
    return this.analyzeUniqueness(videoData);
  }

  async analyzeUniqueness(videoData: any) {
    try {
      const { metadata, frames = [], technical = {} } = videoData;
      const platformTrends = metadata?.platform_trends || [];
      const contentType = metadata?.content_type;

      // Extract features from frames
      const frameFeatures = await Promise.all(frames.map(async frame => {
        const result = await this.model.generateContent([
          "Analyze this frame for unique visual elements and composition.",
          frame
        ]);
        return this.extractFrameFeatures(JSON.parse((await result.response).text())); //Added function call
      }));


      // Analyze audio uniqueness
      const audioUniqueness = technical?.audioFeatures ?
        this.analyzeAudioUniqueness(technical.audioFeatures) : 0;

      const originalityScore = this.calculateOriginalityScore(frameFeatures, platformTrends);
      const shareabilityScore = this.calculateShareabilityScore(contentType, platformTrends);

      return {
        originalityScore,
        shareabilityScore,
        audioUniqueness,
        uniqueElements: this.extractUniqueElements(frameFeatures),
        remixPotential: shareabilityScore > 7,
        score: (originalityScore + shareabilityScore + audioUniqueness) * 5 //Added audioUniqueness to score calculation
      };
    } catch (error) {
      console.error("Uniqueness analysis failed:", error);
      return {
        originalityScore: 7,
        shareabilityScore: 7,
        audioUniqueness: 0,
        uniqueElements: [],
        remixPotential: true,
        score: 70
      };
    }
  }

  private calculateOriginalityScore(frames: any[], trends: any[]): number {
    if (!frames.length || !trends.length) return 7;

    // Placeholder for more sophisticated originality calculation using frame features
    let originality = 0;
    frames.forEach(frame => {
        originality += this.calculateFrameOriginality(frame);
    });
    const trendIncorporation = trends.length > 0 ?
      Math.min(trends.length / 5, 1) * 3 : 0;


    return Math.min(3 + trendIncorporation + originality, 10);
  }

    private calculateFrameOriginality(frame: any): number {
        // Placeholder -  replace with actual feature extraction and scoring logic
        return frame.uniqueElements.length * 0.2;
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

  private analyzeAudioUniqueness(audioFeatures: any): number {
    // Placeholder - Replace with actual audio feature analysis
    const { volume, pitch, tempo, clarity } = audioFeatures;
    return (volume + pitch + tempo + clarity) / 40;
  }

  private extractUniqueElements(frameFeatures: any[]): string[] {
    const elements = frameFeatures.flatMap(f => f.uniqueElements || []);
    return [...new Set(elements)];
  }

    private extractFrameFeatures(frameData: any): any {
        // Placeholder - Extract relevant features from frameData
        return { uniqueElements: frameData.uniqueElements || []};
    }
}