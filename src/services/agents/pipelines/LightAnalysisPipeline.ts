
import { TrendAgent } from '../implementations/TrendAgent';
import { extractVideoFrames } from '../../videoAnalysisService';

export class LightAnalysisPipeline {
  private trendAgent: TrendAgent;

  constructor() {
    this.trendAgent = new TrendAgent();
  }

  /**
   * Runs a lighter analysis focusing only on trend and virality
   */
  async runLightAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    try {
      console.log("Starting light analysis for video:", videoUrl);
      
      // Extract a smaller set of frames for quick analysis
      const videoFrames = await extractVideoFrames(videoUrl, 3);
      if (!videoFrames || videoFrames.length === 0) {
        throw new Error("Failed to extract video frames for light analysis");
      }
      console.log(`Light analysis: extracted ${videoFrames.length} frames from video`);
      
      // Run trend analysis with the video url
      const trendData = await this.trendAgent.analyze({
        videoUrl,
        metadata,
        frames: videoFrames
      });
      
      return {
        video_url: videoUrl,
        video_metadata: metadata,
        trend_score: trendData.trendScore,
        trending_hashtags: trendData.trendingHashtags,
        trend_opportunities: trendData.trendOpportunities,
        trend_categories: trendData.categories,
        analyzedFrames: videoFrames.length
      };
    } catch (error) {
      console.error("Error in light analysis:", error);
      throw error; // Throw error to be handled by caller instead of returning fallback
    }
  }
}
