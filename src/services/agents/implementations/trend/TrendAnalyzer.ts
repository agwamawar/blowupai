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

          const batchResult = await this.model.generateContent([
            "Analyze these video frames for trends:",
            ...batch
          ]);
          results.push(batchResult);
        }

        const result = await this.model.generateContent([
          prompt,
          videoUrl,
          JSON.stringify(results)
        ]);

        const analysis = await this.parseAnalysisResponse(result, contentType);
        this.cache.set(cacheKey, analysis);
        return analysis;
      } catch (error) {
        console.log("Falling back to URL-only analysis");
        const result = await this.model.generateContent(prompt + " " + videoUrl);
        return this.parseAnalysisResponse(result, contentType);
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