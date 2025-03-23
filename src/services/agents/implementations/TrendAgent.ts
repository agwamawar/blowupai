
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
    return this.analyzeTrends(data);
  }

  async analyzeTrends(data: { videoUrl: string; metadata?: any; frames: string[] }) {
    try {
      const prompt = `Analyze this video content and identify current trends, hashtags, and categories.
        Consider visual elements shown in the frames, style, and composition.
        Format response as JSON with these exact keys: trendAlignment, relevantHashtags, categories, contentOpportunities.`;

      const frames = data.frames || [];
      
      // Ensure we have frames to analyze
      if (!frames.length) {
        throw new Error("No frames available for trend analysis");
      }
      
      // Only send a subset of frames if there are too many to avoid token limits
      const framesToAnalyze = frames.length > 5 ? frames.slice(0, 5) : frames;
      
      const result = await this.model.generateContent([prompt, ...framesToAnalyze]);
      const responseText = (await result.response).text();
      
      let analysis;
      try {
        analysis = JSON.parse(responseText);
      } catch (error) {
        console.error("Error parsing trend analysis response:", error);
        console.log("Raw response:", responseText);
        throw new Error("Failed to parse trend analysis from AI");
      }

      // Process frames for visual trends
      const visualTrends = await this.analyzeVisualTrends(frames);
      const audioTrends = data.metadata?.audioFeatures ? 
        await this.analyzeAudioTrends(data.metadata.audioFeatures) : 
        { score: 0.5, trends: [] };

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
    if (!frames?.length) return { score: 0.5, opportunities: [], trends: [] };
    
    // Take a subset of frames to analyze if there are too many
    const framesToAnalyze = frames.length > 3 ? frames.slice(0, 3) : frames;
    
    const prompt = `Analyze these video frames for current visual trends:
      - Color schemes
      - Composition patterns
      - Visual effects
      - Popular formats
      Return only a JSON with these exact keys: score, trends, opportunities`;

    try {
      const result = await this.model.generateContent([prompt, ...framesToAnalyze]);
      const responseText = (await result.response).text();
      
      try {
        return JSON.parse(responseText);
      } catch (error) {
        console.error("Error parsing visual trends response:", error);
        console.log("Raw response:", responseText);
        return { score: 0.5, opportunities: [], trends: [] };
      }
    } catch (error) {
      console.error("Error analyzing visual trends:", error);
      return { score: 0.5, opportunities: [], trends: [] };
    }
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

    // Ensure we have valid scores to work with
    const contentScore = analysis.trendAlignment || 0.5;
    const visualScore = visualTrends.score || 0.5;
    const audioScore = audioTrends.score || 0.5;

    return Math.min(
      (contentScore * weights.content) +
      (visualScore * weights.visual) +
      (audioScore * weights.audio),
      1
    );
  }

  private extractRelevantHashtags(analysis: any): string[] {
    if (!analysis.relevantHashtags || !Array.isArray(analysis.relevantHashtags)) {
      return [];
    }
    return analysis.relevantHashtags?.slice(0, 5) || [];
  }

  private determineCategories(analysis: any): string[] {
    if (!analysis.categories || !Array.isArray(analysis.categories)) {
      return [];
    }
    return analysis.categories?.slice(0, 3) || [];
  }

  private identifyOpportunities(analysis: any, visualTrends: any): string[] {
    const contentOpps = Array.isArray(analysis.contentOpportunities) ? 
      analysis.contentOpportunities : [];
      
    const visualOpps = Array.isArray(visualTrends.opportunities) ? 
      visualTrends.opportunities : [];
      
    return [
      ...contentOpps,
      ...visualOpps
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
