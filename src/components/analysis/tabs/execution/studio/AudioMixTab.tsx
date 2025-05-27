
import { Volume2, Sliders, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface AudioData {
  clarity: number;
  balance: number;
  backgroundMusic: {
    used: boolean;
    type: string;
  };
  soundEffects: string[];
}

interface AudioMixTabProps {
  audioData: AudioData;
  viralityScore: number;
  setViralityScore: (value: number | ((prev: number) => number)) => void;
}

export function AudioMixTab({ audioData, viralityScore, setViralityScore }: AudioMixTabProps) {
  const [volume, setVolume] = useState([80]);
  const [audioBalance, setAudioBalance] = useState([audioData.balance * 10]);

  const calculateViralityImpact = (value: number, type: string) => {
    let impact = 0;
    switch (type) {
      case 'volume':
        impact = value >= 70 && value <= 90 ? 5 : -3;
        break;
      case 'balance':
        impact = value >= 60 && value <= 80 ? 8 : -5;
        break;
    }
    return impact;
  };

  return (
    <div className="space-y-4">
      {/* Virality Impact Header */}
      <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Audio Optimization Impact
        </h4>
        <p className="text-xs text-muted-foreground">
          Optimal audio settings can increase engagement by 15-25% and improve algorithm performance
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Master Volume with Impact */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Volume2 className="h-4 w-4" />
              Master Volume
            </h4>
            <div className="text-right">
              <span className="text-xs">{volume[0]}%</span>
              <div className={`text-xs ${calculateViralityImpact(volume[0], 'volume') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {calculateViralityImpact(volume[0], 'volume') > 0 ? '+' : ''}{calculateViralityImpact(volume[0], 'volume')}% virality
              </div>
            </div>
          </div>
          <Slider
            value={volume}
            onValueChange={(value) => {
              setVolume(value);
              const impact = calculateViralityImpact(value[0], 'volume');
              setViralityScore(prev => Math.max(0, Math.min(100, prev + impact * 0.1)));
            }}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {volume[0] >= 70 && volume[0] <= 90 
              ? "✓ Optimal range for engagement" 
              : "⚠ Adjust to 70-90% for best performance"
            }
          </p>
        </div>

        {/* Audio Balance with Impact */}
        <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Sliders className="h-4 w-4" />
              Voice/Music Balance
            </h4>
            <div className="text-right">
              <span className="text-xs">{audioBalance[0]}/10</span>
              <div className={`text-xs ${calculateViralityImpact(audioBalance[0], 'balance') > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {calculateViralityImpact(audioBalance[0], 'balance') > 0 ? '+' : ''}{calculateViralityImpact(audioBalance[0], 'balance')}% clarity
              </div>
            </div>
          </div>
          <Slider
            value={audioBalance}
            onValueChange={(value) => {
              setAudioBalance(value);
              const impact = calculateViralityImpact(value[0], 'balance');
              setViralityScore(prev => Math.max(0, Math.min(100, prev + impact * 0.1)));
            }}
            max={100}
            step={1}
            className="w-full"
          />
          <p className="text-xs text-muted-foreground">
            {audioBalance[0] >= 60 && audioBalance[0] <= 80 
              ? "✓ Perfect voice-to-music ratio" 
              : "⚠ Adjust for better voice clarity"
            }
          </p>
        </div>
      </div>

      {/* Audio Tracks with Performance Impact */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium">Audio Tracks & Engagement Impact</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
            <span className="text-sm">Voice Track</span>
            <div className="flex items-center gap-2">
              <Slider value={[85]} max={100} className="w-20" />
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Volume2 className="h-3 w-3" />
              </Button>
              <span className="text-xs text-green-600">+12% clarity</span>
            </div>
          </div>
          
          {audioData.backgroundMusic.used && (
            <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
              <span className="text-sm">Background Music ({audioData.backgroundMusic.type})</span>
              <div className="flex items-center gap-2">
                <Slider value={[25]} max={100} className="w-20" />
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                  <Volume2 className="h-3 w-3" />
                </Button>
                <span className="text-xs text-yellow-600">+5% mood</span>
              </div>
            </div>
          )}
          
          <div className="flex items-center justify-between p-2 bg-muted/50 rounded border">
            <span className="text-sm">Sound Effects</span>
            <div className="flex items-center gap-2">
              <Slider value={[60]} max={100} className="w-20" />
              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                <Volume2 className="h-3 w-3" />
              </Button>
              <span className="text-xs text-green-600">+8% retention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Audio Enhancement with Virality Boost */}
      <div className="p-3 border border-primary/20 rounded-lg">
        <h4 className="text-sm font-medium mb-3">Audio Enhancement & Algorithm Boost</h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">Noise Reduction</Button>
            <span className="text-xs text-green-600">+15% clarity</span>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">Audio Normalize</Button>
            <span className="text-xs text-green-600">+10% consistency</span>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">Add Reverb</Button>
            <span className="text-xs text-yellow-600">+3% depth</span>
          </div>
          <div className="flex items-center justify-between">
            <Button variant="outline" size="sm">EQ Settings</Button>
            <span className="text-xs text-green-600">+7% professional</span>
          </div>
        </div>
      </div>
    </div>
  );
}
