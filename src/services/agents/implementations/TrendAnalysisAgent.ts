import { TrendAnalysisAgent as ITrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAnalysisAgent implements ITrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(videoUrl: string) {
    try {
      const prompt = `Analyze this video content: ${videoUrl}. Return a JSON object with exactly this structure, no other text: {"hashtags": ["tag1", "tag2"], "opportunities": ["opportunity1", "opportunity2"], "summary": "brief summary"}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const rawText = response.text();

      let analysis;
      try {
        analysis = JSON.parse(rawText);
        return {
          hashtags: analysis.hashtags || [],
          opportunities: analysis.opportunities || [],
          summary: analysis.summary || ''
        };
      } catch (error) {
        return {
          hashtags: ['#viral', '#trending', '#foryou'],
          opportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions'],
          summary: 'Content shows viral potential with optimization'
        };
      }
    } catch (error) {
      return {
        hashtags: ['#viral', '#trending', '#foryou'],
        opportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions'],
        summary: 'Content shows viral potential with optimization'
      };
    }
  }
}