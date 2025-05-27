import { VideoEditingStudioCard } from "./execution/VideoEditingStudioCard";
import { PlatformOptimizationCard } from "./execution/PlatformOptimizationCard";
import { ContentStructureCard } from "./execution/ContentStructureCard";
import { StyleConsistencyCard } from "./execution/StyleConsistencyCard";
import { NarrativeFlowCard } from "./execution/NarrativeFlowCard";
import { ContentRecommendationsCard } from "./execution/ContentRecommendationsCard";

interface ExecutionBreakdownTabProps {
  executionData: {
    editingQuality: {
      pacingScore: number;
      transitions: string[];
      visualEffects: string[];
    };
    audioQuality: {
      clarity: number;
      balance: number;
      backgroundMusic: {
        used: boolean;
        type: string;
      };
      soundEffects: string[];
    };
    platformOptimization: {
      correctAspectRatio: boolean;
      suggestedHashtags: string[];
    };
    contentStructure?: {
      hookStrength: number;
      buildup: number;
      payoff: number;
      keyMoments: { timestamp: string; description: string }[];
    };
    styleConsistency?: {
      colorGrading: number;
      textOverlays: number;
      framing: number;
      brandAlignment: number;
    };
    narrativeFlow?: {
      pacing: number;
      storyProgression: number;
      transitions: number;
      engagementCurve: { point: number; value: number }[];
    };
  };
  finalOptimizations: string[];
  followerCount: number;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
  contentRecommendations?: {
    editing: string[];
    style: string[];
    narrative: string[];
    audio: string[];
    structure: string[];
  };
  onTimestampClick?: (timestamp: string) => void;
}

export function ExecutionBreakdownTab({
  executionData,
  finalOptimizations,
  followerCount,
  videoMetadata,
  contentRecommendations,
  onTimestampClick
}: ExecutionBreakdownTabProps) {
  const hasDetailedContentAnalysis = !!(
    executionData.contentStructure || 
    executionData.styleConsistency || 
    executionData.narrativeFlow
  );

  return (
    <div className="space-y-6">
      {/* Combined Video Editing Studio */}
      <VideoEditingStudioCard 
        editingData={executionData.editingQuality}
        audioData={executionData.audioQuality}
        onTimestampClick={onTimestampClick}
      />
      
      {executionData.styleConsistency && (
        <StyleConsistencyCard
          styleData={executionData.styleConsistency}
          contentType={videoMetadata.contentType}
        />
      )}
      
      {executionData.narrativeFlow && (
        <NarrativeFlowCard
          narrativeData={executionData.narrativeFlow}
          contentType={videoMetadata.contentType}
        />
      )}
      
      {executionData.contentStructure && (
        <ContentStructureCard
          structureData={executionData.contentStructure}
          contentType={videoMetadata.contentType}
          platform={videoMetadata.platform}
        />
      )}
      
      <PlatformOptimizationCard 
        platformOptimization={executionData.platformOptimization}
        finalOptimizations={finalOptimizations}
      />
      
      {contentRecommendations && (
        <ContentRecommendationsCard
          recommendations={contentRecommendations}
          contentType={videoMetadata.contentType}
          platform={videoMetadata.platform}
        />
      )}
      
      {!hasDetailedContentAnalysis && (
        <div className="bg-muted/30 rounded-lg p-4 text-center text-muted-foreground">
          <p>Detailed content structure analysis is not available for this video.</p>
          <p className="text-sm mt-1">Upload a longer video or enable advanced analytics for more insights.</p>
        </div>
      )}
    </div>
  );
}
