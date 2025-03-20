
import { TrendAnalysisAgent as ITrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAnalysisAgent implements ITrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(videoUrl: string) {
    const prompt = `Analyze this video content: ${videoUrl}
    Provide a detailed analysis of current trends, including:
    - Trend relevance score (0-100)
    - Emotional impact score (0-100)
    - Hook effectiveness (0-100)
    Format as JSON.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const analysis = JSON.parse(response.text());
    
    return {
      trendScore: analysis.trendRelevance,
      emotionalScore: analysis.emotionalImpact,
      hookScore: analysis.hookEffectiveness,
      totalScore: (analysis.trendRelevance + analysis.emotionalImpact + analysis.hookEffectiveness) / 3
    };
  }
}
