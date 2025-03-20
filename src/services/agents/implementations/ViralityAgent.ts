import { ViralityAgent as IViralityAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class ViralityAgent implements IViralityAgent {
  type: 'virality' = 'virality';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    const prompt = `Analyze this video content for viral potential: ${JSON.stringify(data)}
    Consider:
    - Engagement potential
    - Share-worthiness
    - Trending topic alignment
    - Hook strength
    Format response as JSON with scores 0-100 and specific recommendations.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  }
}