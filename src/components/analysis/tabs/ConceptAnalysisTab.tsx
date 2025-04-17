
import { ThemeAnalysisCard } from "./concept/ThemeAnalysisCard";
import { ConceptualAppealCard } from "./concept/ConceptualAppealCard";
import { NarrativeElementsCard } from "./concept/NarrativeElementsCard";
import { TargetAudienceCard } from "./concept/TargetAudienceCard";

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
      uniquenessScore: number;
      clarity: number;
      relevance: number;
      memorability: number;
    };
    narrative: {
      hook: string;
      premise: string;
      keyElements: string[];
    };
  };
}

export function ConceptAnalysisTab({
  conceptData
}: ConceptAnalysisTabProps) {
  return (
    <div className="space-y-8">
      <ThemeAnalysisCard 
        primary={conceptData.theme.primary}
        secondary={conceptData.theme.secondary}
        storyStructure={conceptData.theme.storyStructure}
        emotionalTone={conceptData.theme.emotionalTone}
      />

      <ConceptualAppealCard
        uniquenessScore={conceptData.appeal.uniquenessScore}
        clarity={conceptData.appeal.clarity}
        relevance={conceptData.appeal.relevance}
        memorability={conceptData.appeal.memorability}
      />

      <NarrativeElementsCard
        hook={conceptData.narrative.hook}
        premise={conceptData.narrative.premise}
        keyElements={conceptData.narrative.keyElements}
      />

      <TargetAudienceCard
        targetAudience={conceptData.theme.targetAudience}
      />
    </div>
  );
}
