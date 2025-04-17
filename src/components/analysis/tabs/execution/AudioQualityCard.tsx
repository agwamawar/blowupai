
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
            
            {voiceQuality !== undefined && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Voice Quality</span>
                  <span className="text-sm font-medium">{voiceQuality}/10</span>
                </div>
                <Progress value={voiceQuality * 10} className="h-2" />
                <p className="text-xs text-muted-foreground">
                  {voiceQuality >= 8 
                    ? "Excellent vocal delivery with clear enunciation" 
                    : voiceQuality >= 6 
                    ? "Good vocal quality with minor clarity issues" 
                    : "Consider improving vocal clarity and delivery"}
                </p>
              </div>
            )}
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
            
            <div className="pt-3 border-t mt-3">
              <div className="flex items-start gap-2">
                <Mic className="h-5 w-5 text-primary flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Audio Recommendations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1 mt-1">
                    {clarity < 8 && (
                      <li>• Consider using a pop filter to improve vocal clarity</li>
                    )}
                    {balance < 8 && (
                      <li>• Adjust the balance between voice and background audio</li>
                    )}
                    {!backgroundMusic.used && (
                      <li>• Adding subtle background music could enhance engagement</li>
                    )}
                    {backgroundMusic.used && balance < 7 && (
                      <li>• Lower background music volume during speaking sections</li>
                    )}
                    {soundEffects.length < 2 && (
                      <li>• Strategic sound effects can emphasize key moments</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
