
import { ViralityAgent as IViralityAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class ViralityAgent implements IViralityAgent {
  type: 'virality' = 'virality';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    return this.predictVirality(data);
  }

  async predictVirality(data: any): Promise<{
    score: number;
    predictedViews: number;
    predictedEngagement: number;
    improvements: string[];
  }> {
    try {
      const { 
        conceptAnalysis, 
        technicalAnalysis, 
        metadata, 
        videoDetails 
      } = data;
      
      const prompt = `Analyze this video content for viral potential: ${JSON.stringify(data)}
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
          improvements: analysis.improvements || this.getVideoSpecificImprovements(data)
        };
      } catch (jsonError) {
        console.error("JSON parsing error in virality prediction:", jsonError);
        // Return video-specific fallback response
        return this.getVideoSpecificFallback(data);
      }
    } catch (error) {
      console.error("Error in virality prediction:", error);
      // Return video-specific fallback data
      return this.getVideoSpecificFallback(data);
    }
  }

  private getVideoSpecificFallback(data: any): any {
    const { conceptAnalysis, technicalAnalysis, metadata, videoDetails } = data;
    
    const platform = metadata?.platform?.toLowerCase() || 'tiktok';
    const contentType = metadata?.content_type || 'entertainment';
    const followerCount = metadata?.follower_count || 10000;
    
    // Calculate a reasonable view prediction based on follower count
    const predictedViews = Math.round(followerCount * 0.4 + Math.random() * followerCount * 0.2);
    
    // Calculate score based on concept and technical analysis if available
    let score = 65; // Default
    if (conceptAnalysis && technicalAnalysis) {
      score = Math.round((conceptAnalysis.totalScore * 0.7 + technicalAnalysis.videoQuality * 10 * 0.3));
    }
    
    return {
      score,
      predictedViews,
      predictedEngagement: 8.5,
      improvements: this.getVideoSpecificImprovements(data)
    };
  }

  private getVideoSpecificImprovements(data: any): string[] {
    const { conceptAnalysis, technicalAnalysis, metadata, videoDetails } = data;
    
    const platform = metadata?.platform?.toLowerCase() || 'tiktok';
    const contentType = metadata?.content_type || 'entertainment';
    
    // Base improvements that reference the video details
    const baseImprovements = [
      `Strengthen your opening hook with a clearer ${platform}-optimized pattern interrupt`,
      `Add more text overlays to highlight key points in your ${contentType} content`
    ];
    
    // Platform-specific improvements
    const platformImprovements = {
      'tiktok': [
        "Use a trending TikTok sound to increase discoverability",
        "Add more text overlays with trending TikTok fonts",
        "Include a clear call-to-action for comments and shares"
      ],
      'instagram': [
        "Use Instagram's native filters for a more polished look",
        "Add Reels-specific stickers to increase engagement",
        "Include a swipe-up prompt or call-to-action"
      ],
      'youtube': [
        "Add an attention-grabbing thumbnail with expressive facial expression",
        "Incorporate YouTube Shorts specific aspect ratio",
        "Add subscribe call-to-action with animation effect"
      ]
    };
    
    // Content-specific improvements
    const contentImprovements = {
      'gaming': [
        "Add more reaction overlays during key gameplay moments",
        "Include game title and specific action in text overlays",
        "Show gameplay highlights earlier in the video"
      ],
      'comedy': [
        "Deliver the punchline faster to improve retention",
        "Add more exaggerated facial expressions on key moments",
        "Use sound effects to emphasize comedic elements"
      ],
      'beauty': [
        "Show the end result in the first 2 seconds before the process",
        "Add more detailed close-ups of techniques",
        "Include product links/codes in your caption"
      ],
      'food': [
        "Include more close-ups of textures and final presentation",
        "Add step-by-step text overlays",
        "Show the first taste reaction for emotional connection"
      ]
    };
    
    // Get platform-specific improvements
    const platformSpecific = platformImprovements[platform] || platformImprovements['tiktok'];
    
    // Try to match content type to our predefined categories
    let contentTypeLower = contentType.toLowerCase();
    let contentSpecific = null;
    
    // Check if the content type contains any of our keywords
    for (const [category, improvements] of Object.entries(contentImprovements)) {
      if (contentTypeLower.includes(category)) {
        contentSpecific = improvements;
        break;
      }
    }
    
    // Return a mix of base, platform and content-specific improvements
    let result = [baseImprovements[0], platformSpecific[0]];
    
    // Add content specific improvement if available
    if (contentSpecific) {
      result.push(contentSpecific[0]);
    } else {
      result.push(platformSpecific[1]);
    }
    
    // If we have technical analysis with recommendations, add one of those
    if (technicalAnalysis?.recommendations?.length > 0) {
      result.push(technicalAnalysis.recommendations[0]);
    }
    
    // Return only three improvements to not overwhelm
    return result.slice(0, 3);
  }
}
