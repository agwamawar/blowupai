
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain } from "lucide-react";

interface AppealFeedback {
  score: number;
  feedback: string;
}

interface ConceptualAppealCardProps {
  storytelling: AppealFeedback;
  originality: AppealFeedback;
  relatability: AppealFeedback;
  simplicity: AppealFeedback;
  stickiness: AppealFeedback;
}

export function ConceptualAppealCard({
  storytelling,
  originality,
  relatability,
  simplicity,
  stickiness
}: ConceptualAppealCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Brain className="h-5 w-5 text-primary" />
          Emotional and Psychological Appeal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <AppealFactor 
            title="Storytelling"
            feedback={storytelling.feedback}
            score={storytelling.score}
          />
          
          <AppealFactor 
            title="Originality"
            feedback={originality.feedback}
            score={originality.score}
          />
          
          <AppealFactor 
            title="Relatability"
            feedback={relatability.feedback}
            score={relatability.score}
          />
          
          <AppealFactor 
            title="Simplicity"
            feedback={simplicity.feedback}
            score={simplicity.score}
          />
          
          <AppealFactor 
            title="Stickiness"
            feedback={stickiness.feedback}
            score={stickiness.score}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function AppealFactor({ 
  title, 
  feedback,
  score
}: { 
  title: string; 
  feedback: string;
  score: number;
}) {
  const getScoreClass = (score: number) => {
    if (score >= 8) return "text-green-500 dark:text-green-400";
    if (score >= 6) return "text-yellow-500 dark:text-yellow-400";
    return "text-red-500 dark:text-red-400";
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-medium">{title}</h3>
        <span className={`text-sm font-medium ${getScoreClass(score)}`}>
          {score}/10
        </span>
      </div>
      <p className="text-sm text-muted-foreground">
        {feedback}
      </p>
    </div>
  );
}
