
import { extractVideoFrames } from '../videoAnalysisService';
import { calculateEngagementScore, calculateViralityScore } from './utils/scoreCalculators';
import { TechnicalAnalysisPipeline } from './pipelines/TechnicalAnalysisPipeline';
import { TrendAnalysisPipeline } from './pipelines/TrendAnalysisPipeline';
import { ConceptAnalysisPipeline } from './pipelines/ConceptAnalysisPipeline';
import { ViralityAnalysisPipeline } from './pipelines/ViralityAnalysisPipeline';
import { ContentSimilarityPipeline } from './pipelines/ContentSimilarityPipeline';
import { LightAnalysisPipeline } from './pipelines/LightAnalysisPipeline';

export class AgentOrchestrator {
  private technicalAnalysisPipeline: TechnicalAnalysisPipeline;
  private trendAnalysisPipeline: TrendAnalysisPipeline;
  private conceptAnalysisPipeline: ConceptAnalysisPipeline;
  private viralityAnalysisPipeline: ViralityAnalysisPipeline;
  private contentSimilarityPipeline: ContentSimilarityPipeline;
  private lightAnalysisPipeline: LightAnalysisPipeline;

  constructor() {
    this.technicalAnalysisPipeline = new TechnicalAnalysisPipeline();
    this.trendAnalysisPipeline = new TrendAnalysisPipeline();
    this.conceptAnalysisPipeline = new ConceptAnalysisPipeline();
    this.viralityAnalysisPipeline = new ViralityAnalysisPipeline();
    this.contentSimilarityPipeline = new ContentSimilarityPipeline();
    this.lightAnalysisPipeline = new LightAnalysisPipeline();
  }

  /**
   * Orchestrates all agent calls for comprehensive video analysis
   */
  async analyzeVideo(videoUrl: string, metadata?: any): Promise<any> {
    try {
      console.log("Starting full analysis pipeline for video:", videoUrl);
      console.log("With metadata:", metadata);

      // Extract video frames for analysis
      const videoFrames = await extractVideoFrames(videoUrl, 10);
      if (!videoFrames || videoFrames.length === 0) {
        throw new Error("Failed to extract video frames for analysis");
      }
      console.log(`Successfully extracted ${videoFrames.length} frames from video`);

      // Create proper analysis context with the video data
      const videoContext = {
        videoUrl,
        metadata,
        frames: videoFrames
      };

      // Start with technical and trend analysis in parallel
      const [technicalAnalysis, trendAnalysis, viralityPrediction] = await Promise.all([
        this.technicalAnalysisPipeline.runTechnicalAnalysis(videoContext),
        this.trendAnalysisPipeline.runTrendAnalysis(videoUrl, videoContext),
        this.viralityAnalysisPipeline.runViralityPrediction(videoContext)
      ]);

      // Next, run concept analysis with the data from other agents
      const conceptAnalysis = await this.conceptAnalysisPipeline.runConceptAnalysis(
        videoUrl, 
        { 
          trends: trendAnalysis, 
          technical: technicalAnalysis,
          frames: videoFrames,
          metadata
        }
      );

      // Finally, run content similarity analysis using all previous data
      const similarContent = await this.contentSimilarityPipeline.runContentSimilarityAnalysis(
        {
          trends: trendAnalysis,
          concept: conceptAnalysis,
          technical: technicalAnalysis,
          frames: videoFrames
        }
      );

      // Calculate engagement score as weighted average of different metrics
      const engagementScore = calculateEngagementScore(
        conceptAnalysis,
        technicalAnalysis,
        trendAnalysis
      );
      
      const viralityScore = calculateViralityScore(
        viralityPrediction,
        conceptAnalysis,
        technicalAnalysis
      );

      // Compile all analysis results into a comprehensive report
      return {
        video_url: videoUrl,
        video_metadata: metadata,
        engagement_score: engagementScore,
        virality_score: viralityScore,
        technicalAnalysis,
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

  /**
   * Runs a lighter analysis focusing only on trend and virality
   */
  async runLightAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    return this.lightAnalysisPipeline.runLightAnalysis(videoUrl, metadata);
  }
}
