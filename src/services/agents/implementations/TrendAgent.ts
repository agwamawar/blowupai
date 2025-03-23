
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAgent implements TrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    if (typeof data === 'string') {
      return this.analyzeTrends(data);
    }
    return this.analyzeTrendsWithFrames(data);
  }

  async analyzeTrends(videoUrl: string): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      const prompt = `Analyze this video content and identify current trends, hashtags, and categories.
        Format response as JSON with these exact keys: trendScore, trendingHashtags, categories, trendOpportunities.`;

      const result = await this.model.generateContent(prompt + videoUrl);
      const responseText = (await result.response).text();
      
      try {
        const analysis = JSON.parse(responseText);
        return {
          trendScore: analysis.trendScore || 75,
          trendingHashtags: analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          categories: analysis.categories || ['Entertainment', 'Social Media'],
          trendOpportunities: analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts']
        };
      } catch (error) {
        console.error("Error parsing trend analysis response:", error);
        return this.getFallbackTrendData();
      }
    } catch (error) {
      console.error("Error in trend analysis:", error);
      return this.getFallbackTrendData();
    }
  }

  private async analyzeTrendsWithFrames(data: { videoUrl: string; metadata?: any; frames: string[] }): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      const prompt = `Analyze this video content and identify current trends, hashtags, and categories.
        Consider visual elements shown in the frames, style, and composition.
        Format response as JSON with these exact keys: trendScore, trendingHashtags, categories, trendOpportunities.`;

      const frames = data.frames || [];
      
      // Ensure we have frames to analyze
      if (!frames.length) {
        return this.analyzeTrends(data.videoUrl);
      }
      
      // Only send a subset of frames if there are too many to avoid token limits
      const framesToAnalyze = frames.length > 5 ? frames.slice(0, 5) : frames;
      
      const result = await this.model.generateContent([prompt, ...framesToAnalyze]);
      const responseText = (await result.response).text();
      
      try {
        const analysis = JSON.parse(responseText);
        return {
          trendScore: analysis.trendScore || 75,
          trendingHashtags: analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          categories: analysis.categories || ['Entertainment', 'Social Media'],
          trendOpportunities: analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts']
        };
      } catch (error) {
        console.error("Error parsing trend analysis response:", error);
        return this.getFallbackTrendData();
      }
    } catch (error) {
      console.error("Error in trend analysis:", error);
      return this.getFallbackTrendData();
    }
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
      
    const visualOpps = Array.isArray(visualTrends?.opportunities) ? 
      visualTrends.opportunities : [];
      
    return [
      ...contentOpps,
      ...visualOpps
    ].slice(0, 5);
  }

  private getFallbackTrendData(): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    return {
      trendScore: 75,
      trendingHashtags: ['#viral', '#trending', '#foryou'],
      categories: ['Entertainment', 'Social Media'],
      trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
    };
  }
}
