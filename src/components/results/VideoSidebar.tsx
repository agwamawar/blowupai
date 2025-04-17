
import React from "react";
import { Video } from "lucide-react";
import { VideoSection } from "@/components/VideoSection";

interface VideoSidebarProps {
  videoUrl?: string;
  videoMetadata: {
    title: string;
    duration: string;
    resolution: string;
    uploadTime: string;
    platform: string;
    category: string;
  };
  followerCount?: number;
  onSeekToTimestamp: (seekFunction: (timestamp: string) => void) => void;
}

export function VideoSidebar({ 
  videoUrl, 
  videoMetadata, 
  followerCount,
  onSeekToTimestamp 
}: VideoSidebarProps) {
  return (
    <div className="w-full md:w-1/4 md:min-w-[320px] md:max-w-[400px] sticky top-0 h-screen overflow-y-auto p-4 border-r border-muted/40 bg-white/5 backdrop-blur-sm">
      <div className="mb-4">
        <h2 className="text-lg font-medium flex items-center gap-2">
          <Video className="h-5 w-5 text-primary" />
          🎥 Your Uploaded Video
        </h2>
      </div>
      
      <VideoSection 
        videoUrl={videoUrl} 
        metadata={videoMetadata}
        followerCount={followerCount}
        onSeekToTimestamp={onSeekToTimestamp}
        isFixed={true}
      />
    </div>
  );
}
