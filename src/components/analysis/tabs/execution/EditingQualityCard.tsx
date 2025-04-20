
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Zap, Eye, Clock } from "lucide-react";
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
          {/* Main Score Section */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Overall Editing Quality</span>
              <span className="text-sm font-medium">{pacingScore}/10</span>
            </div>
            <Progress value={pacingScore * 10} className="h-2" />
          </div>

          {/* Detailed Analysis Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pacing Analysis */}
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Pacing Analysis</h4>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Average clip duration: 2.3s</li>
                <li>• {pacingScore >= 8 ? "Excellent rhythm" : "Consider faster cuts"}</li>
                <li>• Peak engagement at {transitions.length} transitions</li>
              </ul>
            </div>

            {/* Visual Impact */}
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Visual Impact</h4>
              </div>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• {visualEffects.length} unique effects used</li>
                <li>• Color grading consistency: Good</li>
                <li>• Text overlay visibility: High</li>
              </ul>
            </div>
          </div>

          {/* Transitions & Effects */}
          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                Transition Analysis
              </h4>
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

            {/* Specific Recommendations */}
            <div className="mt-4 p-3 border border-primary/20 rounded-lg">
              <h4 className="text-sm font-medium mb-2">Editing Recommendations</h4>
              <ul className="text-sm space-y-2 text-muted-foreground">
                {pacingScore < 8 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Reduce clip duration to 1.5-2.5s for better engagement
                  </li>
                )}
                {transitions.length < 4 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Add more dynamic transitions every 5-7 seconds
                  </li>
                )}
                {visualEffects.length < 3 && (
                  <li className="flex items-start gap-2">
                    <span className="text-primary">•</span>
                    Incorporate subtle zoom or pan effects for visual interest
                  </li>
                )}
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Use pattern interrupts at 0:08 and 0:22 to boost retention
                </li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
