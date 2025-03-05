
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { useState, useRef } from "react";

interface VideoPreviewProps {
  videoUrl?: string;
  title?: string;
  duration?: string;
}

export function VideoPreview({ videoUrl, title = "My Video", duration = "0:45" }: VideoPreviewProps) {
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
  
  if (!videoUrl) {
    return (
      <div className="aspect-video bg-slate-800 rounded-lg flex items-center justify-center">
        <p className="text-slate-500">No video available</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg overflow-hidden bg-slate-900 relative shadow-lg">
      {isPlaying ? (
        <div className="relative">
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="w-full aspect-video object-cover" 
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
        <div className="relative group cursor-pointer" onClick={handlePlayVideo}>
          <div className="w-full aspect-video bg-slate-800 rounded-lg overflow-hidden">
            <img 
              src={videoUrl}
              alt="Video thumbnail" 
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
            <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            <p className="text-white font-medium text-lg">{title}</p>
            <p className="text-slate-300 text-sm">{duration}</p>
          </div>
        </div>
      )}
    </div>
  );
}
