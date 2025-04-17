
export interface CompetitorBenchmarkInsight {
  label: string;
  value: number;
  icon: {
    type: string;
    color: string;
  };
  description: string;
  benchmarkValue: number;
}

export interface SimilarityIndex {
  conceptMatch: number;
  executionMatch: number;
}

export interface VideoStats {
  views: string;
  likes: string;
  shares?: string;
}

export interface SimilarVideo {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  videoUrl: string;
  platform: "TikTok" | "Instagram" | "YouTube" | string;
  stats: VideoStats;
  similarityReason: string;
  similarityScore: number;
}

export interface ComparativeData {
  similarityIndex?: SimilarityIndex;
  missingElements?: string[];
  uniqueStrengths?: string[];
  similarVideos?: SimilarVideo[];
}

export interface VideoMetadata {
  platform: string;
  contentType: string;
  duration: string;
  title?: string;
}
