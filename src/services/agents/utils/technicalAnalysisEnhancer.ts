
/**
 * Utility class for enhancing technical analysis with content-specific insights
 */
export class TechnicalAnalysisEnhancer {
  /**
   * Enhances technical analysis with content-type specific insights
   */
  enhanceTechnicalAnalysisWithContentContext(
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
}
