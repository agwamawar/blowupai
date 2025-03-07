
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoControlsProps {
  isPlaying: boolean;
  isMuted: boolean;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
}

export function VideoControls({ 
  isPlaying, 
  isMuted, 
  onPlayToggle, 
  onMuteToggle 
}: VideoControlsProps) {
  return (
    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
      <div className="flex items-center justify-between">
        <button 
          onClick={onPlayToggle}
          className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
        >
          {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
        </button>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={onMuteToggle}
            className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
          >
            {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
          </button>
        </div>
      </div>
    </div>
  );
}
