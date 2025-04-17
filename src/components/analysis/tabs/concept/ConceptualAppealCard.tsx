
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Sparkles } from "lucide-react";

interface ConceptualAppealCardProps {
  uniquenessScore: number;
  clarity: number;
  relevance: number;
  memorability: number;
}

export function ConceptualAppealCard({
  uniquenessScore,
  clarity,
  relevance,
  memorability
}: ConceptualAppealCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-primary" />
          Conceptual Appeal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Uniqueness</span>
              <span className="text-sm">{uniquenessScore}/10</span>
            </div>
            <Progress value={uniquenessScore * 10} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Concept Clarity</span>
              <span className="text-sm">{clarity}/10</span>
            </div>
            <Progress value={clarity * 10} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Audience Relevance</span>
              <span className="text-sm">{relevance}/10</span>
            </div>
            <Progress value={relevance * 10} className="h-2" />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm font-medium">Memorability</span>
              <span className="text-sm">{memorability}/10</span>
            </div>
            <Progress value={memorability * 10} className="h-2" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
