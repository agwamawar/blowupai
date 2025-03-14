
import { VideoPreview } from "./VideoPreview";
import { VideoMetadata } from "./VideoMetadata";

interface VideoSectionProps {
  videoUrl?: string;
  metadata: {
    title: string;
    duration: string;
    resolution: string;
    uploadTime: string;
    platform: string;
    category: string;
  };
  followerCount?: number;
  onSeekToTimestamp?: (seekFunction: (timestamp: string) => void) => void;
  isFixed?: boolean;
}

export function VideoSection({ 
  videoUrl, 
  metadata, 
  followerCount,
  onSeekToTimestamp,
  isFixed = false
}: VideoSectionProps) {
  if (isFixed) {
    return (
      <div className="sticky top-4 md:top-6 w-full flex flex-col items-center">
        <div className="flex justify-center w-full max-w-full">
          <VideoPreview 
            videoUrl={videoUrl} 
            title={metadata.title}
            duration={metadata.duration}
            resolution={metadata.resolution}
            platform={metadata.platform}
            category={metadata.category}
            onSeekToTimestamp={onSeekToTimestamp}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 w-full">
      <div className="md:col-span-2 flex justify-center md:justify-start w-full">
        <VideoPreview 
          videoUrl={videoUrl} 
          title={metadata.title}
          duration={metadata.duration}
          resolution={metadata.resolution}
          platform={metadata.platform}
          category={metadata.category}
          onSeekToTimestamp={onSeekToTimestamp}
        />
      </div>
      <div className="md:col-span-1 w-full">
        <VideoMetadata 
          title={metadata.title}
        />
      </div>
    </div>
  );
}
