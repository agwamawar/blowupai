
import { TrendAnalysisAgent } from '../implementations/TrendAnalysisAgent';

export class TrendAnalysisPipeline {
  private trendAnalysisAgent: TrendAnalysisAgent;

  constructor() {
    this.trendAnalysisAgent = new TrendAnalysisAgent();
  }

  /**
   * Run trend analysis with video data
   */
  async runTrendAnalysis(videoUrl: string, videoContext: any): Promise<any> {
    try {
      return await this.trendAnalysisAgent.analyze(videoUrl, videoContext);
    } catch (error) {
      console.error("Trend analysis error:", error);
      throw error; // Propagate the error
    }
  }
}
