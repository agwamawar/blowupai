
import { getFallbackTrendData as getVideoFallbackTrendData } from '../../../../utils/trendVideoUtils';

export class TrendFallbackProvider {
  getFallbackTrendData(contentType: string): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    return getVideoFallbackTrendData(contentType);
  }
}
