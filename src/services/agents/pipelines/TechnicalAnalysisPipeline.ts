
import { TechnicalAgent } from '../implementations/TechnicalAgent';

export class TechnicalAnalysisPipeline {
  private technicalAnalysisAgent: TechnicalAgent;

  constructor() {
    this.technicalAnalysisAgent = new TechnicalAgent();
  }

  /**
   * Run technical analysis with video data
   */
  async runTechnicalAnalysis(videoContext: any): Promise<any> {
    try {
      return await this.technicalAnalysisAgent.analyze(videoContext);
    } catch (error) {
      console.error("Technical analysis error:", error);
      throw error; // Propagate the error
    }
  }
}
