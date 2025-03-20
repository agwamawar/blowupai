import { PerformanceBenchmarkAgent as IPerfAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class PerformanceBenchmarkAgent implements IPerfAgent {
  type: 'performance-benchmark' = 'performance-benchmark';
  modelType: ModelType = 'gemini-1.5-flash';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-001' });

  async analyze(data: any): Promise<any> {
    return this.predictPerformance(data);
  }

  async predictPerformance(videoData: any) {
    const prompt = `Analyze performance potential for: ${JSON.stringify(videoData)}
    Predict:
    - View range
    - Engagement rates
    - Competitor metrics
    - Strategic recommendations
    Format as JSON with numerical predictions and actionable insights.`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    return JSON.parse(response.text());
  }
}