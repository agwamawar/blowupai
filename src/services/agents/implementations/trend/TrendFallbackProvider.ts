
import { 
  calculateTrendScoreForContentType,
  enhanceHashtagsForContentType,
  enhanceCategoriesForContentType,
  enhanceTrendOpportunitiesForContentType
} from '../../../../utils/trendContentUtils';

export class TrendFallbackProvider {
  getFallbackTrendData(contentType: string): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    // Base fallback data
    const baseData = {
      trendScore: 75,
      trendingHashtags: ['#viral', '#trending', '#foryou'],
      categories: ['Entertainment', 'Social Media'],
      trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
    };
    
    // Enhance fallback data based on content type
    return {
      trendScore: calculateTrendScoreForContentType(contentType),
      trendingHashtags: enhanceHashtagsForContentType(baseData.trendingHashtags, contentType),
      categories: enhanceCategoriesForContentType(baseData.categories, contentType),
      trendOpportunities: enhanceTrendOpportunitiesForContentType(baseData.trendOpportunities, contentType)
    };
  }
}
