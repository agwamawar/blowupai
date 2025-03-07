
import { VideoMetadata } from "./VideoMetadata";

interface VideoHoverInfoProps {
  title?: string;
  duration?: string;
  resolution?: string;
  category?: string;
  platform?: string;
  isVisible: boolean;
}

export function VideoHoverInfo({ 
  title, 
  duration, 
  resolution, 
  category,
  platform,
  isVisible 
}: VideoHoverInfoProps) {
  if (!isVisible) return null;
  
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-[300px] z-10 transition-opacity duration-200 opacity-100 animate-fade-in">
      <VideoMetadata
        title={title || "Video Title"}
        duration={duration}
        resolution={resolution}
        category={category}
        platform={platform}
      />
    </div>
  );
}
