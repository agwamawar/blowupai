
import { EmotionalAnalysisAgent as IEmotionalAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class EmotionalAnalysisAgent implements IEmotionalAnalysisAgent {
  type: 'emotional' = 'emotional';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getModel('gemini-1.5-pro');

  async analyze(videoUrl: string): Promise<any> {
    return this.analyzeEmotional(videoUrl);
  }

  async analyzeEmotional(videoUrl: string) {
    const prompt = `Analyze the emotional impact of this video: ${videoUrl}
    Evaluate emotional resonance, engagement potential, and overall tone.
    Format response as JSON with: emotionalScore (0-10), emotionalTone (string),
    engagementPotential (0-10), score (0-100).`;

    const result = await this.model.generateContent(prompt);
    const response = await result.response;
    const analysisResult = JSON.parse(response.text());

    return {
      emotionalScore: analysisResult.emotionalScore,
      emotionalTone: analysisResult.emotionalTone,
      engagementPotential: analysisResult.engagementPotential,
      score: analysisResult.score
    };
  }
}
