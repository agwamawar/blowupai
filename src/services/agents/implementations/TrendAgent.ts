
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { initializeServiceAccounts, getModel } from '../../../lib/serviceAccounts';
import { TrendAnalyzer } from './trend/TrendAnalyzer';
import { TrendEnhancer } from './trend/TrendEnhancer';
import { TrendFallbackProvider } from './trend/TrendFallbackProvider';

export class TrendAgent implements TrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-pro';
  private model: any;
  private trendAnalyzer: TrendAnalyzer;
  private trendEnhancer: TrendEnhancer;
  private fallbackProvider: TrendFallbackProvider;
  private accessToken?: string;

  constructor(accessToken?: string) {
    this.accessToken = accessToken;
    const { vertexai } = initializeServiceAccounts();
    this.model = vertexai.preview.getGenerativeModel({ 
      model: 'gemini-pro',
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.4
      }
    });
    this.trendAnalyzer = new TrendAnalyzer(this.model, this.accessToken);
    this.trendEnhancer = new TrendEnhancer();
    this.fallbackProvider = new TrendFallbackProvider();
  }

  async analyze(data: any): Promise<any> {
    // Initialize or update the model with an access token if available
    if (this.accessToken) {
      try {
        this.model = await getModel('gemini-1.5-pro', this.accessToken);
        this.trendAnalyzer = new TrendAnalyzer(this.model, this.accessToken);
      } catch (error) {
        console.error("Error initializing model with OAuth:", error);
      }
    }

    if (typeof data === 'string') {
      return this.analyzeTrends(data);
    }
    return this.analyzeTrends(data.videoUrl, data);
  }
  
  async analyzeTrends(videoUrl: string): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
  
  async analyzeTrends(videoUrl: string, contextData?: { 
    metadata?: any; 
    frames?: string[] 
  }): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
  
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
