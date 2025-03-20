
import { TrendAnalysisAgent as ITrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAnalysisAgent implements ITrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(videoUrl: string): Promise<any> {
    return this.analyzeTrends(videoUrl);
  }

  async analyzeTrends(videoUrl: string) {
    const prompt = `Analyze this video content: ${videoUrl}
    Identify current trending elements, hashtags, and viral opportunities.
    Format response as JSON with: trendScore (0-100), trendingHashtags (array), 
    categories (array), and trendOpportunities (array).`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const analysisResult = JSON.parse(response.text());

    return {
      trendScore: analysisResult.trendScore,
      trendingHashtags: analysisResult.trendingHashtags,
      categories: analysisResult.categories,
      trendOpportunities: analysisResult.trendOpportunities
    };
  }
}
