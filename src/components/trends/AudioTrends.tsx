
import { Volume2 } from "lucide-react";

interface TrendingAudio {
  name: string;
  uses: string;
  growth: string;
  pacingNotes: string;
}

interface SoundEffect {
  effect: string;
  impact: string;
  usage: string;
}

interface AudioPacingStrategy {
  strategy: string;
  timing: string;
  impact: string;
}

interface AudioTrendsProps {
  trendingAudio: TrendingAudio[];
  trendingSoundEffects: SoundEffect[];
  audioPacingStrategies: AudioPacingStrategy[];
}

export function AudioTrends({ 
  trendingAudio, 
  trendingSoundEffects, 
  audioPacingStrategies 
}: AudioTrendsProps) {
  return (
    <div>
      <h4 className="text-gray-700 mb-2 flex items-center font-medium">
        <Volume2 className="h-4 w-4 mr-1" /> 
        Sound & Pacing Tips
      </h4>
      
      {/* Popular Sounds with Timing Tips */}
      <div className="space-y-2 mb-3">
        <p className="text-xs font-medium text-gray-600">HOT SOUNDS & WHEN TO CHANGE SCENES</p>
        {trendingAudio.map((sound, idx) => (
          <div key={idx} className="flex flex-col bg-primary/5 rounded-md p-2 text-sm">
            <div className="flex justify-between items-center">
              <span className="text-gray-800 truncate max-w-[200px]">{sound.name}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-500">{sound.uses} videos</span>
                <span className="text-xs text-green-600">{sound.growth}</span>
              </div>
            </div>
            <span className="text-xs text-gray-500 mt-1 italic">Tip: {sound.pacingNotes}</span>
          </div>
        ))}
      </div>
      
      {/* Sound Effects Section */}
      <div className="space-y-2 mb-3">
        <p className="text-xs font-medium text-gray-600">SOUND EFFECTS THAT BOOST VIEWS</p>
        {trendingSoundEffects.map((effect, idx) => (
          <div key={idx} className="flex justify-between items-center bg-gray-50 rounded-md p-2 text-sm">
            <span className="text-gray-800 font-medium">{effect.effect}</span>
            <div className="flex flex-col items-end">
              <span className="text-xs text-green-600 font-medium">{effect.impact}</span>
              <span className="text-xs text-gray-500">Best for: {effect.usage}</span>
            </div>
          </div>
        ))}
      </div>
      
      {/* Audio Pacing Strategies */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-gray-600">SOUND TIMING TRICKS</p>
        {audioPacingStrategies.map((strategy, idx) => (
          <div key={idx} className="flex justify-between items-center bg-primary/5 rounded-md p-2 text-sm">
            <div className="flex flex-col">
              <span className="text-gray-800 font-medium">{strategy.strategy}</span>
              <span className="text-xs text-gray-600">{strategy.timing}</span>
            </div>
            <span className="text-xs text-green-600">{strategy.impact}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
