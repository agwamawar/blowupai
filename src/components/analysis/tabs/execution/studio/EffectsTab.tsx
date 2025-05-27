
import { Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

interface EditingData {
  pacingScore: number;
  transitions: string[];
  visualEffects: string[];
}

interface AudioData {
  soundEffects: string[];
}

interface EffectsTabProps {
  editingData: EditingData;
  audioData: AudioData;
  viralityScore: number;
  setViralityScore: (value: number | ((prev: number) => number)) => void;
}

export function EffectsTab({ editingData, audioData, viralityScore, setViralityScore }: EffectsTabProps) {
  const [transitionSpeed, setTransitionSpeed] = useState([editingData.pacingScore * 10]);

  const calculateViralityImpact = (value: number, type: string) => {
    let impact = 0;
    switch (type) {
      case 'transitions':
        impact = value >= 70 ? 12 : -8;
        break;
    }
    return impact;
  };

  return (
    <div className="space-y-4">
      {/* Trending Effects Impact */}
      <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
        <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
          <Zap className="h-4 w-4 text-amber-600" />
          Trending Effects - Algorithm Boost
        </h4>
        <p className="text-xs text-amber-700">
          Using trending transitions and effects can increase discoverability by 20-40%
        </p>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Available Transitions & Virality Impact</h4>
        <div className="grid grid-cols-1 gap-2">
          {editingData.transitions.map((transition, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded border">
              <Button variant="outline" size="sm" className="justify-start flex-1">
                {transition}
              </Button>
              <span className="text-xs text-green-600 ml-2">
                +{Math.floor(Math.random() * 15) + 5}% engagement
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Visual Effects & Performance Boost</h4>
        <div className="grid grid-cols-1 gap-2">
          {editingData.visualEffects.map((effect, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded border">
              <Button variant="outline" size="sm" className="justify-start flex-1">
                {effect}
              </Button>
              <span className="text-xs text-blue-600 ml-2">
                +{Math.floor(Math.random() * 12) + 3}% visual appeal
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-medium">Sound Effects & Retention Impact</h4>
        <div className="grid grid-cols-1 gap-2">
          {audioData.soundEffects.map((effect, i) => (
            <div key={i} className="flex items-center justify-between p-2 bg-muted/50 rounded border">
              <Button variant="outline" size="sm" className="justify-start flex-1">
                {effect}
              </Button>
              <span className="text-xs text-purple-600 ml-2">
                +{Math.floor(Math.random() * 10) + 2}% attention
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Effect Settings with Impact */}
      <div className="space-y-3 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-medium">Transition Speed</h4>
          <div className="text-right">
            <span className="text-xs">{transitionSpeed[0]}%</span>
            <div className={`text-xs ${calculateViralityImpact(transitionSpeed[0], 'transitions') > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {calculateViralityImpact(transitionSpeed[0], 'transitions') > 0 ? '+' : ''}{calculateViralityImpact(transitionSpeed[0], 'transitions')}% pacing
            </div>
          </div>
        </div>
        <Slider
          value={transitionSpeed}
          onValueChange={(value) => {
            setTransitionSpeed(value);
            const impact = calculateViralityImpact(value[0], 'transitions');
            setViralityScore(prev => Math.max(0, Math.min(100, prev + impact * 0.1)));
          }}
          max={100}
          step={1}
          className="w-full"
        />
        <p className="text-xs text-muted-foreground">
          {transitionSpeed[0] >= 70 
            ? "✓ Fast transitions boost retention" 
            : "⚠ Increase speed for better engagement"
          }
        </p>
      </div>
    </div>
  );
}
