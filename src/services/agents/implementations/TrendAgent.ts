
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAgent implements TrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    if (typeof data === 'string') {
      return this.analyzeTrends({ videoUrl: data });
    }
    return this.analyzeTrends(data);
  }

  async analyzeTrends(data: { 
    videoUrl: string; 
    metadata?: any; 
    frames?: string[] 
  }): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      const { videoUrl, metadata, frames = [] } = data;
      
      const prompt = `Analyze this video content and identify current trends, hashtags, and categories.
        Format response as JSON with these exact keys: trendScore, trendingHashtags, categories, trendOpportunities.`;

      // Sample frames if there are too many to avoid token limits (max ~20 frames)
      const framesToAnalyze = frames.length > 20 
        ? sampleFramesEvenly(frames, 20) 
        : frames;
      
      // If we have frames, analyze with frames, otherwise fallback to URL only
      const result = framesToAnalyze.length > 0 
        ? await this.model.generateContent([prompt, ...framesToAnalyze.slice(0, 20)])
        : await this.model.generateContent(prompt + videoUrl);
      
      const responseText = (await result.response).text();
      
      try {
        const analysis = JSON.parse(responseText);
        return {
          trendScore: analysis.trendScore || 75,
          trendingHashtags: analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          categories: analysis.categories || ['Entertainment', 'Social Media'],
          trendOpportunities: analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts']
        };
      } catch (error) {
        console.error("Error parsing trend analysis response:", error);
        return this.getFallbackTrendData();
      }
    } catch (error) {
      console.error("Error in trend analysis:", error);
      return this.getFallbackTrendData();
    }
  }

  private getFallbackTrendData(): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    return {
      trendScore: 75,
      trendingHashtags: ['#viral', '#trending', '#foryou'],
      categories: ['Entertainment', 'Social Media'],
      trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
    };
  }
}

/**
 * Samples frames evenly across the video to maintain coverage
 * while reducing the total number of frames
 */
function sampleFramesEvenly(frames: string[], maxFrames: number): string[] {
  if (frames.length <= maxFrames) return frames;
  
  const result: string[] = [];
  
  // Always include first and last frame
  result.push(frames[0]);
  
  // Sample frames evenly from the rest
  const step = (frames.length - 2) / (maxFrames - 2);
  for (let i = 1; i < maxFrames - 1; i++) {
    const index = Math.min(Math.floor(i * step) + 1, frames.length - 2);
    result.push(frames[index]);
  }
  
  // Add the last frame
  result.push(frames[frames.length - 1]);
  
  return result;
}
