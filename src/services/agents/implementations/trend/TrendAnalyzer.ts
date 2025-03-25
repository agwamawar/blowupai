
import { getFallbackTrendData } from '../../../../utils/trendVideoUtils';

export class TrendAnalyzer {
  private model: any;

  constructor(model: any) {
    this.model = model;
  }

  async analyze(videoUrl: string, contentType: string, frames: string[]): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    const prompt = this.buildPromptForContentType(videoUrl, contentType);
    
    try {
      // Sample frames if there are too many to avoid token limits (max ~10 frames)
      // Reduced from 20 to 10 to avoid payload size limits
      const framesToAnalyze = frames.length > 10 
        ? sampleFramesEvenly(frames, 10) 
        : frames;
      
      let result;
      
      try {
        // Limit the number of frames sent in a single request to prevent payload size issues
        // If we have frames, analyze with frames, otherwise fallback to URL only
        if (framesToAnalyze.length > 0) {
          console.log(`Analyzing with ${framesToAnalyze.length} frames`);
          
          // Process in smaller batches if needed
          if (framesToAnalyze.length > 5) {
            // Send only the first 5 frames to avoid large payloads
            const truncatedFrames = framesToAnalyze.slice(0, 5);
            console.log(`Limiting to ${truncatedFrames.length} frames due to payload size constraints`);
            result = await this.model.generateContent([prompt, ...truncatedFrames]);
          } else {
            result = await this.model.generateContent([prompt, ...framesToAnalyze]);
          }
        } else {
          console.log("Analyzing with video URL only");
          result = await this.model.generateContent(prompt + " " + videoUrl);
        }
      } catch (apiError) {
        console.error("API call error:", apiError);
        return getFallbackTrendData(contentType);
      }
      
      return this.parseAnalysisResponse(result, contentType);
    } catch (error) {
      console.error("Error analyzing video:", error);
      return getFallbackTrendData(contentType);
    }
  }

  private buildPromptForContentType(videoUrl: string, contentType: string): string {
    let prompt = `Analyze this video content and identify current trends, hashtags, and categories.`;
    
    // Customize prompt based on content type
    if (contentType) {
      prompt += ` This is ${contentType} content. `;
      
      if (contentType.includes('Skits') || contentType.includes('Comedy')) {
        prompt += `Analyze for comedy timing, punchline strength, and viewer retention patterns.`;
      } else if (contentType.includes('Reaction')) {
        prompt += `Evaluate authenticity of reactions, emotional triggers, and audience connection.`;
      } else if (contentType.includes('Challenge')) {
        prompt += `Assess participation potential, virality factors, and community engagement elements.`;
      } else if (contentType.includes('Storytelling') || contentType.includes('Storytime')) {
        prompt += `Analyze narrative structure, emotional arc, and story engagement metrics.`;
      } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
        prompt += `Evaluate clarity, step presentation, and learning value proposition.`;
      } else if (contentType.includes('Review')) {
        prompt += `Analyze authenticity, trustworthiness signals, and value-addition metrics.`;
      }
    }
    
    prompt += ` Format response as JSON with these exact keys: trendScore, trendingHashtags, categories, trendOpportunities.`;
    
    return prompt;
  }

  private parseAnalysisResponse(result: any, contentType: string): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    try {
      const responseText = result?.response?.text?.() || '';
      if (!responseText) {
        console.warn("Empty response from API");
        return getFallbackTrendData(contentType);
      }
      
      console.log("Raw API response:", responseText);
      const analysis = JSON.parse(responseText);
      
      return {
        trendScore: analysis.trendScore || 75,
        trendingHashtags: analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
        categories: analysis.categories || ['Entertainment', 'Social Media'],
        trendOpportunities: analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts']
      };
    } catch (parseError) {
      console.error("Error parsing trend analysis response:", parseError);
      return getFallbackTrendData(contentType);
    }
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
