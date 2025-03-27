
import { ContentSimilarityAgent } from '../implementations/ContentSimilarityAgent';

export class ContentSimilarityPipeline {
  private contentSimilarityAgent: ContentSimilarityAgent;

  constructor() {
    this.contentSimilarityAgent = new ContentSimilarityAgent();
  }

  /**
   * Run content similarity analysis with video data and context from other analyses
   */
  async runContentSimilarityAnalysis(contextData: any): Promise<any> {
    try {
      return await this.contentSimilarityAgent.analyze(contextData);
    } catch (error) {
      console.error("Content similarity analysis error:", error);
      throw error; // Propagate the error
    }
  }
}
