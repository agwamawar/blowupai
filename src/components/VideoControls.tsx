
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { formatVideoTime } from "@/lib/videoUtils";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
  onSeek: (value: number[]) => void;
}

export function VideoControls({ 
  isPlaying, 
  isMuted, 
  currentTime,
  duration,
  onPlayToggle, 
  onMuteToggle,
  onSeek
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-2 sm:p-4">
      <div className="space-y-2">
        <Slider 
          value={[currentTime]}
          min={0}
          max={duration || 100}
          step={1}
          onValueChange={onSeek}
          className="cursor-pointer touch-auto" // improved touch targeting
        />
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <button 
              onClick={onPlayToggle}
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? 
                <Pause className="h-4 w-4 text-white" /> : 
                <Play className="h-4 w-4 text-white" />
              }
            </button>
            
            <button 
              onClick={onMuteToggle}
              className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? 
                <VolumeX className="h-4 w-4 text-white" /> : 
                <Volume2 className="h-4 w-4 text-white" />
              }
            </button>
            
            <span className="text-white text-xs sm:text-sm">
              {formatVideoTime(currentTime)} / {formatVideoTime(duration)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
