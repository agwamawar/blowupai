
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Volume2, Mic } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AudioQualityProps {
  clarity: number;
  balance: number;
  backgroundMusic: {
    used: boolean;
    type: string;
  };
  soundEffects: string[];
  voiceQuality?: number;
}

export function AudioQualityCard({
  clarity,
  balance,
  backgroundMusic,
  soundEffects,
  voiceQuality
}: AudioQualityProps) {
  return (
    <Card className="border border-primary/20">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          Audio Design
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Dialog Clarity</span>
                <span className="text-sm font-medium">{clarity}/10</span>
              </div>
              <Progress value={clarity * 10} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {clarity >= 8 
                  ? "Clear dialog during the mall confrontation and salon explanation" 
                  : "Consider boosting dialog volume during the mall approach"}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Music-Dialog Balance</span>
                <span className="text-sm font-medium">{balance}/10</span>
              </div>
              <Progress value={balance * 10} className="h-2" />
              <p className="text-sm text-muted-foreground">
                {balance >= 8 
                  ? "Perfect transition from intense to melodic music during tension flip" 
                  : "Adjust background music volume during key dialog moments"}
              </p>
            </div>
            
            {voiceQuality !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Voice Quality</span>
                  <span className="text-sm font-medium">{voiceQuality}/10</span>
                </div>
                <Progress value={voiceQuality * 10} className="h-2" />
                <p className="text-sm text-muted-foreground">
                  {voiceQuality >= 8 
                    ? "Professional tone when calming the dad creates credibility" 
                    : "Consider adding more confidence to your voice during the mall approach"}
                </p>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Music Selection</h4>
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {backgroundMusic.type} - Effective tension-to-resolution progression
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-medium">Strategic Sound Effects</h4>
              <div className="flex flex-wrap gap-2">
                {soundEffects.map((effect, i) => (
                  <span 
                    key={i}
                    className="px-2 py-1 bg-muted text-muted-foreground rounded-md text-xs"
                  >
                    {effect}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Strong use of heartbeat SFX and record scratch for tension moments
              </p>
            </div>
          </div>
          
          <div className="pt-3 border-t">
            <div className="flex items-start gap-2">
              <Mic className="h-5 w-5 text-primary flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium">Scene-Specific Audio Improvements</h4>
                <ul className="text-sm text-muted-foreground space-y-2 mt-2">
                  <li>• Add subtle salon ambiance during styling sequence (0:16-0:22)</li>
                  <li>• Include soft "whoosh" transitions between styling shots</li>
                  <li>• Enhance parent reaction sounds during the reveal</li>
                  <li>• Consider adding gentle sparkle SFX with the final transformation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
