
export type AgentType = 'trend' | 'emotional' | 'technical' | 'virality' | 'benchmark';

export interface AgentConfig {
  type: AgentType;
  model: 'gemini-1.5-pro' | 'gemini-1.5-flash' | 'embedding';
  parallel: boolean;
}

export interface AnalysisTask {
  id: string;
  type: AgentType;
  status: 'pending' | 'processing' | 'completed';
  result: any;
}
