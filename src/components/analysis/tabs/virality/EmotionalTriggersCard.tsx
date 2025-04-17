
import { Heart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { EmotionalTriggersChart } from "@/components/analysis/charts/EmotionalTriggersChart";

interface EmotionalTrigger {
  timestamp: string;
  emotion: string;
  strength: number;
  description: string;
}

interface EmotionalTriggersCardProps {
  emotionalTriggers: EmotionalTrigger[];
  videoMetadata: {
    duration: string;
  };
}

export function EmotionalTriggersCard({ emotionalTriggers, videoMetadata }: EmotionalTriggersCardProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-primary text-lg flex items-center">
          <Heart className="h-5 w-5 mr-2" />
          Emotional Triggers
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Your video has {emotionalTriggers.length} significant emotional moments that could drive engagement.
          </p>
          
          <div className="space-y-3">
            {emotionalTriggers.map((trigger, i) => (
              <div key={i} className="p-3 bg-muted/50 rounded-lg border border-muted">
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 min-w-10 text-center">
                    <span className="text-sm font-medium">{trigger.timestamp}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-semibold capitalize">{trigger.emotion}</span>
                      <span className="text-xs font-medium px-2 py-0.5 bg-primary/10 rounded-full">
                        {trigger.strength}% Strength
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">{trigger.description}</p>
                    <div className="mt-2">
                      <Progress value={trigger.strength} className="h-1.5" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-3">
            <h3 className="text-sm font-medium mb-3">Emotion Distribution</h3>
            <div className="h-64">
              <EmotionalTriggersChart 
                data={emotionalTriggers} 
                duration={videoMetadata.duration} 
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
