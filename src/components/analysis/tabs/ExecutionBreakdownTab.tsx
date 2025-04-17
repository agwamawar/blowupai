
import { EditingQualityCard } from "./execution/EditingQualityCard";
import { AudioQualityCard } from "./execution/AudioQualityCard";
import { PlatformOptimizationCard } from "./execution/PlatformOptimizationCard";
import { ContentExecutionGuides } from "./execution/ContentExecutionGuides";

interface ExecutionBreakdownTabProps {
  executionData: {
    editingQuality: {
      pacingScore: number;
      transitions: string[];
      visualEffects: string[];
      consistencyScore: number;
      editingStyle: string;
      improvementAreas: string[];
    };
    audioQuality: {
      clarity: number;
      balance: number;
      backgroundMusic: {
        used: boolean;
        type: string;
        timing: string;
      };
      soundEffects: string[];
      voiceQuality: number;
    };
    platformOptimization: {
      correctAspectRatio: boolean;
      suggestedHashtags: string[];
      recommendations: string[];
    };
    executionGuides: {
      contentType: string;
      bestPractices: string[];
      commonMistakes: string[];
      trendingElements: string[];
    };
  };
  finalOptimizations: string[];
  followerCount: number;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ExecutionBreakdownTab({
  executionData,
  finalOptimizations,
  followerCount,
  videoMetadata
}: ExecutionBreakdownTabProps) {
  return (
    <div className="space-y-6">
      <EditingQualityCard 
        pacingScore={executionData.editingQuality.pacingScore}
        transitions={executionData.editingQuality.transitions}
        visualEffects={executionData.editingQuality.visualEffects}
        consistencyScore={executionData.editingQuality.consistencyScore}
        editingStyle={executionData.editingQuality.editingStyle}
        improvementAreas={executionData.editingQuality.improvementAreas}
      />
      
      <AudioQualityCard 
        clarity={executionData.audioQuality.clarity}
        balance={executionData.audioQuality.balance}
        backgroundMusic={executionData.audioQuality.backgroundMusic}
        soundEffects={executionData.audioQuality.soundEffects}
        voiceQuality={executionData.audioQuality.voiceQuality}
      />
      
      <ContentExecutionGuides
        contentType={videoMetadata.contentType}
        guides={executionData.executionGuides}
      />
      
      <PlatformOptimizationCard 
        platformOptimization={executionData.platformOptimization}
        finalOptimizations={finalOptimizations}
      />
    </div>
  );
}
