
import { useState, useEffect, useCallback } from 'react';

interface ThumbnailGeneratorProps {
  videoUrl: string;
  onThumbnailGenerated: (url: string | null) => void;
}

export function ThumbnailGenerator({ videoUrl, onThumbnailGenerated }: ThumbnailGeneratorProps) {
  useEffect(() => {
    if (!videoUrl) {
      onThumbnailGenerated(null);
      return;
    }

    const video = document.createElement('video');
    video.src = videoUrl;
    video.crossOrigin = 'anonymous';
    video.muted = true;
    
    // Try to generate thumbnail at 25% of the video
    video.addEventListener('loadeddata', () => {
      try {
        video.currentTime = video.duration * 0.25;
      } catch (error) {
        console.error('Error setting current time:', error);
        onThumbnailGenerated(null);
      }
    });

    // Generate thumbnail once the time has been changed
    video.addEventListener('seeked', () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL('image/jpeg');
          onThumbnailGenerated(thumbnailUrl);
        } else {
          onThumbnailGenerated(null);
        }
      } catch (error) {
        console.error('Error generating thumbnail:', error);
        onThumbnailGenerated(null);
      }
    });

    // Handle errors
    video.addEventListener('error', () => {
      console.error('Error loading video for thumbnail generation');
      onThumbnailGenerated(null);
    });

    return () => {
      video.pause();
      video.src = '';
      video.load();
    };
  }, [videoUrl, onThumbnailGenerated]);

  return null;
}
