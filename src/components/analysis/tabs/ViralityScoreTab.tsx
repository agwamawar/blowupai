
import { ViralityScoreCard } from "./virality/ViralityScoreCard";
import { EmotionalTriggersCard } from "./virality/EmotionalTriggersCard";
import { ImprovementSuggestionsCard } from "./virality/ImprovementSuggestionsCard";

interface ViralityScoreTabProps {
  viralityData: {
    engagementScore: number;
    viralityScore: number;
    predictions: any;
  };
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
}

export function ViralityScoreTab({
  viralityData,
  recommendations,
  videoMetadata
}: ViralityScoreTabProps) {
  const emotionalTriggers = viralityData.predictions?.emotionalTriggers || [
    { timestamp: "0:07", emotion: "curiosity", strength: 85, description: "Unexpected reveal creates strong curiosity" },
    { timestamp: "0:22", emotion: "humor", strength: 78, description: "Comedic timing on visual punchline" },
    { timestamp: "0:35", emotion: "empathy", strength: 92, description: "Relatable moment resonates strongly" }
  ];
  
  const improvementSuggestions = viralityData.predictions?.improvementSuggestions || [
    "Increase hook strength by adding movement in first 2 seconds",
    "Boost emotional appeal by connecting content to current events",
    "Optimize thumbnail with clearer text and more vibrant colors"
  ];
  
  return (
    <div className="space-y-6">
      <ViralityScoreCard viralityData={viralityData} />
      
      <EmotionalTriggersCard 
        emotionalTriggers={emotionalTriggers}
        videoMetadata={videoMetadata}
      />
      
      <ImprovementSuggestionsCard 
        improvementSuggestions={improvementSuggestions}
        recommendations={recommendations}
      />
    </div>
  );
}
