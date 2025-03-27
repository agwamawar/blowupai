
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
    
    let isActive = true;
    const video = document.createElement('video');
    video.crossOrigin = "anonymous";
    video.preload = "auto"; // Use auto instead of metadata for faster loading
    video.muted = true;
    
    // Set a timeout to make sure we don't hang indefinitely
    const timeoutId = setTimeout(() => {
      if (isActive) {
        console.warn("Thumbnail generation timed out");
        onThumbnailGenerated(null); // Provide null to allow UI to proceed
      }
    }, 5000); // 5 second timeout
    
    video.onloadeddata = () => {
      // Try to seek to near the beginning for a faster thumbnail
      const seekPosition = Math.min(1, video.duration * 0.1);
      video.currentTime = seekPosition;
    };
    
    video.onloadedmetadata = () => {
      // As a fallback, if seeking doesn't work properly
      if (video.readyState >= 2) {
        const randomPosition = video.duration * (0.2 + Math.random() * 0.6);
        video.currentTime = randomPosition;
      }
    };
    
    video.onseeked = () => {
      if (!isActive) return;
      
      clearTimeout(timeoutId);
      
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth || 480;
        canvas.height = video.videoHeight || 848;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.8); // Lower quality for faster processing
          onThumbnailGenerated(dataUrl);
        } else {
          onThumbnailGenerated(null);
        }
      } catch (err) {
        console.error("Error generating thumbnail:", err);
        onThumbnailGenerated(null);
      } finally {
        video.remove();
      }
    };
    
    video.onerror = () => {
      if (!isActive) return;
      clearTimeout(timeoutId);
      console.error("Error loading video for thumbnail");
      onThumbnailGenerated(null);
      video.remove();
    };
    
    video.src = videoUrl;
    
    return () => {
      isActive = false;
      clearTimeout(timeoutId);
      video.remove();
    };
  }, [videoUrl, onThumbnailGenerated]);

  return null;
}
