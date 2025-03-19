// Analysis result type for concept analysis
interface ConceptAnalysisResult {
  trendScore: number;
  emotionalScore: number;
  hookScore: number;
  uniquenessScore: number;
  totalScore: number;
}

import { BaseAgent } from './AgentTypes';
import { BenchmarkAgent } from './implementations/BenchmarkAgent';
import { TrendAnalysisAgent } from './implementations/TrendAnalysisAgent';
import { EmotionalAnalysisAgent } from './implementations/EmotionalAnalysisAgent';
import { RetentionAnalysisAgent } from './implementations/RetentionAnalysisAgent';
import { UniquenessAnalysisAgent } from './implementations/UniquenessAnalysisAgent';
import { TechnicalAgent } from './implementations/TechnicalAgent';
import { ViralityAgent } from './implementations/ViralityAgent';
import { VideoEditingAgent } from './implementations/VideoEditingAgent';
import { AudioAnalysisAgent } from './implementations/AudioAnalysisAgent';
import { FormatOptimizationAgent } from './implementations/FormatOptimizationAgent';
import { VideoMetadata } from '@/types/analysisTypes';

export class AgentOrchestrator {
  private agents: Map<string, BaseAgent> = new Map();
  private cache: Map<string, any> = new Map();

  constructor() {
    this.initializeAgents();
  }

  private initializeAgents() {
    // Core analysis agents
    this.agents.set('trend', new TrendAnalysisAgent());
    this.agents.set('emotional', new EmotionalAnalysisAgent());
    this.agents.set('retention', new RetentionAnalysisAgent());
    this.agents.set('uniqueness', new UniquenessAnalysisAgent());

    // Supporting agents
    this.agents.set('technical', new TechnicalAgent());
    this.agents.set('virality', new ViralityAgent());
    this.agents.set('benchmark', new BenchmarkAgent());
  }

  private async analyzeConceptScore(videoUrl: string): Promise<ConceptAnalysisResult> {
    const [trendAnalysis, emotionalAnalysis, retentionAnalysis, uniquenessAnalysis] = await Promise.all([
      this.agents.get('trend')?.analyze(videoUrl),
      this.agents.get('emotional')?.analyze(videoUrl),
      this.agents.get('retention')?.analyze(videoUrl),
      this.agents.get('uniqueness')?.analyze({ videoUrl })
    ]);

    const weights = {
      trend: 0.15,
      emotional: 0.20,
      hook: 0.20,
      uniqueness: 0.15
    };

    return {
      trendScore: trendAnalysis.score * weights.trend,
      emotionalScore: emotionalAnalysis.score * weights.emotional,
      hookScore: retentionAnalysis.score * weights.hook,
      uniquenessScore: uniquenessAnalysis.score * weights.uniqueness,
      totalScore: (
        trendAnalysis.score * weights.trend +
        emotionalAnalysis.score * weights.emotional +
        retentionAnalysis.score * weights.hook +
        uniquenessAnalysis.score * weights.uniqueness
      )
    };
  }

  async analyzeVideo(videoUrl: string, metadata: VideoMetadata) {
    const cacheKey = `${videoUrl}_${JSON.stringify(metadata)}`;
    if (this.cache.has(cacheKey)) {
      return this.cache.get(cacheKey);
    }

    // Execute parallel analysis tasks
    const conceptAnalysis = await this.analyzeConceptScore(videoUrl);

    const technicalAnalysis = await this.agents.get('technical')?.analyze(videoUrl);


    // Generate embeddings for benchmarking
    const benchmarkAgent = this.agents.get('benchmark') as BenchmarkAgent;
    const embeddings = await benchmarkAgent.generateEmbeddings(JSON.stringify({ conceptAnalysis, technicalAnalysis }));

    // Calculate virality score and find similar content in parallel
    const [viralityScore, similarContent] = await Promise.all([
      this.agents.get('virality')?.analyze({ conceptAnalysis, technicalAnalysis }),
      benchmarkAgent.findSimilarContent(embeddings)
    ]);

    const result = this.aggregateResults({
      conceptAnalysis,
      technicalAnalysis,
      viralityScore,
      similarContent
    });

    this.cache.set(cacheKey, result);
    return result;
  }

  private aggregateResults(results: any) {
    return {
      analysis_version: "3.0", //Updated version number
      timestamp: new Date().toISOString(),
      results
    };
  }
}