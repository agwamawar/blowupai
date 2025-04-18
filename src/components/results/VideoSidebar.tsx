import React from "react";
import { VideoPlayer } from "@/components/video/VideoPlayer";
import { useVideoPlayer } from "@/hooks/useVideoPlayer";

interface VideoSidebarProps {
  videoUrl?: string;
  onSeekToTimestamp?: (seekFn: (timestamp: string) => void) => void;
}

export function VideoSidebar({ videoUrl, onSeekToTimestamp }: VideoSidebarProps) {
  const {
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
      <div className="w-full px-4 rounded-xl overflow-hidden shadow-md">
        <VideoPlayer url={videoUrl} onSeek={handleSeek} />
      </div>
    </div>
  );
}