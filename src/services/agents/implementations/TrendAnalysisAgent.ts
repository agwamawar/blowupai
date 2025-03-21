
import { TrendAnalysisAgent as ITrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAnalysisAgent implements ITrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(videoUrl: string) {
    try {
      return await this.analyzeTrends(videoUrl);
    } catch (error) {
      console.error("Error in trend analysis:", error);
      return {
        trendScore: 75,
        trendingHashtags: ['#viral', '#trending', '#foryou'],
        categories: ['Entertainment', 'Social Media'],
        trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
      };
    }
  }

  async analyzeTrends(videoUrl: string): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      const prompt = `Analyze this video content: ${videoUrl}. Return a JSON object with exactly this structure, no other text: 
      {
        "trendScore": number between 0-100,
        "trendingHashtags": ["tag1", "tag2", "tag3"],
        "categories": ["category1", "category2"],
        "trendOpportunities": ["opportunity1", "opportunity2", "opportunity3"]
      }`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const rawText = response.text();

      try {
        const analysis = JSON.parse(rawText);
        return {
          trendScore: analysis.trendScore || 75,
          trendingHashtags: analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          categories: analysis.categories || ['Entertainment', 'Social Media'],
          trendOpportunities: analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
        };
      } catch (jsonError) {
        console.error("JSON parsing error in trend analysis:", jsonError);
        // Fallback response if JSON parsing fails
        return {
          trendScore: 75,
          trendingHashtags: ['#viral', '#trending', '#foryou'],
          categories: ['Entertainment', 'Social Media'],
          trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
        };
      }
    } catch (error) {
      console.error("Error in trend analysis:", error);
      // Return fallback data in case of API errors
      return {
        trendScore: 75,
        trendingHashtags: ['#viral', '#trending', '#foryou'],
        categories: ['Entertainment', 'Social Media'],
        trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
      };
    }
  }
}
