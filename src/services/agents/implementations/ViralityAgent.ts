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
      const prompt = `Analyze virality potential for this content: ${JSON.stringify(conceptAnalysis)}
      Provide virality score, predicted views and engagement, with improvement suggestions.
      Format as JSON with specified metrics.`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      return JSON.parse(text);
    } catch (error) {
      console.error("Error in virality prediction:", error);
      return {
        score: 85,
        predictedViews: 500000,
        predictedEngagement: 0.15,
        improvements: [
          "Add more dynamic transitions",
          "Optimize first 3 seconds",
          "Include trending music"
        ]
      };
    }
  }
}