
import { GapAnalysisAgent as IGapAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class GapAnalysisAgent implements IGapAnalysisAgent {
  type: 'gap-analysis' = 'gap-analysis';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    return this.analyzeGaps(data);
  }

  async analyzeGaps(videoData: any) {
    const { frames = [], metadata = {}, technical = {} } = videoData;

    try {
      // Analyze visual elements
      const visualGaps = await this.analyzeVisualGaps(frames);
      
      // Analyze audio elements
      const audioGaps = this.analyzeAudioGaps(technical.audioFeatures);
      
      // Analyze content structure
      const structuralGaps = await this.analyzeStructuralGaps({
        metadata,
        technical,
        visualGaps,
        audioGaps
      });

      // Calculate impact scores
      const impact = this.calculateImpactScores({
        visualGaps,
        audioGaps,
        structuralGaps
      });

      return {
        missingElements: [
          ...visualGaps.missing,
          ...audioGaps.missing,
          ...structuralGaps.missing
        ],
        uniqueStrengths: this.identifyStrengths({
          metadata,
          technical,
          visualGaps,
          audioGaps
        }),
        recommendations: this.generateRecommendations({
          visualGaps,
          audioGaps,
          structuralGaps,
          impact
        }),
        impact
      };
    } catch (error) {
      console.error("Gap analysis failed:", error);
      throw error;
    }
  }

  private async analyzeVisualGaps(frames: string[]) {
    if (!frames.length) return { missing: [], score: 0 };

    const prompt = `Analyze these video frames for missing visual elements that could improve engagement:
      - Visual effects
      - Text overlays
      - Transitions
      - Composition elements
      Return as JSON with missing elements and impact scores.`;

    const result = await this.model.generateContent([prompt, ...frames]);
    return JSON.parse((await result.response).text());
  }

  private analyzeAudioGaps(audioFeatures: any) {
    if (!audioFeatures) return { missing: [], score: 0 };

    const { volume, pitch, tempo } = audioFeatures;
    const missing = [];

    if (volume < 6) missing.push('Dynamic volume range');
    if (pitch < 5) missing.push('Vocal energy variation');
    if (tempo < 100) missing.push('Engaging pace');

    return {
      missing,
      score: (volume + pitch + tempo) / 30
    };
  }

  private async analyzeStructuralGaps(data: any) {
    const prompt = `Analyze this video structure for content gaps:
      ${JSON.stringify(data)}
      Identify missing elements that could improve:
      - Narrative flow
      - Engagement points
      - Call-to-actions
      Return as JSON with missing elements and priority scores.`;

    const result = await this.model.generateContent(prompt);
    return JSON.parse((await result.response).text());
  }

  private calculateImpactScores(analysis: any) {
    return {
      engagement: this.calculateEngagementImpact(analysis),
      retention: this.calculateRetentionImpact(analysis),
      shareability: this.calculateShareabilityImpact(analysis)
    };
  }

  private calculateEngagementImpact(analysis: any): number {
    const weights = { visual: 0.4, audio: 0.3, structural: 0.3 };
    return Math.min(
      (analysis.visualGaps.score * weights.visual) +
      (analysis.audioGaps.score * weights.audio) +
      (analysis.structuralGaps.score * weights.structural),
      1
    );
  }

  private calculateRetentionImpact(analysis: any): number {
    return Math.min(
      (analysis.structuralGaps.retentionScore || 0.5) +
      (analysis.audioGaps.score * 0.3),
      1
    );
  }

  private calculateShareabilityImpact(analysis: any): number {
    return Math.min(
      (analysis.visualGaps.viralityScore || 0.5) +
      (analysis.structuralGaps.shareScore || 0.3),
      1
    );
  }

  private identifyStrengths(data: any): string[] {
    const strengths = [];
    if (data.technical?.quality > 7) strengths.push('High production quality');
    if (data.audioGaps.score > 0.7) strengths.push('Strong audio elements');
    if (data.visualGaps.score > 0.7) strengths.push('Effective visual composition');
    return strengths;
  }

  private generateRecommendations(analysis: any): string[] {
    const recommendations = [];
    const { visualGaps, audioGaps, structuralGaps, impact } = analysis;

    // Prioritize recommendations based on impact scores
    if (impact.engagement < 0.6) {
      recommendations.push(...visualGaps.recommendations || []);
    }
    if (impact.retention < 0.7) {
      recommendations.push(...structuralGaps.recommendations || []);
    }
    if (impact.shareability < 0.5) {
      recommendations.push(...audioGaps.recommendations || []);
    }

    return recommendations.slice(0, 5);
  }
}
