
import { TrendAnalysisAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';
import { 
  calculateTrendScoreForContentType,
  enhanceHashtagsForContentType,
  enhanceCategoriesForContentType,
  enhanceTrendOpportunitiesForContentType
} from '../../../utils/trendContentUtils';
import { sampleFramesEvenly, getFallbackTrendData } from '../../../utils/trendVideoUtils';

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
      
      // Check if API key is available before attempting API call
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
      if (!apiKey) {
        console.warn("No Gemini API key found. Using fallback trend data instead of making API calls.");
        return getFallbackTrendData(contentType);
      }
      
      let result;
      
      try {
        // If we have frames, analyze with frames, otherwise fallback to URL only
        if (framesToAnalyze.length > 0) {
          console.log(`Analyzing with ${framesToAnalyze.length} frames`);
          result = await this.model.generateContent([prompt, ...framesToAnalyze.slice(0, 20)]);
        } else {
          console.log("Analyzing with video URL only");
          result = await this.model.generateContent(prompt + " " + videoUrl);
        }
      } catch (apiError) {
        console.error("API call error:", apiError);
        return getFallbackTrendData(contentType);
      }
      
      try {
        const responseText = result?.response?.text?.() || '';
        if (!responseText) {
          console.warn("Empty response from API");
          return getFallbackTrendData(contentType);
        }
        
        console.log("Raw API response:", responseText);
        const analysis = JSON.parse(responseText);
        
        // Add content-type specific hashtags
        const hashtagsWithContentType = enhanceHashtagsForContentType(
          analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          contentType
        );
        
        // Generate content-specific categories
        const enhancedCategories = enhanceCategoriesForContentType(
          analysis.categories || ['Entertainment', 'Social Media'],
          contentType
        );
        
        // Generate content-specific trend opportunities
        const enhancedOpportunities = enhanceTrendOpportunitiesForContentType(
          analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts'],
          contentType
        );
        
        return {
          trendScore: analysis.trendScore || calculateTrendScoreForContentType(contentType),
          trendingHashtags: hashtagsWithContentType,
          categories: enhancedCategories,
          trendOpportunities: enhancedOpportunities
        };
      } catch (parseError) {
        console.error("Error parsing trend analysis response:", parseError);
        return getFallbackTrendData(contentType);
      }
    } catch (error) {
      console.error("Error in trend analysis:", error);
      const contentType = typeof contextData === 'object' ? (contextData?.metadata?.content_type || '') : '';
      return getFallbackTrendData(contentType);
    }
  }
}
