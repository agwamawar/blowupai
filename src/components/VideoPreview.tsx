import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface VideoPreviewProps {
  videoUrl?: string;
  title?: string;
  duration?: string;
  onSeekToTimestamp?: (seekFunction: (timestamp: string) => void) => void;
}

export function VideoPreview({ 
  videoUrl, 
  title, 
  duration = "0:45",
  onSeekToTimestamp 
}: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };
  
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  // Function to seek to a specific timestamp
  const seekToTime = (timestampStr: string) => {
    if (!videoRef.current) return;
    
    // Parse the timestamp (assuming format like "0:15" or "1:30")
    const parts = timestampStr.split(':').map(part => parseInt(part));
    let seconds = 0;
    
    if (parts.length === 2) {
      // Format is minutes:seconds
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      // Format is hours:minutes:seconds
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else {
      // Try to parse as direct seconds
      seconds = parseInt(timestampStr);
    }
    
    if (!isNaN(seconds)) {
      videoRef.current.currentTime = seconds;
      
      // Auto-play the video if it's not already playing
      if (!isPlaying) {
        videoRef.current.play().catch(error => console.error('Error playing video:', error));
        setIsPlaying(true);
      }
    }
  };
  
  // Expose the seekToTime function via props
  useEffect(() => {
    if (onSeekToTimestamp) {
      onSeekToTimestamp(seekToTime);
    }
  }, [onSeekToTimestamp]);
  
  if (!videoUrl) {
    return (
      <div className="w-full aspect-[9/16] bg-slate-800 rounded-lg flex items-center justify-center max-w-[350px]">
        <p className="text-slate-500">No video available</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg overflow-hidden bg-slate-900 relative shadow-lg max-w-[350px]">
      {isPlaying ? (
        <div className="relative w-full aspect-[9/16]">
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="w-full h-full object-contain bg-black" 
            autoPlay 
            muted={isMuted}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4">
            <div className="flex items-center justify-between">
              <button 
                onClick={handlePlayVideo}
                className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                {isPlaying ? <Pause className="h-4 w-4 text-white" /> : <Play className="h-4 w-4 text-white" />}
              </button>
              
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleToggleMute}
                  className="h-8 w-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  {isMuted ? <VolumeX className="h-4 w-4 text-white" /> : <Volume2 className="h-4 w-4 text-white" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="relative group cursor-pointer w-full aspect-[9/16]" onClick={handlePlayVideo}>
          <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden">
            <img 
              src={videoUrl}
              alt="Video thumbnail" 
              className="w-full h-full object-contain bg-black"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
            <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            {duration && <p className="text-slate-300 text-sm">{duration}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
