
import { useState, useRef, useEffect, useCallback } from "react";

export function useVideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handlePlayVideo = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch(err => console.error("Error playing video:", err));
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying]);
  
  const handleToggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleSeek = useCallback((value: number[]) => {
    if (videoRef.current && value.length > 0) {
      videoRef.current.currentTime = value[0];
      setCurrentTime(value[0]);
    }
  }, []);

  const seekToTime = useCallback((timestampStr: string) => {
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
  }, [isPlaying]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
    };

    const handlePlayEvent = () => {
      setIsPlaying(true);
    };

    const handlePauseEvent = () => {
      setIsPlaying(false);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlayEvent);
    video.addEventListener('pause', handlePauseEvent);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlayEvent);
      video.removeEventListener('pause', handlePauseEvent);
    };
  }, []);

  return {
    videoRef,
    isPlaying,
    isMuted,
    currentTime,
    videoDuration,
    handlePlayVideo,
    handleToggleMute,
    handleSeek,
    seekToTime
  };
}
