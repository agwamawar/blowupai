
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Volume2, Mic, AudioWaveform } from "lucide-react";
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
          Audio Design & Mix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Voice Quality Analysis */}
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Mic className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Voice Quality</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Clarity</span>
                  <span>{clarity}/10</span>
                </div>
                <Progress value={clarity * 10} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">
                  {clarity >= 8 ? "Crystal clear voice recording" : 
                   clarity >= 6 ? "Good clarity, minor improvements needed" :
                   "Consider re-recording in quieter environment"}
                </p>
              </div>
            </div>

            {/* Audio Balance Analysis */}
            <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
              <div className="flex items-center gap-2">
                <Volume2 className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Mix Balance</h4>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Balance</span>
                  <span>{balance}/10</span>
                </div>
                <Progress value={balance * 10} className="h-1.5" />
                <p className="text-xs text-muted-foreground mt-1">
                  {balance >= 8 ? "Perfect balance between elements" :
                   balance >= 6 ? "Adjust music volume slightly" :
                   "Background elements competing with voice"}
                </p>
              </div>
            </div>
          </div>

          {/* Music Analysis */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium flex items-center gap-2">
                <Waveform className="h-4 w-4 text-primary" />
                Background Music
              </h4>
              {backgroundMusic.used ? (
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {backgroundMusic.type}
                </span>
              ) : (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded">
                  No music detected
                </span>
              )}
            </div>
            
            {/* Sound Effects Analysis */}
            <div className="flex flex-wrap gap-2 mt-2">
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

          {/* Detailed Audio Recommendations */}
          <div className="p-3 border border-primary/20 rounded-lg">
            <h4 className="text-sm font-medium mb-2">Audio Enhancement Tips</h4>
            <ul className="text-sm space-y-2 text-muted-foreground">
              {clarity < 8 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Use noise reduction to improve voice clarity
                </li>
              )}
              {balance < 8 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Lower background music to 20-25% during speech
                </li>
              )}
              {!backgroundMusic.used && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Add subtle background music to enhance mood
                </li>
              )}
              {soundEffects.length < 3 && (
                <li className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  Add transition sound effects for emphasis
                </li>
              )}
              <li className="flex items-start gap-2">
                <span className="text-primary">•</span>
                Apply subtle compression to even out voice levels
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
