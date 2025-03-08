
import { useState, useEffect, useCallback } from "react";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";
import { ThumbnailGenerator } from "./video/ThumbnailGenerator";
import { VideoThumbnail } from "./video/VideoThumbnail";
import { VideoPlayer } from "./video/VideoPlayer";

interface VideoPreviewProps {
  videoUrl?: string;
  title?: string;
  duration?: string;
  resolution?: string;
  platform?: string;
  category?: string;
  onSeekToTimestamp?: (seekFunction: (timestamp: string) => void) => void;
  onThumbnailReady?: (isReady: boolean) => void;
}

export function VideoPreview({ 
  videoUrl, 
  title,
  duration = "0:45",
  resolution = "1080x1920",
  platform = "TikTok",
  category = "Entertainment",
  onSeekToTimestamp,
  onThumbnailReady
}: VideoPreviewProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  
  const {
    videoRef,
    isPlaying,
    isMuted,
    currentTime,
    videoDuration,
    handlePlayVideo,
    handleToggleMute,
    handleSeek,
    seekToTime
  } = useVideoPlayer();
  
  useEffect(() => {
    if (onSeekToTimestamp) {
      onSeekToTimestamp(seekToTime);
    }
  }, [onSeekToTimestamp, seekToTime]);
  
  const handleThumbnailGenerated = useCallback((url: string | null) => {
    setThumbnailUrl(url);
    
    if (url) {
      // Create an image object to check when the thumbnail is fully loaded
      const img = new Image();
      img.onload = () => {
        setThumbnailLoaded(true);
        if (onThumbnailReady) {
          onThumbnailReady(true);
        }
      };
      img.onerror = () => {
        // Even if there's an error, we should continue rather than block the UI
        setThumbnailLoaded(true);
        if (onThumbnailReady) {
          onThumbnailReady(true);
        }
      };
      img.src = url;
    } else {
      // If no URL is provided, still mark as loaded to avoid blocking
      setThumbnailLoaded(true);
      if (onThumbnailReady) {
        onThumbnailReady(true);
      }
    }
  }, [onThumbnailReady]);
  
  useEffect(() => {
    // If no video URL is provided, mark thumbnail as loaded
    if (!videoUrl && onThumbnailReady) {
      setThumbnailLoaded(true);
      onThumbnailReady(true);
    }
  }, [videoUrl, onThumbnailReady]);
  
  if (!videoUrl) {
    return (
      <div className="w-full aspect-[9/16] bg-slate-800 rounded-lg flex items-center justify-center max-w-[350px]">
        <p className="text-slate-500">No video available</p>
      </div>
    );
  }
  
  return (
    <div 
      className="rounded-lg overflow-hidden bg-slate-900 relative shadow-lg max-w-[350px]"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <ThumbnailGenerator
        videoUrl={videoUrl}
        onThumbnailGenerated={handleThumbnailGenerated}
      />
      
      {isPlaying || thumbnailUrl ? (
        <VideoPlayer
          videoRef={videoRef}
          videoUrl={videoUrl}
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTime={currentTime}
          videoDuration={videoDuration}
          onPlayToggle={handlePlayVideo}
          onMuteToggle={handleToggleMute}
          onSeek={handleSeek}
        />
      ) : (
        <VideoThumbnail
          onClick={handlePlayVideo}
          isHovering={isHovering}
          isLoading={!thumbnailLoaded}
          title={title}
          duration={duration}
          resolution={resolution}
          platform={platform}
          category={category}
          thumbnailUrl={thumbnailUrl}
        />
      )}
    </div>
  );
}
