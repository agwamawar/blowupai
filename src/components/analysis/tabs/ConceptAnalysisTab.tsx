
import { ThemeAnalysisCard } from "./concept/ThemeAnalysisCard";
import { ConceptualAppealCard } from "./concept/ConceptualAppealCard";
import { NarrativeFlowCard } from "./execution/NarrativeFlowCard";
import { StoryTimelineCard } from "./concept/StoryTimelineCard";

interface ConceptAnalysisTabProps {
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
  };
  conceptData: {
    theme: {
      primary: string;
      secondary: string[];
      storyStructure: string;
      emotionalTone: string;
      targetAudience: string[];
    };
    appeal: {
      storytelling: {
        score: number;
        feedback: string;
      };
      originality: {
        score: number;
        feedback: string;
      };
      relatability: {
        score: number;
        feedback: string;
      };
      simplicity: {
        score: number;
        feedback: string;
      };
      stickiness: {
        score: number;
        feedback: string;
      };
    };
    narrative: {
      hook: string;
      premise: string;
      keyElements: string[];
    };
    suggestions: string[];
  };
}

export function ConceptAnalysisTab({
  conceptData,
  videoMetadata
}: ConceptAnalysisTabProps) {
  // Create narrative flow data for the Concept tab
  const narrativeFlowData = {
    pacing: 7,
    storyProgression: 8,
    transitions: 6,
    engagementCurve: [
      { point: 0, value: 90 },
      { point: 1, value: 95 },
      { point: 2, value: 85 },
      { point: 3, value: 80 },
      { point: 4, value: 85 },
      { point: 5, value: 90 },
      { point: 6, value: 95 },
      { point: 7, value: 90 },
      { point: 8, value: 85 },
      { point: 9, value: 80 }
    ]
  };

  return (
    <div className="space-y-8">
      <ThemeAnalysisCard 
        primary={conceptData.theme.primary}
        secondary={conceptData.theme.secondary}
        storyStructure={conceptData.theme.storyStructure}
        emotionalTone={conceptData.theme.emotionalTone}
      />

      <ConceptualAppealCard
        storytelling={conceptData.appeal.storytelling}
        originality={conceptData.appeal.originality}
        relatability={conceptData.appeal.relatability}
        simplicity={conceptData.appeal.simplicity}
        stickiness={conceptData.appeal.stickiness}
      />

      <StoryTimelineCard
        duration={videoMetadata.duration}
        contentType={videoMetadata.contentType}
      />

      <NarrativeFlowCard
        narrativeData={narrativeFlowData}
        contentType={videoMetadata.contentType}
      />
    </div>
  );
}
