
import { TrendAgent } from '../implementations/TrendAgent';

export class TrendAnalysisPipeline {
  private trendAgent: TrendAgent;

  constructor() {
    this.trendAgent = new TrendAgent();
  }

  async runTrendAnalysis(videoUrl: string, videoContext: { 
    videoUrl: string;
    metadata: any;
    frames: string[];
  }): Promise<any> {
    try {
      // Pass the videoUrl and the context separately to the agent
      return await this.trendAgent.analyzeTrends(videoUrl, {
        metadata: videoContext.metadata,
        frames: videoContext.frames
      });
    } catch (error) {
      console.error("Error in trend analysis pipeline:", error);
      throw error;
    }
  }
}
