
import { ConceptAnalysisAgents } from '../implementations/ConceptAnalysisAgents';

export class ConceptAnalysisPipeline {
  private conceptAnalysisAgents: ConceptAnalysisAgents;

  constructor() {
    this.conceptAnalysisAgents = new ConceptAnalysisAgents();
  }

  /**
   * Run concept analysis with video data and context from other analyses
   */
  async runConceptAnalysis(videoUrl: string, contextData: any): Promise<any> {
    try {
      return await this.conceptAnalysisAgents.analyze(videoUrl, contextData);
    } catch (error) {
      console.error("Concept analysis error:", error);
      throw error; // Propagate the error
    }
  }
}
