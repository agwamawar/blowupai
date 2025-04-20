
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Film, Speed, Timer } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EditingQualityProps {
  pacingScore: number;
  transitions: string[];
  visualEffects: string[];
}

export function EditingQualityCard({ 
  pacingScore, 
  transitions = ["Mall entrance whip-pan", "Reaction zoom", "Salon transition", "Before/after wipe"],
  visualEffects = ["Slow motion dad reaction", "Text overlays", "Quick zoom on scissors", "Split screen transformation"]
}: EditingQualityProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Scissors className="h-5 w-5 text-primary" />
          Video Editing Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Scene Breakdown */}
          <div className="space-y-2">
            <h3 className="text-sm font-medium flex items-center gap-2">
              <Film className="h-4 w-4 text-primary" />
              Scene Analysis
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Opening Hook (0:00-0:03)</p>
                <ul className="text-sm space-y-1.5 text-muted-foreground">
                  <li>• Quick approach shot creates immediate tension</li>
                  <li>• Strategic camera angle capturing dad's reaction</li>
                  <li>• Fast-paced cuts build dramatic effect</li>
                </ul>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Tension Resolution (0:04-0:15)</p>
                <ul className="text-sm space-y-1.5 text-muted-foreground">
                  <li>• Slow-motion effect on dad's protective reaction</li>
                  <li>• Clear framing of family dynamics</li>
                  <li>• Smooth deescalation sequence</li>
                </ul>
              </div>
              <div className="p-3 bg-muted/30 rounded-lg">
                <p className="text-sm font-medium mb-2">Salon Transformation (0:16-0:45)</p>
                <ul className="text-sm space-y-1.5 text-muted-foreground">
                  <li>• Professional lighting highlights hair texture</li>
                  <li>• Multiple angles show styling technique</li>
                  <li>• Dramatic before/after reveal transition</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pacing Analysis */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium flex items-center gap-2">
                <Speed className="h-4 w-4 text-primary" />
                Scene Timing
              </h3>
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Total: 45s</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {["Hook", "Tension", "Transform"].map((phase, i) => (
                <div key={i} className="p-3 bg-primary/5 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">{phase}</span>
                    <span className="text-xs text-primary">
                      {i === 0 ? "3s" : i === 1 ? "12s" : "30s"}
                    </span>
                  </div>
                  <Progress value={i === 0 ? 15 : i === 1 ? 35 : 85} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Editing Techniques */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Key Transitions</h3>
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
              <h3 className="text-sm font-medium">Visual Effects</h3>
              <div className="flex flex-wrap gap-2">
                {visualEffects.map((effect, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs"
                  >
                    {effect}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Improvement Recommendations */}
          <div className="p-3 border border-primary/20 rounded-lg">
            <h3 className="text-sm font-medium mb-2">Editing Enhancement Tips</h3>
            <ul className="text-sm space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Add a record-scratch sound effect during the dad's reaction for comedic timing
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Include close-up shots of your techniques for styling mixed-race hair textures
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Extend the transformation reveal with a smoother transition effect
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
