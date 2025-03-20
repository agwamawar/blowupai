import { AgentOrchestrator } from './agents/AgentOrchestrator';

const orchestrator = new AgentOrchestrator();

export const getVideoUrl = async (file: File): Promise<string> => {
  return URL.createObjectURL(file);
};

export const analysisStages = [
  'Analyzing video content...',
  'Evaluating performance metrics...',
  'Generating recommendations...',
  'Finalizing analysis...'
];