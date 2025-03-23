
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export class TrendAgent implements TrendAnalysisAgent {
  type: 'trend' = 'trend';
  modelType: ModelType = 'gemini-1.5-pro';
  private model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  async analyze(data: any): Promise<any> {
    if (typeof data === 'string') {
      return this.analyzeTrends(data);
    }
    return this.analyzeTrends(data.videoUrl, data);
  }
  
  // Implementation that matches the interface in TrendAnalysisAgent
  async analyzeTrends(videoUrl: string): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
  
  // Overloaded implementation that accepts the richer data object
  async analyzeTrends(videoUrl: string, contextData?: { 
    metadata?: any; 
    frames?: string[] 
  }): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
  
  // Actual implementation that handles both signature variants
  async analyzeTrends(videoUrl: string, contextData?: any): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    try {
      const metadata = contextData?.metadata || {};
      const frames = contextData?.frames || [];
      
      // Extract content type from metadata to customize prompt
      const contentType = metadata?.content_type || '';
      
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

      // Sample frames if there are too many to avoid token limits (max ~20 frames)
      const framesToAnalyze = frames.length > 20 
        ? sampleFramesEvenly(frames, 20) 
        : frames;
      
      let result;
      
      try {
        // If we have frames, analyze with frames, otherwise fallback to URL only
        if (framesToAnalyze.length > 0) {
          console.log(`Analyzing with ${framesToAnalyze.length} frames`);
          
          // Check if API key is available
          const apiKey = Deno.env?.get('VITE_GEMINI_API_KEY') || '';
          if (!apiKey) {
            console.warn("No API key provided, using fallback trend data");
            return this.getFallbackTrendData(contentType);
          }
          
          result = await this.model.generateContent([prompt, ...framesToAnalyze.slice(0, 20)]);
        } else {
          console.log("Analyzing with video URL only");
          
          // Check if API key is available
          const apiKey = Deno.env?.get('VITE_GEMINI_API_KEY') || '';
          if (!apiKey) {
            console.warn("No API key provided, using fallback trend data");
            return this.getFallbackTrendData(contentType);
          }
          
          result = await this.model.generateContent(prompt + " " + videoUrl);
        }
      } catch (apiError) {
        console.error("API call error:", apiError);
        return this.getFallbackTrendData(contentType);
      }
      
      try {
        const responseText = result?.response?.text?.() || '';
        if (!responseText) {
          console.warn("Empty response from API");
          return this.getFallbackTrendData(contentType);
        }
        
        console.log("Raw API response:", responseText);
        const analysis = JSON.parse(responseText);
        
        // Add content-type specific hashtags
        const hashtagsWithContentType = this.enhanceHashtagsForContentType(
          analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          contentType
        );
        
        // Generate content-specific categories
        const enhancedCategories = this.enhanceCategoriesForContentType(
          analysis.categories || ['Entertainment', 'Social Media'],
          contentType
        );
        
        // Generate content-specific trend opportunities
        const enhancedOpportunities = this.enhanceTrendOpportunitiesForContentType(
          analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts'],
          contentType
        );
        
        return {
          trendScore: analysis.trendScore || this.calculateTrendScoreForContentType(contentType),
          trendingHashtags: hashtagsWithContentType,
          categories: enhancedCategories,
          trendOpportunities: enhancedOpportunities
        };
      } catch (parseError) {
        console.error("Error parsing trend analysis response:", parseError);
        return this.getFallbackTrendData(contentType);
      }
    } catch (error) {
      console.error("Error in trend analysis:", error);
      const contentType = typeof contextData === 'object' ? (contextData?.metadata?.content_type || '') : '';
      return this.getFallbackTrendData(contentType);
    }
  }

  private getFallbackTrendData(contentType: string = ''): {
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  } {
    // Base fallback data
    const baseData = {
      trendScore: 75,
      trendingHashtags: ['#viral', '#trending', '#foryou'],
      categories: ['Entertainment', 'Social Media'],
      trendOpportunities: ['Use trending audio', 'Add pattern interrupts', 'Include viral transitions']
    };
    
    // Enhance fallback data based on content type
    return {
      trendScore: this.calculateTrendScoreForContentType(contentType),
      trendingHashtags: this.enhanceHashtagsForContentType(baseData.trendingHashtags, contentType),
      categories: this.enhanceCategoriesForContentType(baseData.categories, contentType),
      trendOpportunities: this.enhanceTrendOpportunitiesForContentType(baseData.trendOpportunities, contentType)
    };
  }
  
  private calculateTrendScoreForContentType(contentType: string): number {
    const baseScore = 75;
    
    if (!contentType) return baseScore;
    
    // Adjust score based on content type and current trends
    if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
      return baseScore + 15; // Challenges tend to be highly trending
    } else if (contentType.includes('Skits') || contentType.includes('Funny')) {
      return baseScore + 10; // Comedy content performs well generally
    } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
      return baseScore + 5; // Educational content has steady performance
    } else if (contentType.includes('Reaction')) {
      return baseScore + 8; // Reaction videos have good engagement
    } else if (contentType.includes('Review')) {
      return baseScore + 3; // Reviews have moderate trend alignment
    }
    
    return baseScore;
  }
  
  private enhanceHashtagsForContentType(hashtags: string[], contentType: string): string[] {
    if (!contentType) return hashtags;
    
    const contentTypeSpecificHashtags: Record<string, string[]> = {
      'Skits': ['#comedy', '#funny', '#skit'],
      'Funny Skits': ['#comedy', '#funny', '#skit', '#humour'],
      'Reaction': ['#reaction', '#react', '#reacted'],
      'Challenge': ['#challenge', '#trending', '#fyp'],
      'Storytelling': ['#storytime', '#story', '#personal'],
      'Storytime': ['#storytime', '#story', '#personal'],
      'Tutorial': ['#tutorial', '#howto', '#learn'],
      'How-To': ['#howto', '#tutorial', '#diy'],
      'Review': ['#review', '#honest', '#opinion'],
      'Duets': ['#duet', '#collab', '#duo'],
      'POV Content': ['#pov', '#perspective', '#acting'],
      'Trend Jumps': ['#trend', '#challenge', '#newtrend']
    };
    
    // Find matching content types
    for (const [type, typeHashtags] of Object.entries(contentTypeSpecificHashtags)) {
      if (contentType.includes(type)) {
        // Combine default hashtags with content-specific ones
        const combined = [...hashtags, ...typeHashtags];
        // Remove duplicates and limit to 5 hashtags
        return Array.from(new Set(combined)).slice(0, 5);
      }
    }
    
    return hashtags;
  }
  
  private enhanceCategoriesForContentType(categories: string[], contentType: string): string[] {
    if (!contentType) return categories;
    
    const contentTypeCategories: Record<string, string[]> = {
      'Skits': ['Comedy', 'Entertainment', 'Humor'],
      'Funny Skits': ['Comedy', 'Entertainment', 'Humor'],
      'Reaction': ['Reactions', 'Commentary', 'Entertainment'],
      'Challenge': ['Challenges', 'Trends', 'Social Media'],
      'Storytelling': ['Storytelling', 'Personal', 'Lifestyle'],
      'Storytime': ['Storytelling', 'Personal', 'Lifestyle'],
      'Tutorial': ['Education', 'How-To', 'DIY'],
      'How-To': ['Education', 'How-To', 'DIY'],
      'Review': ['Reviews', 'Products', 'Opinion'],
      'Duets': ['Collaboration', 'Entertainment', 'Duets'],
      'POV Content': ['POV', 'Acting', 'Creative'],
      'Trend Jumps': ['Trends', 'Challenges', 'Viral Content']
    };
    
    // Find matching content types
    for (const [type, typeCategories] of Object.entries(contentTypeCategories)) {
      if (contentType.includes(type)) {
        // Combine default categories with content-specific ones, prioritizing specific
        return [...typeCategories, ...categories.filter(cat => !typeCategories.includes(cat))].slice(0, 3);
      }
    }
    
    return categories;
  }
  
  private enhanceTrendOpportunitiesForContentType(opportunities: string[], contentType: string): string[] {
    if (!contentType) return opportunities;
    
    const contentTypeOpportunities: Record<string, string[]> = {
      'Skits': [
        'Use comedy timing techniques with 1-second pauses before punchlines',
        'Add unexpected pattern interrupts at the 5-second mark',
        'Include reaction shots after key moments'
      ],
      'Funny Skits': [
        'Use comedy timing techniques with 1-second pauses before punchlines',
        'Add unexpected pattern interrupts at the 5-second mark',
        'Include reaction shots after key moments'
      ],
      'Reaction': [
        'Capture authentic initial reactions without cuts',
        'Use split screen techniques to show content and reaction simultaneously',
        'Add text overlays highlighting key emotional moments'
      ],
      'Challenge': [
        'Show the challenge result in the first 3 seconds',
        'Include slow-motion segments for impressive moments',
        'Add clear on-screen challenge instructions'
      ],
      'Storytelling': [
        'Start with the most emotional or surprising moment',
        'Use music that builds with the narrative arc',
        'Include text timestamps for story progression'
      ],
      'Storytime': [
        'Start with the most emotional or surprising moment',
        'Use music that builds with the narrative arc',
        'Include text timestamps for story progression'
      ],
      'Tutorial': [
        'Show the finished result in the first 2 seconds',
        'Use step-by-step text overlays with numbers',
        'Include close-up shots of detailed techniques'
      ],
      'How-To': [
        'Show the finished result in the first 2 seconds',
        'Use step-by-step text overlays with numbers',
        'Include close-up shots of detailed techniques'
      ],
      'Review': [
        'State clear rating in first 3 seconds',
        'Use before/after or comparison shots',
        'Include pros/cons text overlays'
      ],
      'Duets': [
        'Synchronize movements/reactions perfectly',
        'Use transitions that flow between both creators',
        'Leverage contrasting styles for maximum effect'
      ],
      'POV Content': [
        'Establish perspective clearly in first 2 seconds',
        'Use camera movements that enhance immersion',
        'Incorporate POV-specific text overlays'
      ],
      'Trend Jumps': [
        'Participate in trend within 24-48 hours of emergence',
        'Add unique personal twist to stand out',
        'Use trending sound/template exactly as popular version'
      ]
    };
    
    // Find matching content types
    for (const [type, typeOpportunities] of Object.entries(contentTypeOpportunities)) {
      if (contentType.includes(type)) {
        // Return content-specific opportunities, they're more valuable than generic ones
        return typeOpportunities;
      }
    }
    
    return opportunities;
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
