
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Music, Volume2, Mic, AudioLines, PlaySquare } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AudioQualityProps {
  voiceClarity: {
    score: number;
    metrics: {
      clarity: number;
      volume: number;
      consistency: number;
      noise: number;
    };
  };
  mixBalance: {
    score: number;
    levels: {
      voice: number;
      music: number;
      effects: number;
    };
  };
  backgroundMusic: {
    used: boolean;
    type: string;
    effectiveness: number;
    suggestions: string[];
  };
  soundEffects: Array<{
    type: string;
    timestamp: string;
    impact: number;
  }>;
}

export function AudioQualityCard({
  voiceClarity,
  mixBalance,
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
          {/* Voice Quality Analysis */}
          <div className="space-y-2 p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2">
              <Mic className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Voice Quality</h4>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Clarity</span>
                  <span>{voiceClarity.metrics.clarity}%</span>
                </div>
                <Progress value={voiceClarity.metrics.clarity} className="h-1.5" />
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Volume</span>
                  <span>{voiceClarity.metrics.volume}%</span>
                </div>
                <Progress value={voiceClarity.metrics.volume} className="h-1.5" />
              </div>
            </div>
          </div>

          {/* Mix Balance */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Volume2 className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Mix Balance</h4>
            </div>
            <div className="space-y-2">
              {Object.entries(mixBalance.levels).map(([key, value]) => (
                <div key={key} className="flex items-center gap-2">
                  <span className="text-sm capitalize w-20">{key}</span>
                  <div className="flex-1">
                    <Progress value={100 + value} className="h-1.5" />
                  </div>
                  <span className="text-xs text-muted-foreground w-12 text-right">{value}dB</span>
                </div>
              ))}
            </div>
          </div>

          {/* Background Music */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Waveform className="h-4 w-4 text-primary" />
                <h4 className="text-sm font-medium">Background Music</h4>
              </div>
              <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                {backgroundMusic.type}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Effectiveness</span>
                <span>{backgroundMusic.effectiveness}%</span>
              </div>
              <Progress value={backgroundMusic.effectiveness} className="h-1.5" />
            </div>
            <div className="space-y-1">
              {backgroundMusic.suggestions.map((suggestion, i) => (
                <p key={i} className="text-xs text-muted-foreground">• {suggestion}</p>
              ))}
            </div>
          </div>

          {/* Sound Effects */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <PlaySquare className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-medium">Sound Effects</h4>
            </div>
            <div className="space-y-2">
              {soundEffects.map((effect, i) => (
                <div key={i} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{effect.type}</span>
                    <span className="text-xs text-muted-foreground">at {effect.timestamp}</span>
                  </div>
                  <Progress value={effect.impact} className="w-20 h-1.5" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
