
import { extractVideoFrames } from '../videoAnalysisService';
import { calculateEngagementScore, calculateViralityScore } from './utils/scoreCalculators';
import { TechnicalAnalysisPipeline } from './pipelines/TechnicalAnalysisPipeline';
import { TrendAnalysisPipeline } from './pipelines/TrendAnalysisPipeline';
import { ConceptAnalysisPipeline } from './pipelines/ConceptAnalysisPipeline';
import { ViralityAnalysisPipeline } from './pipelines/ViralityAnalysisPipeline';
import { ContentSimilarityPipeline } from './pipelines/ContentSimilarityPipeline';
import { LightAnalysisPipeline } from './pipelines/LightAnalysisPipeline';
import { MetadataEnhancer } from './utils/metadataEnhancer';
import { TechnicalAnalysisEnhancer } from './utils/technicalAnalysisEnhancer';

export class AgentOrchestrator {
  private technicalAnalysisPipeline: TechnicalAnalysisPipeline;
  private trendAnalysisPipeline: TrendAnalysisPipeline;
  private conceptAnalysisPipeline: ConceptAnalysisPipeline;
  private viralityAnalysisPipeline: ViralityAnalysisPipeline;
  private contentSimilarityPipeline: ContentSimilarityPipeline;
  private lightAnalysisPipeline: LightAnalysisPipeline;
  private metadataEnhancer: MetadataEnhancer;
  private technicalAnalysisEnhancer: TechnicalAnalysisEnhancer;

  constructor() {
    this.technicalAnalysisPipeline = new TechnicalAnalysisPipeline();
    this.trendAnalysisPipeline = new TrendAnalysisPipeline();
    this.conceptAnalysisPipeline = new ConceptAnalysisPipeline();
    this.viralityAnalysisPipeline = new ViralityAnalysisPipeline();
    this.contentSimilarityPipeline = new ContentSimilarityPipeline();
    this.lightAnalysisPipeline = new LightAnalysisPipeline();
    this.metadataEnhancer = new MetadataEnhancer();
    this.technicalAnalysisEnhancer = new TechnicalAnalysisEnhancer();
  }

  /**
   * Orchestrates all agent calls for comprehensive video analysis
   */
  async analyzeVideo(videoUrl: string, metadata?: any): Promise<any> {
    try {
      console.log("Starting full analysis pipeline for video:", videoUrl);
      console.log("With metadata:", metadata);

      // Enhance metadata with content-specific information
      const enhancedMetadata = this.metadataEnhancer.enhanceMetadataWithContentContext(metadata);
      console.log("Enhanced metadata with content context:", enhancedMetadata);

      // Extract video frames for analysis
      let videoFrames;
      try {
        videoFrames = await extractVideoFrames(videoUrl, 10);
      } catch (error) {
        console.warn("Frame extraction failed, continuing with limited analysis:", error);
        videoFrames = [];
      }
      console.log(`Successfully extracted ${videoFrames.length} frames from video`);

      // Create proper analysis context with the video data
      const videoContext = {
        videoUrl,
        metadata: enhancedMetadata,
        frames: videoFrames
      };

      // Start with technical and trend analysis in parallel
      const [technicalAnalysis, trendAnalysis, viralityPrediction] = await Promise.all([
        this.technicalAnalysisPipeline.runTechnicalAnalysis(videoContext),
        this.trendAnalysisPipeline.runTrendAnalysis(videoUrl, videoContext),
        this.viralityAnalysisPipeline.runViralityPrediction(videoContext)
      ]);

      // Add content-type specific analysis to technical analysis
      const enhancedTechnicalAnalysis = this.technicalAnalysisEnhancer
        .enhanceTechnicalAnalysisWithContentContext(
          technicalAnalysis,
          enhancedMetadata.content_type
        );

      // Next, run concept analysis with the data from other agents
      const conceptAnalysis = await this.conceptAnalysisPipeline.runConceptAnalysis(
        videoUrl, 
        { 
          trends: trendAnalysis, 
          technical: enhancedTechnicalAnalysis,
          frames: videoFrames,
          metadata: enhancedMetadata
        }
      );

      // Finally, run content similarity analysis using all previous data
      const similarContent = await this.contentSimilarityPipeline.runContentSimilarityAnalysis(
        {
          trends: trendAnalysis,
          concept: conceptAnalysis,
          technical: enhancedTechnicalAnalysis,
          frames: videoFrames,
          contentType: enhancedMetadata.content_type
        }
      );

      // Calculate engagement score as weighted average of different metrics
      const engagementScore = calculateEngagementScore(
        conceptAnalysis,
        enhancedTechnicalAnalysis,
        trendAnalysis
      );
      
      const viralityScore = calculateViralityScore(
        viralityPrediction,
        conceptAnalysis,
        enhancedTechnicalAnalysis
      );

      // Wait for all analysis results to complete
      await Promise.all([
        technicalAnalysis,
        trendAnalysis,
        viralityPrediction,
        conceptAnalysis,
        similarContent
      ]);

      // Compile all analysis results into a comprehensive report
      const results = {
        video_url: videoUrl,
        video_metadata: enhancedMetadata,
        engagement_score: engagementScore,
        virality_score: viralityScore,
        technicalAnalysis: enhancedTechnicalAnalysis,
        conceptAnalysis,
        trendAnalysis,
        viralityPrediction,
        similarContent,
        analyzedFrames: videoFrames.length,
        analysis_completed: true,
        timestamp: Date.now()
      };

      return results;
    } catch (error) {
      console.error("Error in analysis pipeline:", error);
      throw new Error(`Analysis failed: ${error.message}`);
    }
  }

  /**
   * Runs a lighter analysis focusing only on trend and virality
   */
  async runLightAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    // Enhance metadata with content-specific information
    const enhancedMetadata = this.metadataEnhancer.enhanceMetadataWithContentContext(metadata);
    return this.lightAnalysisPipeline.runLightAnalysis(videoUrl, enhancedMetadata);
  }
}
