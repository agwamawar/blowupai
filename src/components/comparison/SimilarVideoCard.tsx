
import { useState } from "react";
import { BrandTiktok, Youtube, Instagram } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { VideoThumbnail } from "../video/VideoThumbnail";

interface SimilarVideoCardProps {
  title: string;
  thumbnailUrl: string | null;
  videoUrl: string;
  platform: "TikTok" | "Instagram" | "YouTube" | string;
  stats: {
    views: string;
    likes: string;
    shares?: string;
  };
  similarityReason: string;
}

export function SimilarVideoCard({
  title,
  thumbnailUrl,
  videoUrl,
  platform,
  stats,
  similarityReason
}: SimilarVideoCardProps) {
  const [isHovering, setIsHovering] = useState(false);
  
  const handleOpenVideo = () => {
    window.open(videoUrl, "_blank", "noopener,noreferrer");
  };
  
  // Get the appropriate platform icon
  const PlatformIcon = () => {
    switch (platform) {
      case "TikTok":
        return <BrandTiktok className="h-4 w-4" />;
      case "YouTube":
        return <Youtube className="h-4 w-4" />;
      case "Instagram":
        return <Instagram className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  return (
    <Card 
      className="overflow-hidden hover:shadow-md transition-shadow duration-300"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="aspect-[9/16] relative">
        <VideoThumbnail
          onClick={handleOpenVideo}
          isHovering={isHovering}
          isLoading={false}
          title={title}
          thumbnailUrl={thumbnailUrl}
          platform={platform}
        />
      </div>
      
      <CardContent className="p-3">
        <div className="flex items-start justify-between gap-2">
          <h4 className="font-medium text-sm line-clamp-2">{title}</h4>
          <Badge 
            variant="outline" 
            className="flex items-center gap-1 flex-shrink-0 whitespace-nowrap"
          >
            <PlatformIcon />
            <span>{platform}</span>
          </Badge>
        </div>
        
        <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>{stats.views} views</span>
          <span>{stats.likes} likes</span>
          {stats.shares && <span>{stats.shares} shares</span>}
        </div>
        
        <Badge 
          variant="secondary" 
          className="mt-2 w-full justify-center text-xs font-normal"
        >
          {similarityReason}
        </Badge>
      </CardContent>
    </Card>
  );
}
