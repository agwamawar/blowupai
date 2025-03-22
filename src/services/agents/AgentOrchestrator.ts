import { TrendAnalysisAgent } from './implementations/TrendAnalysisAgent';
import { ViralityAgent } from './implementations/ViralityAgent';
import { TechnicalAgent } from './implementations/TechnicalAgent';
import { ConceptAnalysisAgents } from './implementations/ConceptAnalysisAgents';
import { ContentSimilarityAgent } from './implementations/ContentSimilarityAgent';
import { TrendAgent } from './implementations/TrendAgent';
import { getFallbackTrendData } from '@/utils/trendAnalysisFallback';
import { extractVideoFrames } from '@/services/videoAnalysisService';

export class AgentOrchestrator {
  private trendAnalysisAgent: TrendAnalysisAgent;
  private viralityAnalysisAgent: ViralityAgent;
  private technicalAnalysisAgent: TechnicalAgent;
  private conceptAnalysisAgents: ConceptAnalysisAgents;
  private contentSimilarityAgent: ContentSimilarityAgent;
  private trendAgent: TrendAgent;

  constructor() {
    this.trendAnalysisAgent = new TrendAnalysisAgent();
    this.viralityAnalysisAgent = new ViralityAgent();
    this.technicalAnalysisAgent = new TechnicalAgent();
    this.conceptAnalysisAgents = new ConceptAnalysisAgents();
    this.contentSimilarityAgent = new ContentSimilarityAgent();
    this.trendAgent = new TrendAgent();
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
        this.runTechnicalAnalysis(videoUrl, videoContext),
        this.runTrendAnalysis(videoUrl, videoContext),
        this.runViralityPrediction(videoContext)
      ]);

      // Next, run concept analysis with the data from other agents
      const conceptAnalysis = await this.runConceptAnalysis(
        videoUrl, 
        { 
          trends: trendAnalysis, 
          technical: technicalAnalysis,
          frames: videoFrames,
          metadata
        }
      );

      // Finally, run content similarity analysis using all previous data
      const similarContent = await this.runContentSimilarityAnalysis(
        videoUrl, 
        {
          trends: trendAnalysis,
          concept: conceptAnalysis,
          technical: technicalAnalysis,
          frames: videoFrames
        }
      );

      // Calculate engagement score as weighted average of different metrics
      const engagementScore = this.calculateEngagementScore(
        conceptAnalysis,
        technicalAnalysis,
        trendAnalysis
      );
      
      const viralityScore = this.calculateViralityScore(
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
    try {
      console.log("Starting light analysis for video:", videoUrl);
      
      // Extract a smaller set of frames for quick analysis
      const videoFrames = await extractVideoFrames(videoUrl, 3);
      if (!videoFrames || videoFrames.length === 0) {
        throw new Error("Failed to extract video frames for light analysis");
      }
      console.log(`Light analysis: extracted ${videoFrames.length} frames from video`);
      
      // Run trend analysis with actual video data
      const trendData = await this.trendAgent.analyze({
        videoUrl,
        metadata,
        frames: videoFrames
      });
      
      return {
        video_url: videoUrl,
        video_metadata: metadata,
        trend_score: trendData.trendScore,
        trending_hashtags: trendData.trendingHashtags,
        trend_opportunities: trendData.trendOpportunities,
        trend_categories: trendData.categories,
        analyzedFrames: videoFrames.length
      };
    } catch (error) {
      console.error("Error in light analysis:", error);
      throw error; // Throw error to be handled by caller instead of returning fallback
    }
  }

  private async runTechnicalAnalysis(videoUrl: string, videoContext: any): Promise<any> {
    try {
      return await this.technicalAnalysisAgent.analyze(videoContext);
    } catch (error) {
      console.error("Technical analysis error:", error);
      throw error; // Propagate the error
    }
  }

  private async runTrendAnalysis(videoUrl: string, videoContext: any): Promise<any> {
    try {
      return await this.trendAnalysisAgent.analyze(videoUrl, videoContext);
    } catch (error) {
      console.error("Trend analysis error:", error);
      throw error; // Propagate the error
    }
  }

  private async runConceptAnalysis(videoUrl: string, contextData: any): Promise<any> {
    try {
      return await this.conceptAnalysisAgents.analyze(videoUrl, contextData);
    } catch (error) {
      console.error("Concept analysis error:", error);
      throw error; // Propagate the error
    }
  }

  private async runViralityPrediction(videoContext: any): Promise<any> {
    try {
      return await this.viralityAnalysisAgent.analyze(videoContext);
    } catch (error) {
      console.error("Virality prediction error:", error);
      throw error; // Propagate the error
    }
  }

  private async runContentSimilarityAnalysis(videoUrl: string, contextData: any): Promise<any> {
    try {
      return await this.contentSimilarityAgent.analyze(contextData);
    } catch (error) {
      console.error("Content similarity analysis error:", error);
      throw error; // Propagate the error
    }
  }

  private calculateEngagementScore(conceptAnalysis: any, technicalAnalysis: any, trendAnalysis: any): number {
    let score = 0;
    let weightSum = 0;

    if (conceptAnalysis?.totalScore) {
      score += conceptAnalysis.totalScore * 0.4;
      weightSum += 0.4;
    }
    if (technicalAnalysis?.qualityScore) {
      score += technicalAnalysis.qualityScore * 0.3;
      weightSum += 0.3;
    }
    if (trendAnalysis?.trendScore) {
      score += trendAnalysis.trendScore * 0.3;
      weightSum += 0.3;
    }

    return weightSum > 0 ? Math.round(score / weightSum) : 50;
  }
  
  private calculateViralityScore(viralityPrediction: any, conceptAnalysis: any, technicalAnalysis: any): number {
    let score = 0;
    let weightSum = 0;
    
    if (viralityPrediction?.predictedScore) {
      score += viralityPrediction.predictedScore * 0.5;
      weightSum += 0.5;
    }
    if (conceptAnalysis?.totalScore) {
      score += conceptAnalysis.totalScore * 0.3;
      weightSum += 0.3;
    }
    if (technicalAnalysis?.qualityScore) {
      score += technicalAnalysis.qualityScore * 0.2;
      weightSum += 0.2;
    }
    
    return weightSum > 0 ? Math.round(score / weightSum) : 50;
  }

  private getFallbackAnalysisResults(videoUrl: string, metadata?: any): any {
    // This method should only be called in exceptional circumstances
    console.error("Using fallback analysis results due to critical failure");
    return {
      video_url: videoUrl,
      video_metadata: metadata,
      engagement_score: 60,
      error: "Analysis failed - using fallback data",
      technicalAnalysis: {},
      conceptAnalysis: {},
      trendAnalysis: {},
      viralityPrediction: {},
      similarContent: {}
    };
  }
}
