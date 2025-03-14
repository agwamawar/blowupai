
import { Play } from "lucide-react";
import { VideoHoverInfo } from "../VideoHoverInfo";

interface VideoThumbnailProps {
  onClick: () => void;
  isHovering: boolean;
  isLoading: boolean;
  title?: string;
  duration?: string;
  resolution?: string;
  platform?: string;
  category?: string;
  thumbnailUrl?: string;
}

export function VideoThumbnail({ 
  onClick, 
  isHovering, 
  isLoading,
  title,
  duration,
  resolution,
  platform,
  category,
  thumbnailUrl
}: VideoThumbnailProps) {
  return (
    <div className="relative group cursor-pointer w-full aspect-[9/16]" onClick={onClick}>
      <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title || "Video thumbnail"} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-800">
            <p className="text-slate-400">{isLoading ? "Loading thumbnail..." : "No thumbnail"}</p>
          </div>
        )}
      </div>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
        <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center mb-4">
          <Play className="h-8 w-8 text-white" />
        </div>
        {duration && <p className="text-slate-300 text-sm">{duration}</p>}
      </div>
      
      <VideoHoverInfo
        title={title}
        duration={duration}
        resolution={resolution}
        category={category}
        platform={platform}
        isVisible={isHovering && !isLoading}
      />
    </div>
  );
}
