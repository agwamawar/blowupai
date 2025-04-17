
import React from "react";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

interface VideoSidebarProps {
  videoUrl?: string;
  onSeekToTimestamp: (seekFunction: (timestamp: string) => void) => void;
}

export function VideoSidebar({ 
  videoUrl,
  onSeekToTimestamp 
}: VideoSidebarProps) {
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
  
  React.useEffect(() => {
    if (onSeekToTimestamp) {
      onSeekToTimestamp(seekToTime);
    }
  }, [onSeekToTimestamp, seekToTime]);
  
  return (
    <div className="fixed top-0 left-0 h-screen w-[320px] p-4 bg-background/80 backdrop-blur-sm border-r border-border/10 flex items-center justify-center">
      <div className="w-full max-w-[280px] rounded-xl overflow-hidden shadow-lg">
        {videoUrl ? (
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
          <div className="w-full aspect-[9/16] bg-slate-800 flex items-center justify-center">
            <p className="text-slate-500">No video available</p>
          </div>
        )}
      </div>
    </div>
  );
}
