
import { TrendAnalysisAgent } from './implementations/TrendAnalysisAgent';
import { ViralityAgent } from './implementations/ViralityAgent';
import { TechnicalAgent } from './implementations/TechnicalAgent';
import { ConceptAnalysisAgents } from './implementations/ConceptAnalysisAgents';
import { ContentSimilarityAgent } from './implementations/ContentSimilarityAgent';
import { TrendAgent } from './implementations/TrendAgent';
import { getFallbackTrendData } from '@/utils/trendAnalysisFallback';

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

      // Start with technical and trend analysis in parallel
      const [technicalAnalysis, trendAnalysis, viralityPrediction] = await Promise.all([
        this.runTechnicalAnalysis(videoUrl, metadata),
        this.runTrendAnalysis(videoUrl, metadata),
        this.runViralityPrediction(videoUrl)
      ]);

      // Next, run concept analysis with the data from other agents
      const conceptAnalysis = await this.runConceptAnalysis(
        videoUrl, 
        { 
          trends: trendAnalysis, 
          technical: technicalAnalysis 
        }
      );

      // Finally, run content similarity analysis using all previous data
      const similarContent = await this.runContentSimilarityAnalysis(
        videoUrl, 
        {
          trends: trendAnalysis,
          concept: conceptAnalysis,
          technical: technicalAnalysis
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
        similarContent
      };
    } catch (error) {
      console.error("Error in analysis pipeline:", error);
      return this.getFallbackAnalysisResults(videoUrl, metadata);
    }
  }

  /**
   * Runs a lighter analysis focusing only on trend and virality
   */
  async runLightAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    try {
      console.log("Starting light analysis for video:", videoUrl);
      
      // Run just trend and virality analysis
      const trendData = await this.trendAgent.analyze(videoUrl);
      
      return {
        video_url: videoUrl,
        video_metadata: metadata,
        trend_score: trendData.trendScore,
        trending_hashtags: trendData.trendingHashtags,
        trend_opportunities: trendData.trendOpportunities,
        trend_categories: trendData.categories
      };
    } catch (error) {
      console.error("Error in light analysis:", error);
      return {
        video_url: videoUrl,
        video_metadata: metadata,
        ...getFallbackTrendData(metadata)
      };
    }
  }

  private async runTechnicalAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    try {
      return await this.technicalAnalysisAgent.analyze(videoUrl);
    } catch (error) {
      console.error("Technical analysis error:", error);
      return {};
    }
  }

  private async runTrendAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    try {
      return await this.trendAnalysisAgent.analyze(videoUrl, metadata);
    } catch (error) {
      console.error("Trend analysis error:", error);
      return getFallbackTrendData(metadata);
    }
  }

  private async runConceptAnalysis(videoUrl: string, contextData: any): Promise<any> {
    try {
      return await this.conceptAnalysisAgents.analyze(videoUrl, contextData);
    } catch (error) {
      console.error("Concept analysis error:", error);
      return {};
    }
  }

  private async runViralityPrediction(videoUrl: string): Promise<any> {
    try {
      return await this.viralityAnalysisAgent.analyze(videoUrl);
    } catch (error) {
      console.error("Virality prediction error:", error);
      return {};
    }
  }

  private async runContentSimilarityAnalysis(videoUrl: string, contextData: any): Promise<any> {
    try {
      return await this.contentSimilarityAgent.analyze(videoUrl);
    } catch (error) {
      console.error("Content similarity analysis error:", error);
      return {};
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
    return {
      video_url: videoUrl,
      video_metadata: metadata,
      engagement_score: 60,
      technicalAnalysis: {},
      conceptAnalysis: {},
      trendAnalysis: getFallbackTrendData(metadata),
      viralityPrediction: {},
      similarContent: {}
    };
  }
}
