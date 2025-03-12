
import { VideoControls } from "../VideoControls";

interface VideoPlayerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoUrl: string;
  isPlaying: boolean;
  isMuted: boolean;
  currentTime: number;
  videoDuration: number;
  onPlayToggle: () => void;
  onMuteToggle: () => void;
  onSeek: (value: number[]) => void;
}

export function VideoPlayer({
  videoRef,
  videoUrl,
  isPlaying,
  isMuted,
  currentTime,
  videoDuration,
  onPlayToggle,
  onMuteToggle,
  onSeek
}: VideoPlayerProps) {
  return (
    <div className="relative w-full aspect-[9/16] max-w-full h-full">
      <video
        ref={videoRef}
        src={videoUrl}
        className="w-full h-full object-contain bg-slate-900 rounded-lg"
        playsInline // Added for better mobile support
        controls={false}
        autoPlay={isPlaying}
        muted={isMuted}
        loop={false}
      />
      <VideoControls
        isPlaying={isPlaying}
        isMuted={isMuted}
        currentTime={currentTime}
        duration={videoDuration}
        onPlayToggle={onPlayToggle}
        onMuteToggle={onMuteToggle}
        onSeek={onSeek}
      />
    </div>
  );
}
