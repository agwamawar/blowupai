import { VideoMetadata } from '@/types/analysisTypes';
import { ModelType } from '../types/modelTypes';

export type ModelType = 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'embedding';

export interface BaseAgent {
  type: string;
  modelType: ModelType;
  analyze(data: any): Promise<any>;
}

export interface TrendAnalysisAgent extends BaseAgent {
  type: 'trend';
  analyzeTrends(videoUrl: string): Promise<{
    trendScore: number;
    trendingHashtags: string[];
    categories: string[];
    trendOpportunities: string[];
  }>;
}

export interface EmotionalAnalysisAgent extends BaseAgent {
  type: 'emotional';
  analyzeEmotional(videoUrl: string): Promise<{
    emotionalScore: number;
    emotionalTone: string;
    engagementPotential: number;
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

export interface VideoEditingAgent extends BaseAgent {
  type: 'video-editing';
  analyzeEditing(videoUrl: string): Promise<{
    editingScore: number;
    pacing: number;
    cutFrequency: number;
    overlayQuality: number;
    subtitleQuality: number;
    suggestions: string[];
  }>;
}

export interface AudioAnalysisAgent extends BaseAgent {
  type: 'audio';
  analyzeAudio(videoUrl: string): Promise<{
    audioScore: number;
    trendMatch: boolean;
    emotionalImpact: number;
    clarity: number;
    suggestions: string[];
  }>;
}

export interface FormatOptimizationAgent extends BaseAgent {
  type: 'format';
  analyzeFormat(videoUrl: string): Promise<{
    formatScore: number;
    aspectRatio: string;
    thumbnailAppeal: number;
    hashtagStrategy: string[];
    recommendations: string[];
  }>;
}

export interface ScoringAgent extends BaseAgent {
  type: 'scoring';
  calculateViralityScore(analysisData: any): Promise<{
    overallScore: number;
    categoryScores: Record<string, number>;
    confidence: number;
  }>;
}

export interface OptimizationAgent extends BaseAgent {
  type: 'optimization';
  generateImprovements(analysisData: any): Promise<{
    suggestions: string[];
    priorityLevel: number[];
    expectedImpact: number[];
  }>;
}

export interface ForecastingAgent extends BaseAgent {
  type: 'forecasting';
  predictMetrics(analysisData: any): Promise<{
    predictedViews: number;
    predictedLikes: number;
    predictedShares: number;
    predictedComments: number;
    confidenceInterval: number;
    timeframe: string;
  }>;
}

export interface BenchmarkAgent extends BaseAgent {
  type: 'benchmark';
  analyzeBenchmarks(videoData: any): Promise<{
    industryScore: number;
    competitorScores: number[];
    recommendations: string[];
    performance: Record<string, number>;
  }>;
}

export interface TechnicalAgent extends BaseAgent {
  type: 'technical';
  analyzeTechnical(videoUrl: string): Promise<{
    videoQuality: number;
    frameRate: number;
    stabilization: number;
    lighting: number;
    recommendations: string[];
  }>;
}

export interface ConceptAnalysisResult {
  trendScore: number;
  emotionalScore: number;
  hookScore: number;
  uniquenessScore: number;
  totalScore: number;
}