
import { ViralityAgent as IViralityAgent, ModelType } from '../AgentTypes';
import { initializeServiceAccounts } from '../../../lib/serviceAccounts';
import { 
  adjustScoreByContentType,
  predictViewsByContentType,
  predictEngagementByContentType
} from '../utils/contentTypeUtils';
import { getVideoSpecificImprovements } from '../utils/improvementUtils';
import { getFallbackViralityMetrics } from '../utils/viralityMetricsUtils';

export class ViralityAgent implements IViralityAgent {
  type: 'virality' = 'virality';
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
      const rawText = response.candidates[0].content.parts[0].text;

      try {
        const analysis = JSON.parse(rawText);
        
        // Apply content-type specific adjustments to the score
        const adjustedScore = adjustScoreByContentType(
          analysis.score || 65, 
          contentTypeString
        );
        
        return {
          score: adjustedScore,
          predictedViews: analysis.predictedViews || predictViewsByContentType(contentTypeString, data),
          predictedEngagement: analysis.predictedEngagement || predictEngagementByContentType(contentTypeString),
          improvements: analysis.improvements || getVideoSpecificImprovements(data)
        };
      } catch (jsonError) {
        console.error("JSON parsing error in virality prediction:", jsonError);
        // Return video-specific fallback response
        return getFallbackViralityMetrics(data);
      }
    } catch (error) {
      console.error("Error in virality prediction:", error);
      // Return video-specific fallback data
      return getFallbackViralityMetrics(data);
    }
  }
}
