
import { Play } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { VideoHoverInfo } from "./VideoHoverInfo";
import { VideoControls } from "./VideoControls";

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Generate thumbnail from video
  useEffect(() => {
    if (videoUrl && !thumbnailUrl) {
      const video = document.createElement('video');
      video.crossOrigin = "anonymous";
      video.src = videoUrl;
      video.muted = true;
      
      video.onloadedmetadata = () => {
        // Set to a random position between 20-80% of the video duration
        const randomPosition = video.duration * (0.2 + Math.random() * 0.6);
        video.currentTime = randomPosition;
      };
      
      video.onseeked = () => {
        // Create a canvas element to capture the frame
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Draw the current frame to the canvas
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          // Convert the canvas to a data URL
          const dataUrl = canvas.toDataURL('image/jpeg');
          setThumbnailUrl(dataUrl);
        }
        
        // Clean up
        video.remove();
      };
      
      video.onerror = () => {
        console.error("Error generating thumbnail");
        setThumbnailUrl(null);
      };
    }
  }, [videoUrl, thumbnailUrl]);
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } else {
      setIsPlaying(true);
    }
  };
  
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const seekToTime = (timestampStr: string) => {
    if (!videoRef.current) return;
    
    const parts = timestampStr.split(':').map(part => parseInt(part));
    let seconds = 0;
    
    if (parts.length === 2) {
      seconds = parts[0] * 60 + parts[1];
    } else if (parts.length === 3) {
      seconds = parts[0] * 3600 + parts[1] * 60 + parts[2];
    } else {
      seconds = parseInt(timestampStr);
    }
    
    if (!isNaN(seconds)) {
      videoRef.current.currentTime = seconds;
      
      if (!isPlaying) {
        videoRef.current.play().catch(error => console.error('Error playing video:', error));
        setIsPlaying(true);
      }
    }
  };
  
  useEffect(() => {
    if (onSeekToTimestamp) {
      onSeekToTimestamp(seekToTime);
    }
  }, [onSeekToTimestamp]);
  
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
      {isPlaying ? (
        <div className="relative w-full aspect-[9/16]">
          <video 
            ref={videoRef}
            src={videoUrl} 
            className="w-full h-full object-contain bg-black" 
            autoPlay 
            muted={isMuted}
          />
          <VideoControls 
            isPlaying={isPlaying}
            isMuted={isMuted}
            onPlayToggle={handlePlayVideo}
            onMuteToggle={handleToggleMute}
          />
        </div>
      ) : (
        <div className="relative group cursor-pointer w-full aspect-[9/16]" onClick={handlePlayVideo}>
          <div className="w-full h-full bg-slate-800 rounded-lg overflow-hidden">
            {thumbnailUrl ? (
              <img 
                src={thumbnailUrl}
                alt="Video thumbnail" 
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-slate-800">
                <p className="text-slate-400">Loading thumbnail...</p>
              </div>
            )}
          </div>
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 group-hover:bg-black/50 transition-colors">
            <div className="h-16 w-16 rounded-full bg-primary/80 flex items-center justify-center mb-4">
              <Play className="h-8 w-8 text-white" />
            </div>
            {duration && <p className="text-slate-300 text-sm">{duration}</p>}
          </div>
          
          <VideoHoverInfo
            title={title}
            duration={duration}
            resolution={resolution}
            category={category}
            platform={platform}
            isVisible={isHovering && !isPlaying}
          />
        </div>
      )}
    </div>
  );
}
