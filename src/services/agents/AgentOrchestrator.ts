
import { extractVideoFrames } from '../videoAnalysisService';
import { calculateEngagementScore, calculateViralityScore } from './utils/scoreCalculators';
import { TechnicalAnalysisPipeline } from './pipelines/TechnicalAnalysisPipeline';
import { TrendAnalysisPipeline } from './pipelines/TrendAnalysisPipeline';
import { ConceptAnalysisPipeline } from './pipelines/ConceptAnalysisPipeline';
import { ViralityAnalysisPipeline } from './pipelines/ViralityAnalysisPipeline';
import { ContentSimilarityPipeline } from './pipelines/ContentSimilarityPipeline';
import { LightAnalysisPipeline } from './pipelines/LightAnalysisPipeline';
import { getRelevantCategories } from '@/utils/contentCategoryUtils';

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

      // Enhance metadata with content-specific information
      const enhancedMetadata = this.enhanceMetadataWithContentContext(metadata);
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
      const enhancedTechnicalAnalysis = this.enhanceTechnicalAnalysisWithContentContext(
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

      // Compile all analysis results into a comprehensive report
      return {
        video_url: videoUrl,
        video_metadata: enhancedMetadata,
        engagement_score: engagementScore,
        virality_score: viralityScore,
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

  /**
   * Enhances metadata with content type context and relevant categories
   */
  private enhanceMetadataWithContentContext(metadata: any): any {
    if (!metadata) return {};
    
    const enhancedMetadata = { ...metadata };
    
    // If content_type is available, derive relevant categories
    if (metadata.content_type) {
      const contentTypes = Array.isArray(metadata.content_type) 
        ? metadata.content_type 
        : [metadata.content_type];
      
      // For each content type, get relevant categories and combine them
      const allCategories = contentTypes.flatMap(type => getRelevantCategories(type));
      
      // Remove duplicates
      enhancedMetadata.derived_categories = Array.from(new Set(allCategories));
      
      // Add content-specific weighted factors for analysis
      enhancedMetadata.analysis_weights = this.getContentTypeWeights(contentTypes);
    }
    
    return enhancedMetadata;
  }
  
  /**
   * Gets weighted analysis factors based on content type
   */
  private getContentTypeWeights(contentTypes: string[]): Record<string, number> {
    // Default weights
    const defaultWeights = {
      technical: 0.3,
      concept: 0.4,
      trend: 0.3
    };
    
    // No content types, return default weights
    if (!contentTypes || contentTypes.length === 0) {
      return defaultWeights;
    }
    
    // Get primary content type (first one)
    const primaryType = contentTypes[0].toLowerCase();
    
    // Adjust weights based on content type
    if (primaryType.includes('tutorial') || primaryType.includes('how-to')) {
      return {
        technical: 0.45, // Technical quality matters more for tutorials
        concept: 0.35,
        trend: 0.20
      };
    } else if (primaryType.includes('comedy') || primaryType.includes('skits')) {
      return {
        technical: 0.25,
        concept: 0.50, // Concept/humor matters most for comedy
        trend: 0.25
      };
    } else if (primaryType.includes('challenge') || primaryType.includes('trend')) {
      return {
        technical: 0.20,
        concept: 0.30,
        trend: 0.50 // Trend alignment matters most for challenges
      };
    } else if (primaryType.includes('reaction')) {
      return {
        technical: 0.25,
        concept: 0.45, // Emotional/engaging reaction matters most
        trend: 0.30
      };
    } else if (primaryType.includes('storytelling') || primaryType.includes('storytime')) {
      return {
        technical: 0.30,
        concept: 0.55, // Story concept matters most
        trend: 0.15
      };
    }
    
    return defaultWeights;
  }
  
  /**
   * Enhances technical analysis with content-type specific insights
   */
  private enhanceTechnicalAnalysisWithContentContext(
    technicalAnalysis: any, 
    contentTypes: string | string[]
  ): any {
    if (!technicalAnalysis) return {};
    
    const enhancedAnalysis = { ...technicalAnalysis };
    const typeArray = Array.isArray(contentTypes) ? contentTypes : [contentTypes];
    
    // Skip if no content types
    if (!typeArray.length) return enhancedAnalysis;
    
    // Add content-specific benchmark scores and recommendations
    enhancedAnalysis.contentTypeSpecificScores = {};
    
    // Get content-specific recommendations
    enhancedAnalysis.contentTypeRecommendations = this.getContentTypeSpecificRecommendations(typeArray);
    
    // For each content type, add specific scoring
    typeArray.forEach(type => {
      if (type) {
        const typeLower = type.toLowerCase();
        
        if (typeLower.includes('tutorial') || typeLower.includes('how-to')) {
          enhancedAnalysis.contentTypeSpecificScores[type] = {
            clarity: this.scoreAttribute(technicalAnalysis.videoQuality, 0.8),
            instruction_quality: this.scoreAttribute(technicalAnalysis.lighting, 0.7),
            demonstration_effectiveness: this.scoreAttribute(8, 1) // Default high score for demo
          };
        } else if (typeLower.includes('comedy') || typeLower.includes('skits')) {
          enhancedAnalysis.contentTypeSpecificScores[type] = {
            comedy_timing: this.scoreAttribute(7, 1), // Default good score
            visual_humor: this.scoreAttribute(technicalAnalysis.composition, 0.9),
            punchline_effectiveness: this.scoreAttribute(8, 1) // Default high score
          };
        } else if (typeLower.includes('challenge') || typeLower.includes('trend')) {
          enhancedAnalysis.contentTypeSpecificScores[type] = {
            trend_accuracy: this.scoreAttribute(9, 1), // Default very high score
            challenge_execution: this.scoreAttribute(technicalAnalysis.stabilization, 0.8),
            originality: this.scoreAttribute(7, 1) // Default good score
          };
        }
      }
    });
    
    return enhancedAnalysis;
  }
  
  /**
   * Helper to score an attribute based on existing score and weight
   */
  private scoreAttribute(baseScore: number, weight: number): number {
    return Math.round((baseScore * weight) * 10) / 10;
  }
  
  /**
   * Gets content-type specific recommendations for technical improvements
   */
  private getContentTypeSpecificRecommendations(contentTypes: string[]): string[] {
    const recommendations: string[] = [];
    
    // Get primary content type (first one)
    if (!contentTypes.length) return recommendations;
    
    const primaryType = contentTypes[0].toLowerCase();
    
    if (primaryType.includes('tutorial') || primaryType.includes('how-to')) {
      recommendations.push(
        "Use consistent overhead lighting to improve clarity of demonstrations",
        "Add step numbers as text overlays to improve viewer comprehension",
        "Include close-up shots for detailed steps with focus indicators"
      );
    } else if (primaryType.includes('comedy') || primaryType.includes('skits')) {
      recommendations.push(
        "Add brief pause before punchlines to improve comedic timing",
        "Use quick zoom transitions to emphasize reactions and humor",
        "Include sound effects that enhance comedic moments"
      );
    } else if (primaryType.includes('challenge') || primaryType.includes('trend')) {
      recommendations.push(
        "Show exact trend format in first 3 seconds for algorithm recognition", 
        "Add trending hashtags as text overlays during key moments",
        "Include your unique twist after following trend format exactly"
      );
    } else if (primaryType.includes('reaction')) {
      recommendations.push(
        "Use picture-in-picture format to show content and reaction simultaneously",
        "Ensure your facial expressions are well-lit and clearly visible",
        "Add zoom transitions during peak emotional reactions"
      );
    } else if (primaryType.includes('storytelling') || primaryType.includes('storytime')) {
      recommendations.push(
        "Start with the most emotionally impactful moment of your story",
        "Use text overlays to highlight key story moments and timestamps",
        "Add subtle background music that enhances the emotional arc"
      );
    }
    
    return recommendations;
  }

  /**
   * Runs a lighter analysis focusing only on trend and virality
   */
  async runLightAnalysis(videoUrl: string, metadata?: any): Promise<any> {
    // Enhance metadata with content-specific information
    const enhancedMetadata = this.enhanceMetadataWithContentContext(metadata);
    return this.lightAnalysisPipeline.runLightAnalysis(videoUrl, enhancedMetadata);
  }
}
