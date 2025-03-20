import { TrendAnalysisAgent as ITrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAnalysisAgent implements ITrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(videoUrl: string) {
    try {
      const prompt = `Analyze this video content: ${videoUrl}
      Return only a JSON object in this exact format, with no additional text:
      { 'hashtags': ['...'], 'opportunities': ['...'], 'summary': '...' }`;

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
          hashtags: ['#trending', '#viral'],
          opportunities: ['Add trending music', 'Use viral transitions'],
          summary: 'Default trend analysis'
        };
      }

      return analysis;
    } catch (error) {
      console.error("Error during trend analysis:", error);
      return {
        'hashtags': ['#trending', '#viral', '#fyp'],
        'opportunities': ['Add trending music', 'Use viral transitions', 'Include popular hashtags'],
        'summary': 'Video has potential for virality with proper optimization'
      };
    }
  }
}