
import { TrendAnalysisAgent as ITrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAnalysisAgent implements ITrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(videoUrl: string) {
    try {
      const prompt = `Analyze this video content: ${videoUrl}
      Provide a detailed analysis of current trends, including:
      - Trend relevance score (0-100)
      - Emotional impact score (0-100)
      - Hook effectiveness (0-100)
      Format response strictly as JSON with no additional text.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const rawText = response.text();
      
      console.log("Raw AI response:", rawText);
      
      let analysis;
      try {
        analysis = JSON.parse(rawText);
      } catch (error) {
        console.error("Failed to parse AI response as JSON:", error);
        console.log("Non-JSON response received:", rawText);
        return {
          trendScore: 70,
          emotionalScore: 75,
          hookScore: 65,
          totalScore: 70,
          error: "Failed to parse AI response"
        };
      }
      
      return {
        trendScore: analysis.trendRelevance || 0,
        emotionalScore: analysis.emotionalImpact || 0,
        hookScore: analysis.hookEffectiveness || 0,
        totalScore: ((analysis.trendRelevance || 0) + (analysis.emotionalImpact || 0) + (analysis.hookEffectiveness || 0)) / 3
      };
  }
}
