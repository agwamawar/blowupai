
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
  thumbnailUrl: string | null;
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
    <div 
      className="relative w-full aspect-[9/16] overflow-hidden rounded-lg group cursor-pointer"
      onClick={onClick}
    >
      {/* Thumbnail or placeholder */}
      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
        {thumbnailUrl ? (
          <img 
            src={thumbnailUrl} 
            alt={title || "Video thumbnail"} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-slate-500 flex items-center justify-center flex-col">
            <span className="text-sm">Preview not available</span>
          </div>
        )}
      </div>
      
      {/* Play button overlay */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/80 rounded-full p-3 backdrop-blur-sm opacity-90 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-105">
          <Play className="h-6 w-6 text-primary" />
        </div>
      </div>
      
      {/* Video info on hover */}
      <VideoHoverInfo 
        title={title}
        duration={duration}
        resolution={resolution}
        platform={platform}
        category={category}
        isVisible={isHovering}
      />
    </div>
  );
}
