
import { ViralityAgent } from '../implementations/ViralityAgent';

export class ViralityAnalysisPipeline {
  private viralityAnalysisAgent: ViralityAgent;

  constructor() {
    this.viralityAnalysisAgent = new ViralityAgent();
  }

  /**
   * Run virality prediction analysis with video data
   */
  async runViralityPrediction(videoContext: any): Promise<any> {
    try {
      return await this.viralityAnalysisAgent.analyze(videoContext);
    } catch (error) {
      console.error("Virality prediction error:", error);
      throw error; // Propagate the error
    }
  }
}
