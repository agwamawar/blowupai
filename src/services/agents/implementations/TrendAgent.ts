import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';
import { TrendAnalyzer } from './trend/TrendAnalyzer';
import { TrendEnhancer } from './trend/TrendEnhancer';
import { FallbackProvider } from './fallback/FallbackProvider';
import { VideoContext } from '@/types/analysis';

export class TrendAgent implements TrendAnalysisAgent {
  private trendAnalyzer: TrendAnalyzer;
  private trendEnhancer: TrendEnhancer;
  private fallbackProvider: FallbackProvider;

  constructor() {
    this.trendAnalyzer = new TrendAnalyzer();
    this.trendEnhancer = new TrendEnhancer();
    this.fallbackProvider = new FallbackProvider();
  }

  async analyze(contextData: VideoContext): Promise<any> {
    try {
      const model = genAI.getGenerativeModel({ model: ModelType.GeminiPro });

      // Get initial trend analysis
      const trendAnalysis = await this.trendAnalyzer.analyze(contextData);

      // Enhance trend analysis with additional insights
      const enhancedAnalysis = await this.trendEnhancer.enhance(trendAnalysis);

      return enhancedAnalysis;
    } catch (error) {
      console.error('Error in trend analysis:', error);
      const contentType = contextData?.metadata?.content_type || ''; //Simplified error handling
      return this.fallbackProvider.getFallbackTrendData(contentType);
    }
  }
}