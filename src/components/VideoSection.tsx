
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
        
        {/* Display video metadata below the video in dashboard */}
        <div className="mt-4 w-full p-3 bg-muted/50 rounded-md text-sm space-y-1">
          <p><span className="font-medium">Duration:</span> {metadata.duration}</p>
          <p><span className="font-medium">Resolution:</span> {metadata.resolution}</p>
          {metadata.platform && (
            <p><span className="font-medium">Platform:</span> {metadata.platform}</p>
          )}
          {metadata.category && (
            <p><span className="font-medium">Category:</span> {metadata.category}</p>
          )}
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
