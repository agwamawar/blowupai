
import { useState, useEffect } from "react";

interface ThumbnailGeneratorProps {
  videoUrl: string;
  onThumbnailGenerated: (thumbnailUrl: string | null) => void;
}

export function ThumbnailGenerator({ videoUrl, onThumbnailGenerated }: ThumbnailGeneratorProps) {
  useEffect(() => {
    if (!videoUrl) {
      onThumbnailGenerated(null);
      return;
    }
    
    const video = document.createElement('video');
    video.crossOrigin = "anonymous";
    video.src = videoUrl;
    video.muted = true;
    
    video.onloadedmetadata = () => {
      const randomPosition = video.duration * (0.2 + Math.random() * 0.6);
      video.currentTime = randomPosition;
    };
    
    video.onseeked = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        onThumbnailGenerated(dataUrl);
      }
      
      video.remove();
    };
    
    video.onerror = () => {
      console.error("Error generating thumbnail");
      onThumbnailGenerated(null);
    };
  }, [videoUrl, onThumbnailGenerated]);

  return null;
}
