
import { ReactNode } from "react";

export interface VideoMetadataType {
  title: string;
  duration: string;
  resolution: string;
  uploadTime: string;
  platform: string;
  category: string;
}

export interface ContentDetailsType {
  detectedObjects: string[];
  sceneTransitions: string;
  detectedText: string[];
  mainThemes: string[];
  contentType: string;
}

export interface BestSegmentType {
  timestamp: string;
  reason: string;
}

export interface ContentInsightType {
  label: string;
  value: number;
  icon: ReactNode;
  description: string;
}

export interface RecommendationType {
  title: string;
  description: string;
}

export interface AnalysisDataType {
  video_url?: string;
  engagement_score?: number;
  video_metadata?: {
    duration?: string;
    platform?: string;
    [key: string]: any;
  };
  content_analysis?: {
    objects?: string[];
    scene_transitions?: string;
    text_detected?: string[];
    [key: string]: any;
  };
  engagement_prediction?: {
    best_segments?: BestSegmentType[];
    [key: string]: any;
  };
  [key: string]: any;
}
