
import { ViralityOverviewCard } from "./virality/ViralityOverviewCard";
import { EmotionalTriggersCard } from "./virality/EmotionalTriggersCard";
import { ViewerBehaviorCard } from "./metrics/ViewerBehaviorCard";
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
  
  const viewerBehavior = viralityData.predictions?.viewerBehavior || {
    watchTime: {
      expected: "0:32",
      platformAverage: "0:28",
      percentile: 70
    },
    engagement: {
      likeRate: 8.2,
      commentRate: 2.3,
      shareRate: 3.1,
      saveRate: 4.8
    },
    retention: [
      { point: 0, value: 100 },
      { point: 25, value: 92 },
      { point: 50, value: 78 },
      { point: 75, value: 66 },
      { point: 100, value: 52 }
    ],
    dropOffPoints: [
      { timestamp: "0:18", reason: "Pacing slows" },
      { timestamp: "0:42", reason: "Content repetition" }
    ]
  };
  
  return (
    <div className="space-y-6">
      {/* Overall Virality Score */}
      <ViralityOverviewCard 
        viralityScore={viralityData.viralityScore}
        predictions={viralityData.predictions}
      />
      
      {/* Emotional Triggers Section */}
      <EmotionalTriggersCard 
        emotionalTriggers={emotionalTriggers}
        duration={videoMetadata.duration}
      />
      
      {/* Viewer Behavior Forecast */}
      <ViewerBehaviorCard 
        behaviorData={viewerBehavior}
        platform={videoMetadata.platform}
      />
      
      {/* AI-Powered Improvement Suggestions */}
      <ImprovementSuggestionsCard 
        improvementSuggestions={improvementSuggestions}
        recommendations={recommendations}
      />
    </div>
  );
}
