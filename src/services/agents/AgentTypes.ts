
import { VideoMetadata } from '@/types/analysisTypes';

export type ModelType = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'embedding';

export interface BaseAgent {
  analyze(data: any): Promise<any>;
  modelType: ModelType;
}

export interface TrendAgent extends BaseAgent {
  type: 'trend';
  analyzeTrends(videoUrl: string): Promise<{
    trends: string[];
    categories: string[];
    adaptabilityScore: number;
  }>;
}

export interface EmotionalAgent extends BaseAgent {
  type: 'emotional';
  analyzeEmotionalImpact(videoUrl: string): Promise<{
    emotionalScore: number;
    hookStrength: number;
  }>;
}

export interface TechnicalAgent extends BaseAgent {
  type: 'technical';
  analyzeTechnicalQuality(videoUrl: string): Promise<{
    editingScore: number;
    soundQuality: number;
  }>;
}

export interface ViralityAgent extends BaseAgent {
  type: 'virality';
  predictVirality(analysisResults: any[]): Promise<{
    score: number;
    predictedViews: number;
    predictedEngagement: number;
  }>;
}

export interface BenchmarkAgent extends BaseAgent {
  type: 'benchmark';
  generateEmbeddings(content: string): Promise<number[]>;
  findSimilarContent(embeddings: number[]): Promise<any[]>;
}
