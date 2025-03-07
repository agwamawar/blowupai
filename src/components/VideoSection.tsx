
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
      <div className="sticky top-6 w-full flex flex-col">
        <div className="flex justify-center">
          <VideoPreview 
            videoUrl={videoUrl} 
            duration={metadata.duration}
            onSeekToTimestamp={onSeekToTimestamp}
          />
        </div>
        <div className="mt-4">
          <VideoMetadata 
            title={metadata.title}
            duration={metadata.duration}
            resolution={metadata.resolution}
            uploadTime={metadata.uploadTime}
            platform={metadata.platform}
            category={metadata.category}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
      <div className="md:col-span-2 flex justify-center md:justify-start">
        <VideoPreview 
          videoUrl={videoUrl} 
          duration={metadata.duration}
          onSeekToTimestamp={onSeekToTimestamp}
        />
      </div>
      <div className="md:col-span-1">
        <VideoMetadata 
          title={metadata.title}
          duration={metadata.duration}
          resolution={metadata.resolution}
          uploadTime={metadata.uploadTime}
          platform={metadata.platform}
          category={metadata.category}
        />
      </div>
    </div>
  );
}
