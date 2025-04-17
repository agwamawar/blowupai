
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EditingQualityProps {
  pacingScore: number;
  transitions: string[];
  visualEffects: string[];
  consistencyScore: number;
  editingStyle: string;
  improvementAreas: string[];
}

export function EditingQualityCard({ 
  pacingScore, 
  transitions, 
  visualEffects,
  consistencyScore,
  editingStyle,
  improvementAreas
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
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pacing & Rhythm</span>
                <span className="text-sm font-medium">{pacingScore}/10</span>
              </div>
              <Progress value={pacingScore * 10} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Visual Consistency</span>
                <span className="text-sm font-medium">{consistencyScore}/10</span>
              </div>
              <Progress value={consistencyScore * 10} className="h-2" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Editing Style</h4>
              <p className="text-sm text-muted-foreground">{editingStyle}</p>
            </div>

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

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Areas for Improvement</h4>
              <ul className="space-y-1">
                {improvementAreas.map((area, i) => (
                  <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="mt-1.5 h-1 w-1 rounded-full bg-amber-500" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
