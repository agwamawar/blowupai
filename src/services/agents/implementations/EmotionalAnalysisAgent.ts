import { EmotionalAnalysisAgent as IEmotionalAnalysisAgent, ModelType } from '../AgentTypes';
import { initializeServiceAccounts } from '../../../lib/serviceAccounts';

export class EmotionalAnalysisAgent implements IEmotionalAnalysisAgent {
  type: 'emotional' = 'emotional';
  modelType: ModelType = 'gemini-1.5-pro';
  private model: any;

  constructor() {
    const { vertexai } = initializeServiceAccounts();
    this.model = vertexai.preview.getGenerativeModel({ 
      model: 'gemini-1.5-pro',
      generationConfig: {
        maxOutputTokens: 2048,
        temperature: 0.4
      }
    });
  }

  async analyze(data: any): Promise<any> {
    if (typeof data === 'string') {
      return this.analyzeEmotional(data);
    }
    
    const { frames, metadata, technical } = data;
    
    try {
      // Analyze frames for emotional content
      const frameAnalysis = frames && frames.length > 0 
        ? await Promise.all(frames.map(frame => this.analyzeFrame(frame)))
        : [];

      // Analyze audio features from technical analysis
      const audioAnalysis = this.analyzeAudioFeatures(technical?.audioFeatures);

      return {
        emotionalScore: this.calculateEmotionalScore(frameAnalysis),
        emotionalTone: this.getDominantEmotion(frameAnalysis),
        engagementPotential: this.calculateEngagementScore(frameAnalysis, audioAnalysis),
        score: Math.round(this.calculateEngagementScore(frameAnalysis, audioAnalysis) * 10)
      };
    } catch (error) {
      console.error("Emotional analysis failed:", error);
      return this.getFallbackEmotionalData();
    }
  }

  async analyzeEmotional(videoUrl: string) {
    try {
      const prompt = `Analyze the emotional impact of this video: ${videoUrl}
      Evaluate emotional resonance, engagement potential, and overall tone.
      Format response as JSON with: emotionalScore (0-10), emotionalTone (string),
      engagementPotential (0-10), score (0-100).`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      try {
        const analysisResult = JSON.parse(text);
        return {
          emotionalScore: analysisResult.emotionalScore,
          emotionalTone: analysisResult.emotionalTone,
          engagementPotential: analysisResult.engagementPotential,
          score: analysisResult.score
        };
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        // Fallback response if JSON parsing fails
        return this.getFallbackEmotionalData();
      }
    } catch (error) {
      console.error("Error in emotional analysis:", error);
      return this.getFallbackEmotionalData();
    }
  }

  private async analyzeFrame(frame: string) {
    const prompt = `Analyze this video frame for emotional content and expression. 
    Focus on: facial expressions, body language, color psychology, and composition.
    Return as JSON with emotion scores.`;

    try {
      const result = await this.model.generateContent([prompt, frame]);
      return JSON.parse((await result.response).text());
    } catch (error) {
      console.error("Error analyzing frame:", error);
      return { dominantEmotion: 'neutral', intensity: 0.5 };
    }
  }

  private analyzeAudioFeatures(audioFeatures: any) {
    if (!audioFeatures) return { impact: 0.5, mood: 'neutral' };

    const volume = audioFeatures.volume || 5;
    const pitch = audioFeatures.pitch || 5;
    const tempo = audioFeatures.tempo || 5;
    
    const impact = (volume + pitch + tempo) / 30;
    const mood = this.determineAudioMood(volume, pitch, tempo);

    return { impact, mood };
  }

  private getDominantEmotion(frameAnalysis: any[]): string {
    if (!frameAnalysis || !frameAnalysis.length) return 'neutral';
    
    const emotionCounts = frameAnalysis.reduce((acc, curr) => {
      const emotion = curr.dominantEmotion || 'neutral';
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(emotionCounts)
      .sort(([,a], [,b]) => (b as number) - (a as number))[0][0];
  }

  private calculateEmotionalScore(frameAnalysis: any[]): number {
    if (!frameAnalysis || !frameAnalysis.length) return 7;
    
    const intensities = frameAnalysis.map(frame => frame.intensity || 0.5);
    return intensities.reduce((sum, val) => sum + val, 0) / intensities.length * 10;
  }

  private calculateEngagementScore(frameAnalysis: any[], audioAnalysis: any): number {
    if (!frameAnalysis || !frameAnalysis.length) {
      return audioAnalysis.impact * 0.8 + 0.6;
    }
    
    const visualScore = frameAnalysis.reduce((acc, curr) => 
      acc + (curr.intensity || 0.5), 0) / frameAnalysis.length;
    
    return (visualScore + audioAnalysis.impact) / 2;
  }

  private determineAudioMood(volume: number, pitch: number, tempo: number): string {
    const moodScore = (volume + pitch + tempo) / 3;
    if (moodScore > 7) return 'energetic';
    if (moodScore > 5) return 'positive';
    if (moodScore > 3) return 'neutral';
    return 'calm';
  }

  private getFallbackEmotionalData() {
    return {
      emotionalScore: 7,
      emotionalTone: "Positive",
      engagementPotential: 7.5,
      score: 75
    };
  }
}
