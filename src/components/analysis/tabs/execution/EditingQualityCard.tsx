
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
              <span className="text-sm font-medium">Tension-to-Resolution Pacing</span>
              <span className="text-sm font-medium">{pacingScore}/10</span>
            </div>
            <Progress value={pacingScore * 10} className="h-2" />
            <p className="text-sm text-muted-foreground">
              {pacingScore >= 8 
                ? "Perfect build-up from mall confrontation to satisfying salon transformation" 
                : pacingScore >= 6 
                ? "Good pacing but consider tightening the transition from mall to salon"
                : "Maintain faster cuts during the confrontation sequence"}
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Strategic Transitions Used</h4>
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
              <p className="text-sm text-muted-foreground mt-2">
                Effective use of whip pans for mall-to-salon transition and freeze frames for tension moments
              </p>
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
              <p className="text-sm text-muted-foreground mt-2">
                Strong use of red tint for tension and sparkle effects for reveal, consider adding slow-motion for hair styling sequence
              </p>
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t">
            <h4 className="text-sm font-medium">Scene-Specific Improvements</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Add more close-up shots during the styling sequence (0:16-0:22)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Extend the reveal moment pause by 0.5s for better impact
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Include split-screen comparison during the final transformation
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
