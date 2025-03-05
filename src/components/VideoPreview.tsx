
import { Play } from "lucide-react";
import { useState } from "react";

interface VideoPreviewProps {
  videoUrl?: string;
}

export function VideoPreview({ videoUrl }: VideoPreviewProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
  };
  
  if (!videoUrl) {
    return (
      <div className="aspect-video bg-[#1A1F2C]/70 rounded-lg flex items-center justify-center">
        <p className="text-[#8E9196]">No video available</p>
      </div>
    );
  }
  
  return (
    <div className="rounded-lg overflow-hidden bg-black relative">
      {isPlaying ? (
        <video 
          src={videoUrl} 
          className="w-full aspect-video object-cover" 
          controls 
          autoPlay 
        />
      ) : (
        <div className="relative group cursor-pointer" onClick={handlePlayVideo}>
          <div className="w-full aspect-video bg-[#1A1F2C]/70 rounded-lg overflow-hidden">
            <img 
              src={videoUrl}
              alt="Video thumbnail" 
              className="w-full h-full object-cover opacity-80"
              onError={(e) => {
                e.currentTarget.src = '/placeholder.svg';
              }}
            />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
            <div className="h-16 w-16 rounded-full bg-[#9b87f5] flex items-center justify-center">
              <Play className="h-8 w-8 text-white" fill="white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
