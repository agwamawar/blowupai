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
      
      // Extract content type from metadata
      const contentType = metadata?.content_type || [];
      const contentTypeString = Array.isArray(contentType) ? contentType.join(', ') : contentType;
      
      const prompt = `Analyze this video content for viral potential: ${JSON.stringify(data)}
      Consider:
      - Engagement potential
      - Share-worthiness
      - Trending topic alignment
      - Hook strength
      ${contentTypeString ? `- Content type specific factors: ${contentTypeString}` : ''}
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
        
        // Apply content-type specific adjustments to the score
        const adjustedScore = this.adjustScoreByContentType(
          analysis.score || 65, 
          contentTypeString
        );
        
        return {
          score: adjustedScore,
          predictedViews: analysis.predictedViews || this.predictViewsByContentType(contentTypeString, data),
          predictedEngagement: analysis.predictedEngagement || this.predictEngagementByContentType(contentTypeString),
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

  private adjustScoreByContentType(baseScore: number, contentType: string): number {
    if (!contentType) return baseScore;
    
    // Content type specific adjustments based on current platform trends
    if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
      return Math.min(baseScore + 15, 100); // Challenges have high virality potential
    } else if (contentType.includes('Reaction')) {
      return Math.min(baseScore + 10, 100); // Reaction videos do well for engagement
    } else if (contentType.includes('Skits') || contentType.includes('Comedy')) {
      return Math.min(baseScore + 8, 100); // Comedy content has good sharing potential
    } else if (contentType.includes('How-To') || contentType.includes('Tutorial')) {
      return Math.min(baseScore + 5, 100); // How-to content has steady performance
    } else if (contentType.includes('Storytime') || contentType.includes('Storytelling')) {
      return Math.min(baseScore + 7, 100); // Stories can create emotional connection
    }
    
    return baseScore;
  }
  
  private predictViewsByContentType(contentType: string, data: any): number {
    // Base prediction factors
    const followerCount = data.metadata?.follower_count || 10000;
    const basePrediction = followerCount * 0.2;
    
    // Content type specific multipliers
    let multiplier = 1;
    
    if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
      multiplier = 2.5; // Challenges can reach wider audience
    } else if (contentType.includes('Reaction')) {
      multiplier = 1.8; // Reactions have good discovery
    } else if (contentType.includes('Comedy') || contentType.includes('Skits')) {
      multiplier = 2.0; // Comedy has high sharing potential
    } else if (contentType.includes('Review')) {
      multiplier = 1.2; // Reviews have niche but dedicated audiences
    } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
      multiplier = 1.4; // Tutorials have long-term discovery
    }
    
    return Math.round(basePrediction * multiplier);
  }
  
  private predictEngagementByContentType(contentType: string): number {
    // Base engagement rate
    let baseEngagement = 8.5;
    
    // Content type specific adjustments
    if (contentType.includes('Reaction')) {
      baseEngagement = 12.3; // Reactions drive comments and discussion
    } else if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
      baseEngagement = 10.8; // Challenges get participation engagement
    } else if (contentType.includes('Controversial') || contentType.includes('Opinion')) {
      baseEngagement = 14.5; // Controversial content drives debate
    } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
      baseEngagement = 7.2; // Tutorials get saved but less commented on
    }
    
    return baseEngagement;
  }

  private getVideoSpecificFallback(data: any): any {
    const { conceptAnalysis, technicalAnalysis, metadata, videoDetails } = data;
    
    const platform = metadata?.platform?.toLowerCase() || 'tiktok';
    const contentType = metadata?.content_type || 'entertainment';
    const followerCount = metadata?.follower_count || 10000;
    
    // Calculate adjustments based on content type
    const contentTypeString = Array.isArray(contentType) ? contentType.join(', ') : contentType;
    
    // Calculate a reasonable view prediction based on follower count and content type
    const predictedViews = this.predictViewsByContentType(contentTypeString, data);
    
    // Calculate score based on concept, technical analysis, and content type
    let score = 65; // Default
    if (conceptAnalysis && technicalAnalysis) {
      score = Math.round((conceptAnalysis.totalScore * 0.7 + technicalAnalysis.videoQuality * 10 * 0.3));
      score = this.adjustScoreByContentType(score, contentTypeString);
    }
    
    return {
      score,
      predictedViews,
      predictedEngagement: this.predictEngagementByContentType(contentTypeString),
      improvements: this.getVideoSpecificImprovements(data)
    };
  }

  private async predictViralityMetrics(data: any) {
    const { frames, technical, metadata, conceptAnalysis } = data;
    
    // Analyze visual hooks from frames
    const frameAnalysis = await Promise.all(frames.slice(0, 3).map(async frame => {
      const result = await this.model.generateContent([
        "Analyze this frame for hook strength and viral potential.",
        frame
      ]);
      return JSON.parse((await result.response).text());
    }));

    // Calculate hook strength from first 3 frames
    const hookStrength = frameAnalysis.reduce((acc, curr) => 
      acc + (curr.hookStrength || 0), 0) / frameAnalysis.length;
    
    // Extract audio metrics
    const audioFeatures = technical?.audioFeatures || {};
    const audioQuality = (audioFeatures.clarity || 0) + (audioFeatures.balance || 0) / 20;
    const pacing = this.calculateVideoPacing(frameAnalysis, audioFeatures);
    const trending = conceptAnalysis?.trend_match || 0;
    
    // Weight different aspects of the content
    const weightedScore = 
      (hookStrength * 0.3) +
      (pacing * 0.2) +
      (audioQuality * 0.2) +
      (trending * 0.3);
    
    // Predict views based on historical performance data
    const predictedViews = Math.floor(
      Math.pow(10, 3 + (weightedScore / 20))
    );
    
    // Calculate engagement rate based on content type
    const baseEngagement = metadata?.content_type === 'entertainment' ? 0.15 : 0.08;
    const predictedEngagement = baseEngagement * (1 + (weightedScore / 100));
    
    return {
      score: Math.min(Math.round(weightedScore * 10), 100),
      predictedViews,
      predictedEngagement: Math.round(predictedEngagement * 100) / 100
    };
  }

  private calculateVideoPacing(frameAnalysis: any[], audioFeatures: any): number {
    // Default pacing score if we don't have enough data
    if (!frameAnalysis || frameAnalysis.length < 2) return 0.6;
    
    // Check for visual transitions between frames
    const visualChanges = frameAnalysis.slice(1).reduce((changes, frame, index) => {
      // Compare with previous frame
      const prevFrame = frameAnalysis[index];
      const compositionalChange = frame.composition !== prevFrame.composition ? 0.2 : 0;
      const colorChange = frame.dominantColors !== prevFrame.dominantColors ? 0.15 : 0;
      const subjectChange = frame.subjects !== prevFrame.subjects ? 0.25 : 0;
      
      return changes + compositionalChange + colorChange + subjectChange;
    }, 0);
    
    // Calculate audio pacing contribution
    const audioPacing = audioFeatures?.tempo ? (audioFeatures.tempo / 10) : 0.5;
    
    // Combine visual and audio pacing factors
    return Math.min((visualChanges * 0.7) + (audioPacing * 0.3) + 0.3, 1);
  }

  private getVideoSpecificImprovements(data: any): string[] {
    const { conceptAnalysis, technicalAnalysis, metadata } = data;
    
    const platform = metadata?.platform?.toLowerCase() || 'tiktok';
    const contentType = metadata?.content_type || [];
    const contentTypeString = Array.isArray(contentType) ? contentType.join(', ') : contentType;
    
    // Analyze specific weaknesses
    const improvements: string[] = [];
    
    if (technicalAnalysis?.hook_strength < 7) {
      improvements.push(`Strengthen your opening hook with a clearer ${platform}-optimized pattern interrupt`);
    }
    
    if (technicalAnalysis?.text_overlay_count < 3) {
      improvements.push(`Add more text overlays to highlight key points in your ${contentTypeString} content`);
    }
    
    // Content-specific improvements
    const contentImprovements = this.getContentTypeSpecificImprovements(contentTypeString);
    
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
    
    // Get platform-specific improvements
    const platformSpecific = platformImprovements[platform] || platformImprovements['tiktok'];
    
    // Return a mix of content-specific and platform-specific improvements
    let result = [];
    
    // First prioritize content-specific improvements
    if (contentImprovements.length > 0) {
      result.push(contentImprovements[0]);
      
      // If we have more than one content improvement, add another
      if (contentImprovements.length > 1) {
        result.push(contentImprovements[1]);
      } else {
        result.push(platformSpecific[0]);
      }
    } else {
      // Add platform-specific improvements if no content-specific ones
      result.push(platformSpecific[0]);
      result.push(platformSpecific[1]);
    }
    
    // If we have technical analysis with recommendations, add one of those
    if (technicalAnalysis?.recommendations?.length > 0) {
      result.push(technicalAnalysis.recommendations[0]);
    } else if (improvements.length > 0) {
      // Otherwise add from our general improvements
      result.push(improvements[0]);
    } else if (platformSpecific.length > 2) {
      // Or add another platform-specific one
      result.push(platformSpecific[2]);
    }
    
    // Return only three improvements to not overwhelm
    return result.slice(0, 3);
  }
  
  private getContentTypeSpecificImprovements(contentType: string): string[] {
    if (!contentType) return [];
    
    const contentImprovements: Record<string, string[]> = {
      'Skits': [
        "Add a stronger punchline in the first 7 seconds",
        "Include quick zoom transitions for comedy emphasis",
        "Show reaction shots after key punchlines"
      ],
      'Comedy': [
        "Deliver the punchline faster to improve retention",
        "Add more exaggerated facial expressions on key moments",
        "Use sound effects to emphasize comedic elements"
      ],
      'Reaction': [
        "Show your authentic initial reaction without cuts",
        "Add picture-in-picture to show content and reaction simultaneously",
        "Include more emotional variations in your reactions (surprise, shock, laughter)"
      ],
      'Challenge': [
        "Show the end result of the challenge in first 2 seconds",
        "Add on-screen challenge instructions with trending hashtag",
        "Include slow-motion for the most impressive moment"
      ],
      'Storytelling': [
        "Start with the most dramatic moment of your story first",
        "Add timestamps or chapter markers for longer narratives",
        "Use emotional music that builds with your story arc"
      ],
      'Tutorial': [
        "Show the finished result in the first 2 seconds before steps",
        "Add numbered step indicators as text overlays",
        "Use close-ups for detailed techniques with proper lighting"
      ],
      'How-To': [
        "Include a materials/ingredients list as text overlay",
        "Break complex steps into clearly numbered sequences",
        "Add satisfying close-up of the final result"
      ],
      'Review': [
        "State your rating in the first 3 seconds",
        "Use clear before/after comparisons or demonstrations",
        "Include pros/cons lists as text overlays"
      ],
      'Duets': [
        "Ensure perfect synchronization with the original content",
        "Add your own text overlays that complement the original",
        "Use contrasting actions/reactions to create visual interest"
      ],
      'POV': [
        "Establish the perspective clearly in first 2 seconds",
        "Use camera movements that enhance the immersive effect",
        "Add context-setting text overlay at the beginning"
      ],
      'Trends': [
        "Join trend within first 48 hours of emergence",
        "Use the exact trending sound/template but add unique twist",
        "Include trending hashtags in both video and description"
      ]
    };
    
    // Check if the content type matches any of our predefined categories
    for (const [category, improvements] of Object.entries(contentImprovements)) {
      if (contentType.includes(category)) {
        return improvements;
      }
    }
    
    return [];
  }
}
