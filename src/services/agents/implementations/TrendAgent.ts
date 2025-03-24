
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

  async analyze(data: any): Promise<any> {
    if (typeof data === 'string') {
      return this.analyzeTrends(data);
    }
    return this.analyzeTrends(data.videoUrl, data);
  }
  
  // Implementation that matches the interface in TrendAnalysisAgent
  async analyzeTrends(videoUrl: string): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
  
  // Overloaded implementation that accepts the richer data object
  async analyzeTrends(videoUrl: string, contextData?: { 
    metadata?: any; 
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
}
