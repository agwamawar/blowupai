
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { VideoThumbnail } from "../video/VideoThumbnail";

type TrendingVideo = {
  title: string;
  thumbnailUrl?: string;
  videoUrl: string;
  views: string;
  technique: string;
  duration?: string;
};

interface TrendingVideosProps {
  videos: TrendingVideo[];
}

export function TrendingVideos({ videos }: TrendingVideosProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOpenVideo = (url: string) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      <h3 className="text-md font-medium flex items-center">
        <ExternalLink className="h-4 w-4 mr-2" />
        Similar Trending Content
      </h3>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div 
            key={index} 
            className="flex flex-col space-y-2"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div className="w-full cursor-pointer" onClick={() => handleOpenVideo(video.videoUrl)}>
              <VideoThumbnail
                onClick={() => handleOpenVideo(video.videoUrl)}
                isHovering={hoveredIndex === index}
                isLoading={false}
                title={video.title}
                duration={video.duration || "0:30"}
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-medium text-sm line-clamp-1">{video.title}</h4>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{video.views} views</span>
                <span className="font-semibold text-primary">{video.technique}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
