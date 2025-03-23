
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';
import { TrendAnalyzer } from './trend/TrendAnalyzer';
import { TrendEnhancer } from './trend/TrendEnhancer';
import { TrendFallbackProvider } from './trend/TrendFallbackProvider';

export class TrendAgent implements TrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
  private trendAnalyzer: TrendAnalyzer;
  private trendEnhancer: TrendEnhancer;
  private fallbackProvider: TrendFallbackProvider;

  constructor() {
    this.trendAnalyzer = new TrendAnalyzer(this.model);
    this.trendEnhancer = new TrendEnhancer();
    this.fallbackProvider = new TrendFallbackProvider();
  }

  async analyze(data: { 
    videoUrl: string; 
    metadata?: any; 
<<<<<<< HEAD
    frames?: string[] 
  }): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
  
  // Actual implementation that handles both signature variants
  async analyzeTrends(videoUrl: string, contextData?: any): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      const metadata = contextData?.metadata || {};
      const frames = contextData?.frames || [];
      const contentType = metadata?.content_type || '';
      
      // Check if API key is available before attempting API call
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        console.warn("No Gemini API key found. Using fallback trend data instead of making API calls.");
        return this.fallbackProvider.getFallbackTrendData(contentType);
      }
      
      // Use the analyzer component to analyze the video
      const analysisResult = await this.trendAnalyzer.analyze(videoUrl, contentType, frames);
      
      // Use the enhancer component to enhance the analysis results
      return this.trendEnhancer.enhanceTrendData(analysisResult, contentType);
    } catch (error) {
      console.error("Error in trend analysis:", error);
      const contentType = typeof contextData === 'object' ? (contextData?.metadata?.content_type || '') : '';
      return this.fallbackProvider.getFallbackTrendData(contentType);
    }
  }
=======
    frames: string[]; 
  }) {
    return this.analyzeTrends(data);
  }

  async analyzeTrends(data: { videoUrl: string; metadata?: any; frames: string[] }) {
    try {
      const prompt = `Analyze this video content and identify current trends, hashtags, and categories.
        Consider visual elements, audio patterns, and content style.
        Format response as JSON with scores and explanations.`;

      const frames = data.frames || [];
      const result = await this.model.generateContent([prompt, ...frames]);
      const responseText = (await result.response).text();
      let analysis;
      try {
        analysis = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Failed to parse AI response:", parseError);
        analysis = {
          trendAlignment: 0.7,
          relevantHashtags: ['#trending', '#viral'],
          categories: ['entertainment'],
          contentOpportunities: ['Add trending music']
        };
      }

      // Process frames for visual trends
      const visualTrends = await this.analyzeVisualTrends(frames).catch(err => ({
        score: 0.6,
        opportunities: ['Improve visual quality']
      }));
      
      const audioTrends = await this.analyzeAudioTrends(data.metadata?.audioFeatures).catch(err => ({
        score: 0.5,
        trends: []
      }));

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
>>>>>>> 8dd6867 (Restored to '580be8971d4a166bdf08265442e46d96ce2d01cf')
}
