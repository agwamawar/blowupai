
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Volume2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AudioQualityProps {
  clarity: number;
  balance: number;
  backgroundMusic: {
    used: boolean;
    type: string;
  };
  soundEffects: string[];
}

export function AudioQualityCard({
  clarity,
  balance,
  backgroundMusic,
  soundEffects
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
                <span className="text-sm font-medium">Voice Clarity</span>
                <span className="text-sm font-medium">{clarity}/10</span>
              </div>
              <Progress value={clarity * 10} className="h-2" />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Audio Balance</span>
                <span className="text-sm font-medium">{balance}/10</span>
              </div>
              <Progress value={balance * 10} className="h-2" />
            </div>
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Background Music</h4>
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                <span className="text-sm text-muted-foreground">
                  {backgroundMusic.used 
                    ? `Using ${backgroundMusic.type} style music` 
                    : "No background music detected"}
                </span>
              </div>
            </div>

            {soundEffects.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Sound Effects</h4>
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
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
