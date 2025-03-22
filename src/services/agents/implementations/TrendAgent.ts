
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAgent implements TrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: { 
    videoUrl: string; 
    metadata?: any; 
    frames: string[]; 
  }) {
    return this.analyzeTrends(data.videoUrl);
  }

  async analyzeTrends(videoUrl: string) {
    try {
      const prompt = `Analyze this video content and identify current trends, hashtags, and categories.
        Consider visual elements, audio patterns, and content style.
        Format response as JSON with scores and explanations.`;

      const result = await this.model.generateContent([prompt, ...this.frames]);
      const analysis = JSON.parse((await result.response).text());

      // Process frames for visual trends
      const visualTrends = await this.analyzeVisualTrends(this.frames);
      const audioTrends = await this.analyzeAudioTrends(this.metadata?.audioFeatures);

      return {
        trendScore: this.calculateTrendScore(analysis, visualTrends, audioTrends),
        trendingHashtags: this.extractRelevantHashtags(analysis),
        categories: this.determineCategories(analysis),
        trendOpportunities: this.identifyOpportunities(analysis, visualTrends)
      };
    } catch (error) {
      console.error("Error in trend analysis:", error);
      throw error;
    }
  }

  private async analyzeVisualTrends(frames: string[]) {
    if (!frames?.length) return [];
    
    const prompt = `Analyze these video frames for current visual trends:
      - Color schemes
      - Composition patterns
      - Visual effects
      - Popular formats`;

    const result = await this.model.generateContent([prompt, ...frames]);
    return JSON.parse((await result.response).text());
  }

  private async analyzeAudioTrends(audioFeatures: any) {
    if (!audioFeatures) return { score: 0.5, trends: [] };

    const { volume, pitch, tempo } = audioFeatures;
    return {
      score: (volume + pitch + tempo) / 30,
      trends: this.identifyAudioTrends(volume, pitch, tempo)
    };
  }

  private calculateTrendScore(analysis: any, visualTrends: any, audioTrends: any): number {
    const weights = {
      content: 0.4,
      visual: 0.35,
      audio: 0.25
    };

    return Math.min(
      (analysis.trendAlignment * weights.content) +
      (visualTrends.score * weights.visual) +
      (audioTrends.score * weights.audio),
      1
    );
  }

  private extractRelevantHashtags(analysis: any): string[] {
    return analysis.relevantHashtags?.slice(0, 5) || [];
  }

  private determineCategories(analysis: any): string[] {
    return analysis.categories?.slice(0, 3) || [];
  }

  private identifyOpportunities(analysis: any, visualTrends: any): string[] {
    return [
      ...analysis.contentOpportunities || [],
      ...visualTrends.opportunities || []
    ].slice(0, 5);
  }

  private identifyAudioTrends(volume: number, pitch: number, tempo: number): string[] {
    const trends = [];
    if (tempo > 120) trends.push('Fast-paced audio trending');
    if (pitch > 7) trends.push('High-energy sound trending');
    if (volume > 8) trends.push('Dynamic volume range trending');
    return trends;
  }
}
