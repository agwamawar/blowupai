
import { sampleFramesEvenly } from '../../../../utils/trendVideoUtils';
import { getFallbackTrendData } from '../../../../utils/trendVideoUtils';

export class TrendAnalyzer {
  private model: any;
  private accessToken?: string;
  private cache = new Map();
  private batchSize = 5;

  constructor(model: any, accessToken?: string) {
    this.model = model;
    this.accessToken = accessToken;
  }

  async analyze(videoUrl: string, contentType: string, frames: string[]): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }> {
    // If the model is null or undefined, immediately return fallback data
    if (!this.model) {
      console.log("Model unavailable, using fallback trend data");
      return getFallbackTrendData(contentType);
    }
    
    const prompt = this.buildPromptForContentType(videoUrl, contentType);

    try {
      const cacheKey = `${videoUrl}-${contentType}`;
      if (this.cache.has(cacheKey)) {
        return this.cache.get(cacheKey);
      }

      const framesToAnalyze = frames.length > 20 
        ? sampleFramesEvenly(frames, 20) 
        : frames;

      let results = [];

      try {
        for (let i = 0; i < framesToAnalyze.length; i += this.batchSize) {
          const batch = framesToAnalyze.slice(i, i + this.batchSize);
          console.log(`Processing batch ${i / this.batchSize + 1}`);

          try {
            const batchResult = await this.model.generateContent([
              "Analyze these video frames for trends:",
              ...batch
            ]);
            results.push(batchResult);
          } catch (batchError) {
            console.warn(`Error processing batch ${i / this.batchSize + 1}:`, batchError);
            // Continue with remaining batches
          }
        }

        // If we have no results at all, try a simpler analysis
        if (results.length === 0) {
          console.log("Falling back to URL-only analysis");
          try {
            const result = await this.model.generateContent(prompt + " " + videoUrl);
            return this.parseAnalysisResponse(result, contentType);
          } catch (error) {
            console.error("URL-only analysis failed:", error);
            return getFallbackTrendData(contentType);
          }
        }

        // Analyze with whatever results we've collected
        try {
          const result = await this.model.generateContent([
            prompt,
            videoUrl,
            JSON.stringify(results)
          ]);
          
          const analysis = await this.parseAnalysisResponse(result, contentType);
          this.cache.set(cacheKey, analysis);
          return analysis;
        } catch (error) {
          console.error("Final analysis generation failed:", error);
          return getFallbackTrendData(contentType);
        }
      } catch (error) {
        console.log("Falling back to URL-only analysis after batch processing error");
        try {
          const result = await this.model.generateContent(prompt + " " + videoUrl);
          return this.parseAnalysisResponse(result, contentType);
        } catch (fallbackError) {
          console.error("Fallback analysis failed:", fallbackError);
          return getFallbackTrendData(contentType);
        }
      }
    } catch (error) {
      console.error("Error analyzing video:", error);
      return getFallbackTrendData(contentType);
    }
  }

  private buildPromptForContentType(videoUrl: string, contentType: string): string {
    let prompt = `Analyze this video content and identify current trends, hashtags, and categories.`;

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
      // Check if result or response is undefined
      if (!result || !result.response) {
        console.warn("Empty API response");
        return getFallbackTrendData(contentType);
      }
      
      let responseText;
      try {
        responseText = result.response.text?.() || result.response.candidates?.[0]?.content?.parts?.[0]?.text || '';
      } catch (textError) {
        console.warn("Error extracting text from response:", textError);
        responseText = '';
      }
      
      if (!responseText) {
        console.warn("Empty response text from API");
        return getFallbackTrendData(contentType);
      }

      console.log("Raw API response:", responseText);
      
      try {
        const analysis = JSON.parse(responseText);
        
        return {
          trendScore: analysis.trendScore || 75,
          trendingHashtags: analysis.trendingHashtags || ['#viral', '#trending', '#foryou'],
          categories: analysis.categories || ['Entertainment', 'Social Media'],
          trendOpportunities: analysis.trendOpportunities || ['Use trending audio', 'Add pattern interrupts']
        };
      } catch (jsonError) {
        console.error("Error parsing trend analysis JSON:", jsonError, "Raw text:", responseText);
        
        // Try to extract data with regex as a last resort
        const extractedData = this.extractDataWithRegex(responseText);
        if (extractedData) {
          return extractedData;
        }
        
        return getFallbackTrendData(contentType);
      }
    } catch (parseError) {
      console.error("Error parsing trend analysis response:", parseError);
      return getFallbackTrendData(contentType);
    }
  }
  
  // Helper method to try to extract data from non-JSON responses
  private extractDataWithRegex(text: string): any {
    try {
      // Try to find trend score
      const trendScoreMatch = text.match(/trend\s*score\s*[:\-=]\s*(\d+)/i);
      const trendScore = trendScoreMatch ? parseInt(trendScoreMatch[1]) : 75;
      
      // Try to find hashtags (patterns like #something)
      const hashtagMatches = text.match(/#[a-zA-Z0-9_]+/g) || [];
      const trendingHashtags = hashtagMatches.length > 0 ? hashtagMatches : ['#viral', '#trending', '#foryou'];
      
      // Default categories and opportunities
      const categories = ['Entertainment', 'Social Media'];
      const trendOpportunities = ['Use trending audio', 'Add pattern interrupts'];
      
      return {
        trendScore,
        trendingHashtags,
        categories,
        trendOpportunities
      };
    } catch (error) {
      console.error("Regex extraction failed:", error);
      return null;
    }
  }
}
