
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

export interface ConceptAnalysisResult {
  trendScore: number;
  emotionalScore: number;
  hookScore: number;
  uniquenessScore: number;
  totalScore: number;
}

export interface TrendAnalysisAgent extends BaseAgent {
  type: 'trend';
  analyzeTrends(videoUrl: string): Promise<{
    trendCategory: string;
    lifespan: string;
    adaptabilityScore: number;
    score: number;
  }>;
}

export interface EmotionalAnalysisAgent extends BaseAgent {
  type: 'emotional';
  analyzeEmotionalImpact(videoUrl: string): Promise<{
    primaryEmotion: string;
    intensity: number;
    psychologicalHooks: string[];
    score: number;
  }>;
}

export interface RetentionAnalysisAgent extends BaseAgent {
  type: 'retention';
  analyzeRetention(videoUrl: string): Promise<{
    hookStrength: number;
    retentionScore: number;
    dropOffPoints: string[];
    score: number;
  }>;
}

export interface UniquenessAnalysisAgent extends BaseAgent {
  type: 'uniqueness';
  analyzeUniqueness(videoData: any): Promise<{
    originalityScore: number;
    shareabilityScore: number;
    remixPotential: boolean;
    score: number;
  }>;
}

export interface ViralityAgent extends BaseAgent {
  type: 'virality';
  predictVirality(conceptAnalysis: ConceptAnalysisResult): Promise<{
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
