
import { ProcessedVideoData } from '@/types/video';

export const preprocessVideo = async (file: File): Promise<ProcessedVideoData> => {
  const video = document.createElement('video');
  video.src = URL.createObjectURL(file);
  
  await new Promise((resolve) => {
    video.onloadedmetadata = resolve;
  });
  
  const metadata = {
    duration: video.duration,
    fps: 10, // Target FPS for analysis
    dimensions: {
      width: Math.min(video.videoWidth, 480),
      height: Math.min(video.videoHeight, 720)
    },
    format: file.type
  };
  
  const frames = await extractVideoFrames(video.src, metadata.fps);
  URL.revokeObjectURL(video.src);
  
  return { frames, metadata };
};

const extractVideoFrames = async (videoSrc: string, targetFps: number): Promise<string[]> => {
  const video = document.createElement('video');
  video.src = videoSrc;
  
  await new Promise((resolve) => {
    video.onloadeddata = resolve;
  });
  
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  
  canvas.width = Math.min(video.videoWidth, 480);
  canvas.height = Math.min(video.videoHeight, 720);
  
  const frameCount = Math.min(Math.floor(video.duration * targetFps), 50); // Cap at 50 frames
  const frames: string[] = [];
  
  for (let i = 0; i < frameCount; i++) {
    video.currentTime = (i / frameCount) * video.duration;
    await new Promise(resolve => setTimeout(resolve, 50)); // Allow time for seeking
    
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      frames.push(canvas.toDataURL('image/jpeg', 0.7));
    }
  }
  
  return frames;
};
