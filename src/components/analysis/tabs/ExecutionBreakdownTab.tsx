
import { EditingQualityCard } from "./execution/EditingQualityCard";
import { AudioQualityCard } from "./execution/AudioQualityCard";
import { PlatformOptimizationCard } from "./execution/PlatformOptimizationCard";

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
      />
      
      <AudioQualityCard 
        clarity={executionData.audioQuality.clarity}
        balance={executionData.audioQuality.balance}
        backgroundMusic={executionData.audioQuality.backgroundMusic}
        soundEffects={executionData.audioQuality.soundEffects}
      />
      
      <PlatformOptimizationCard 
        platformOptimization={executionData.platformOptimization}
        finalOptimizations={finalOptimizations}
      />
    </div>
  );
}
