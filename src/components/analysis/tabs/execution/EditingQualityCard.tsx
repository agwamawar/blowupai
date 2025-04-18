
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Scissors, Zap, Eye, Clock, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface EditingQualityProps {
  pacingScore: number;
  transitions: Array<{
    type: string;
    timestamp: string;
    effectiveness: number;
  }>;
  visualEffects: Array<{
    type: string;
    impact: number;
  }>;
  pacing: {
    averageClipDuration: number;
    idealClipDuration: number;
    patternInterrupts: Array<{
      timestamp: string;
      suggestion: string;
    }>;
  };
}

export function EditingQualityCard({ 
  pacingScore, 
  transitions, 
  visualEffects,
  pacing 
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

          {/* Pacing Analysis */}
          <div className="p-3 bg-muted/30 rounded-lg space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Pacing Analysis</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Current Duration</p>
                <p className="text-sm font-medium">{pacing.averageClipDuration}s</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Ideal Duration</p>
                <p className="text-sm font-medium">{pacing.idealClipDuration}s</p>
              </div>
            </div>
          </div>

          {/* Transitions Analysis */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Transitions
            </h4>
            <div className="space-y-2">
              {transitions.map((transition, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{transition.type}</span>
                    <span className="text-xs text-muted-foreground">at {transition.timestamp}</span>
                  </div>
                  <Progress value={transition.effectiveness} className="w-20 h-1.5" />
                </div>
              ))}
            </div>
          </div>

          {/* Pattern Interrupts */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium">Pattern Interrupts</h4>
            <div className="space-y-2">
              {pacing.patternInterrupts.map((interrupt, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <ArrowRight className="h-3 w-3 text-primary" />
                  <span className="text-muted-foreground">{interrupt.timestamp}</span>
                  <span>{interrupt.suggestion}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Effects */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4 text-primary" />
              Visual Impact
            </h4>
            <div className="grid grid-cols-2 gap-4">
              {visualEffects.map((effect, i) => (
                <div key={i} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>{effect.type}</span>
                    <span>{effect.impact}%</span>
                  </div>
                  <Progress value={effect.impact} className="h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
