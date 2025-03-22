
import { BaseAgent, ModelType } from '../AgentTypes';
import { genAI } from '../../../lib/genai';

export interface IContentSimilarityAgent extends BaseAgent {
  type: 'content-similarity';
  compareContent(videoData: any): Promise<{
    conceptSimilarity: number;
    executionSimilarity: number;
    similarVideos: Array<{
      id: string;
      similarity: number;
      strengths: string[];
    }>;
  }>;
}

export class ContentSimilarityAgent implements IContentSimilarityAgent {
  type: 'content-similarity' = 'content-similarity';
  modelType: ModelType = 'embedding';
  private model = genAI.getGenerativeModel({ model: 'embedding-001' });

  async analyze(data: any): Promise<any> {
    return this.compareContent(data);
  }

  async compareContent(videoData: any) {
    const { frames, technical, concept } = videoData;
    
    try {
      // Generate embeddings for video frames
      const frameEmbeddings = await Promise.all(
        frames.map(frame => this.model.embedContent(frame))
      );

      // Calculate visual similarity score
      const visualSimilarity = this.calculateVisualSimilarity(frameEmbeddings);
      
      // Calculate execution similarity based on technical metrics
      const executionSimilarity = this.calculateExecutionSimilarity(technical);

      // Find similar videos using embeddings comparison
      const similarVideos = await this.findSimilarVideos(frameEmbeddings, concept);

      return {
        conceptSimilarity: visualSimilarity,
        executionSimilarity,
        similarVideos
      };
    } catch (error) {
      console.error("Content similarity analysis failed:", error);
      throw error;
    }
  }

  private calculateVisualSimilarity(embeddings: any[]): number {
    if (!embeddings.length) return 0;
    // Calculate cosine similarity between frame embeddings
    return embeddings.reduce((acc, curr) => acc + curr.values[0], 0) / embeddings.length;
  }

  private calculateExecutionSimilarity(technical: any): number {
    if (!technical) return 0;
    const {
      videoQuality = 0,
      audioQuality = 0,
      pacing = 0,
      hook_strength = 0
    } = technical;

    return (videoQuality + audioQuality + pacing + hook_strength) / 40;
  }

  private async findSimilarVideos(embeddings: any[], concept: any) {
    // In a real implementation, this would query a database of video embeddings
    return [{
      id: `vid_${Date.now()}`,
      similarity: this.calculateVisualSimilarity(embeddings),
      strengths: [
        concept?.strengths?.[0] || 'Visual composition',
        concept?.strengths?.[1] || 'Audio quality',
        concept?.strengths?.[2] || 'Editing pace'
      ]
    }];
  }
}
