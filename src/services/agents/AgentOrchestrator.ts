
import { AnalysisOrchestrator } from './orchestration/AnalysisOrchestrator';
import { LightAnalysisPipeline } from './pipelines/LightAnalysisPipeline';
import { ContentContextEnhancer } from './orchestration/ContentContextEnhancer';

/**
 * Main orchestrator that delegates to specialized analysis components
 */
export class AgentOrchestrator {
  private analysisOrchestrator: AnalysisOrchestrator;
  private lightAnalysisPipeline: LightAnalysisPipeline;
  private contentContextEnhancer: ContentContextEnhancer;

  constructor() {
    this.analysisOrchestrator = new AnalysisOrchestrator();
    this.lightAnalysisPipeline = new LightAnalysisPipeline();
    this.contentContextEnhancer = new ContentContextEnhancer();
  }

  /**
   * Orchestrates all agent calls for comprehensive video analysis
   */
  async analyzeVideo(videoUrl: string, metadata?: any): Promise<any> {
    return this.analysisOrchestrator.analyzeVideo(videoUrl, metadata);
  }

  /**
   * Runs a lighter analysis focusing only on trend and virality
   */
  async runLightAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    // Enhance metadata with content-specific information
    const enhancedMetadata = this.contentContextEnhancer.enhanceMetadataWithContentContext(metadata);
    return this.lightAnalysisPipeline.runLightAnalysis(videoUrl, enhancedMetadata);
  }
}
