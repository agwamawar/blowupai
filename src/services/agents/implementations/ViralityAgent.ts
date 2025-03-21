
import { ViralityAgent as IViralityAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class ViralityAgent implements IViralityAgent {
  type: 'virality' = 'virality';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    return this.predictVirality(data);
  }

  async predictVirality(conceptAnalysis: any): Promise<{
    score: number;
    predictedViews: number;
    predictedEngagement: number;
    improvements: string[];
  }> {
    try {
      const prompt = `Analyze this video content for viral potential: ${JSON.stringify(conceptAnalysis)}
      Consider:
      - Engagement potential
      - Share-worthiness
      - Trending topic alignment
      - Hook strength
      Format response as JSON with exactly this structure, no other text: 
      {
        "score": number between 0-100,
        "predictedViews": number,
        "predictedEngagement": number,
        "improvements": ["improvement1", "improvement2", "improvement3"]
      }`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const rawText = response.text();

      try {
        const analysis = JSON.parse(rawText);
        return {
          score: analysis.score || 65,
          predictedViews: analysis.predictedViews || 5000,
          predictedEngagement: analysis.predictedEngagement || 8.5,
          improvements: analysis.improvements || ["Improve hook", "Add call to action", "Include trending audio"]
        };
      } catch (jsonError) {
        console.error("JSON parsing error in virality prediction:", jsonError);
        // Fallback response if JSON parsing fails
        return {
          score: 65,
          predictedViews: 5000,
          predictedEngagement: 8.5,
          improvements: ["Improve hook", "Add call to action", "Include trending audio"]
        };
      }
    } catch (error) {
      console.error("Error in virality prediction:", error);
      // Return fallback data in case of API errors
      return {
        score: 65,
        predictedViews: 5000,
        predictedEngagement: 8.5,
        improvements: ["Improve hook", "Add call to action", "Include trending audio"]
      };
    }
  }
}
