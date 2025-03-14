
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
}

export function VideoPreview({ 
  videoUrl, 
  title,
  duration = "0:45",
  resolution = "1080x1920",
  platform = "TikTok",
  category = "Entertainment",
  onSeekToTimestamp
}: VideoPreviewProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  
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
  }, []);
  
  if (!videoUrl) {
    return (
      <div className="w-full aspect-[9/16] bg-slate-800 rounded-lg flex items-center justify-center max-w-[350px] mx-auto">
        <p className="text-slate-500">No video available</p>
      </div>
    );
  }
  
  return (
    <div 
      className="rounded-lg overflow-hidden bg-slate-900 relative shadow-lg max-w-[350px] w-full mx-auto"
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
          isLoading={false}
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
