
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EditingQualityProps {
  pacingScore: number;
  transitions: string[];
  visualEffects: string[];
}

export function EditingQualityCard({ 
  pacingScore, 
  transitions, 
  visualEffects 
}: EditingQualityProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          Editing & Visual Flow
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Pacing & Rhythm</span>
              <span className="text-sm font-medium">{pacingScore}/10</span>
            </div>
            <Progress value={pacingScore * 10} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {pacingScore >= 8 ? "Excellent pacing with well-timed transitions" :
               pacingScore >= 6 ? "Good rhythm but some sections could be tightened" :
               "Consider adjusting clip lengths for better flow"}
            </p>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Transitions Used</h4>
              <div className="flex flex-wrap gap-2">
                {transitions.map((transition, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                  >
                    {transition}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Visual Effects</h4>
              <div className="flex flex-wrap gap-2">
                {visualEffects.map((effect, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
