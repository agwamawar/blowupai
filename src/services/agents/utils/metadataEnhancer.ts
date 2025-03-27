
/**
 * Utility class for enhancing video metadata with content-specific information
 */
import { getRelevantCategories } from '@/utils/contentCategoryUtils';

export class MetadataEnhancer {
  /**
   * Enhances metadata with content type context and relevant categories
   */
  enhanceMetadataWithContentContext(metadata: any): any {
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
}
