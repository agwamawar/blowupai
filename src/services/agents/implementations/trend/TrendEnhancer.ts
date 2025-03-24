
import { 
  calculateTrendScoreForContentType,
  enhanceHashtagsForContentType,
  enhanceCategoriesForContentType,
  enhanceTrendOpportunitiesForContentType
} from '../../../../utils/trendContentUtils';

export class TrendEnhancer {
  enhanceTrendData(
    analysisResult: {
      trendScore: number;
      trendingHashtags: string[];
      categories: string[];
      trendOpportunities: string[];
    },
    contentType: string
  ): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    return {
      // Use existing trendScore or calculate a new one
      trendScore: analysisResult.trendScore || calculateTrendScoreForContentType(contentType),
      
      // Enhance hashtags with content-specific ones
      trendingHashtags: enhanceHashtagsForContentType(
        analysisResult.trendingHashtags || ['#viral', '#trending', '#foryou'],
        contentType
      ),
      
      // Enhance categories based on content type
      categories: enhanceCategoriesForContentType(
        analysisResult.categories || ['Entertainment', 'Social Media'],
        contentType
      ),
      
      // Generate content-specific trend opportunities
      trendOpportunities: enhanceTrendOpportunitiesForContentType(
        analysisResult.trendOpportunities || ['Use trending audio', 'Add pattern interrupts'],
        contentType
      )
    };
  }
}
