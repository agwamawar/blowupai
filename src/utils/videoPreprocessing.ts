import { extractVideoFrames } from '../services/videoAnalysisService';

export interface ProcessedVideoData {
  frames: string[];
  metadata: {
    duration: number;
    fps: number;
    dimensions: {
      width: number;
      height: number;
    };
    format: string;
  };
}

export const preprocessVideoData = async (file: File): Promise<ProcessedVideoData> => {
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

export { extractVideoFrames };
