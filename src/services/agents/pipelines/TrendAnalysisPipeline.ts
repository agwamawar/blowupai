
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
      return await this.trendAgent.analyze(videoContext);
    } catch (error) {
      console.error("Error in trend analysis pipeline:", error);
      throw error;
    }
  }
}
