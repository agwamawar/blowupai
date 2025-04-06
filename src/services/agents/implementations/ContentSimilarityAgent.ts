
import { BaseAgent, ModelType } from '../AgentTypes';
import { initializeServiceAccounts } from '@/lib/serviceAccounts';

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
  private model: any;

  constructor() {
    const { vertexai } = initializeServiceAccounts();
    this.model = vertexai.preview.getGenerativeModel({ 
      model: 'embedding-001', 
      generationConfig: { temperature: 0 }
    });
  }

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
    
    // Calculate pairwise cosine similarity between frame embeddings
    let totalSimilarity = 0;
    for (let i = 0; i < embeddings.length; i++) {
      for (let j = i + 1; j < embeddings.length; j++) {
        const similarity = this.cosineSimilarity(
          embeddings[i].values,
          embeddings[j].values
        );
        totalSimilarity += similarity;
      }
    }
    
    const pairs = (embeddings.length * (embeddings.length - 1)) / 2;
    return pairs > 0 ? totalSimilarity / pairs : 0;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    const dotProduct = a.reduce((acc, val, i) => acc + val * b[i], 0);
    const normA = Math.sqrt(a.reduce((acc, val) => acc + val * val, 0));
    const normB = Math.sqrt(b.reduce((acc, val) => acc + val * val, 0));
    return dotProduct / (normA * normB);
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
