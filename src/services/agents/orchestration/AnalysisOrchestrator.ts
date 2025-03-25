
/**
 * Core orchestration service that coordinates all analysis pipelines
 */

import { extractVideoFrames } from '../../videoAnalysisService';
import { TechnicalAnalysisPipeline } from '../pipelines/TechnicalAnalysisPipeline';
import { TrendAnalysisPipeline } from '../pipelines/TrendAnalysisPipeline';
import { ConceptAnalysisPipeline } from '../pipelines/ConceptAnalysisPipeline';
import { ViralityAnalysisPipeline } from '../pipelines/ViralityAnalysisPipeline';
import { ContentSimilarityPipeline } from '../pipelines/ContentSimilarityPipeline';
import { ContentContextEnhancer } from './ContentContextEnhancer';
import { TechnicalAnalysisEnhancer } from './TechnicalAnalysisEnhancer';
import { AnalysisScoreCalculator } from './AnalysisScoreCalculator';

export class AnalysisOrchestrator {
  private technicalAnalysisPipeline: TechnicalAnalysisPipeline;
  private trendAnalysisPipeline: TrendAnalysisPipeline;
  private conceptAnalysisPipeline: ConceptAnalysisPipeline;
  private viralityAnalysisPipeline: ViralityAnalysisPipeline;
  private contentSimilarityPipeline: ContentSimilarityPipeline;
  private contentContextEnhancer: ContentContextEnhancer;
  private technicalAnalysisEnhancer: TechnicalAnalysisEnhancer;
  private scoreCalculator: AnalysisScoreCalculator;

  constructor() {
    this.technicalAnalysisPipeline = new TechnicalAnalysisPipeline();
    this.trendAnalysisPipeline = new TrendAnalysisPipeline();
    this.conceptAnalysisPipeline = new ConceptAnalysisPipeline();
    this.viralityAnalysisPipeline = new ViralityAnalysisPipeline();
    this.contentSimilarityPipeline = new ContentSimilarityPipeline();
    this.contentContextEnhancer = new ContentContextEnhancer();
    this.technicalAnalysisEnhancer = new TechnicalAnalysisEnhancer();
    this.scoreCalculator = new AnalysisScoreCalculator();
  }

  /**
   * Orchestrates all agent calls for comprehensive video analysis
   */
  async analyzeVideo(videoUrl: string, metadata?: any): Promise<any> {
    try {
      console.log("Starting full analysis pipeline for video:", videoUrl);
      console.log("With metadata:", metadata);

      // Enhance metadata with content-specific information
      const enhancedMetadata = this.contentContextEnhancer.enhanceMetadataWithContentContext(metadata);
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

      // Calculate scores based on all analyses
      const scores = this.scoreCalculator.calculateScores(
        conceptAnalysis,
        enhancedTechnicalAnalysis,
        trendAnalysis,
        viralityPrediction
      );

      // Compile all analysis results into a comprehensive report
      return {
        video_url: videoUrl,
        video_metadata: enhancedMetadata,
        engagement_score: scores.engagement_score,
        virality_score: scores.virality_score,
        technicalAnalysis: enhancedTechnicalAnalysis,
        conceptAnalysis,
        trendAnalysis,
        viralityPrediction,
        similarContent,
        analyzedFrames: videoFrames.length
      };
    } catch (error) {
      console.error("Error in analysis pipeline:", error);
      throw error; // Instead of returning fallback, throw the error to be handled by caller
    }
  }
}
