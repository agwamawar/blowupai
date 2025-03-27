
import { TrendAgent } from '../implementations/TrendAgent';
import { getFallbackTrendData } from '../../../utils/trendVideoUtils';
import { 
  calculateTrendScoreForContentType,
  enhanceHashtagsForContentType,
  enhanceCategoriesForContentType,
  enhanceTrendOpportunitiesForContentType
} from '../../../utils/trendScore';

export class TrendAnalysisPipeline {
  private trendAgent: TrendAgent;

  constructor() {
    this.trendAgent = new TrendAgent();
  }

  async runTrendAnalysis(videoUrl: string, videoContext: { 
    videoUrl: string;
    metadata: any;
    frames: string[];
  }): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      console.log("Starting trend analysis for:", videoUrl);
      console.log("Video context metadata:", videoContext.metadata);
      console.log(`Video context has ${videoContext.frames?.length || 0} frames`);
      
      // Ensure we're passing properly structured data to the agent
      const result = await this.trendAgent.analyzeTrends(videoUrl, {
        metadata: videoContext.metadata,
        frames: videoContext.frames
      });
      
      console.log("Trend analysis completed successfully:", result);
      return this.enhanceTrendData(result, videoContext.metadata);
    } catch (error) {
      console.error("Error in trend analysis pipeline:", error);
      // Return fallback data instead of throwing, to prevent pipeline breakdown
      const contentType = videoContext?.metadata?.content_type || '';
      
      return this.enhanceTrendData(
        getFallbackTrendData(contentType),
        videoContext.metadata
      );
    }
  }

  /**
   * Enhances trend data with content-specific information
   */
  private enhanceTrendData(
    trendData: {
      trendScore: number;
      trendingHashtags: string[];
      categories: string[];
      trendOpportunities: string[];
    },
    metadata: any
  ): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    const contentType = metadata?.content_type || '';

    return {
      // Use existing trendScore or calculate a new one
      trendScore: trendData.trendScore || calculateTrendScoreForContentType(contentType),
      
      // Enhance hashtags with content-specific ones
      trendingHashtags: enhanceHashtagsForContentType(
        trendData.trendingHashtags || ['#viral', '#trending', '#foryou'],
        contentType
      ),
      
      // Enhance categories based on content type
      categories: enhanceCategoriesForContentType(
        trendData.categories || ['Entertainment', 'Social Media'],
        contentType
      ),
      
      // Generate content-specific trend opportunities
      trendOpportunities: enhanceTrendOpportunitiesForContentType(
        trendData.trendOpportunities || ['Use trending audio', 'Add pattern interrupts'],
        contentType
      )
    };
  }
}
