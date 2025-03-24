/**
 * Services for video analysis and processing
 */

import { AgentOrchestrator } from './agents/AgentOrchestrator';
import * as ffmpeg from 'ffmpeg-js';
import { ProcessedVideoData } from '@/types/video';

const orchestrator = new AgentOrchestrator();

/**
 * Creates a URL for the video file for local processing
 * and validates that the video can be played
 */
export const getVideoUrl = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error("No video file provided");
  }
  
  console.log(`Processing video: ${file.name}, size: ${file.size}, type: ${file.type}`);
  
  // Create a URL for the video file that can be used by the browser
  const videoUrl = URL.createObjectURL(file);
  
  return new Promise((resolve, reject) => {
    // Verify the video can be loaded
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    video.onloadedmetadata = () => {
      console.log(`Video loaded successfully. Duration: ${video.duration}s`);
      
      // Additional validation for video content
      if (video.duration === 0 || video.videoWidth === 0 || video.videoHeight === 0) {
        URL.revokeObjectURL(videoUrl);
        reject(new Error("Invalid video content. The file may be corrupted or empty."));
        return;
      }
      
      resolve(videoUrl);
    };
    
    video.onerror = (e) => {
      console.error("Video loading error:", e);
      URL.revokeObjectURL(videoUrl);
      reject(new Error("Failed to load the video. The format may not be supported."));
    };
    
    // Set timeout to catch videos that stall
    const timeout = setTimeout(() => {
      video.pause();
      URL.revokeObjectURL(videoUrl);
      reject(new Error("Video loading timed out. The file may be too large or corrupted."));
    }, 10000); // 10 second timeout
    
    video.onloadeddata = () => {
      clearTimeout(timeout);
    };
    
    video.src = videoUrl;
  });
};

export const analysisStages = [
  'Validating video format...',
  'Reading metadata...',
  'Extracting video frames...',
  'Analyzing visual elements...',
  'Evaluating audio quality...',
  'Scanning content features...',
  'Generating engagement metrics...',
  'Finalizing analysis...'
];

/**
 * Extracts frames from a video at a specified frames per second (FPS) rate
 * with enhanced detection of key moments like scene changes and fast cuts
 */
export const extractVideoFrames = async (
  videoUrl: string, 
  targetFps: number = 10
) => {
  const frames: string[] = [];
  const maxFrames = 100; // Limit total frames

  return new Promise<string[]>((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoUrl;

    video.onloadedmetadata = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');

      if (!ctx) {
        reject(new Error("Could not get canvas context"));
        return;
      }

      // Set reasonable max dimensions while maintaining aspect ratio
      const maxDim = 720;
      const aspectRatio = video.videoWidth / video.videoHeight;

      if (aspectRatio > 1) {
        canvas.width = maxDim;
        canvas.height = maxDim / aspectRatio;
      } else {
        canvas.height = maxDim;
        canvas.width = maxDim * aspectRatio;
      }

      // Calculate frame interval based on video duration and target FPS
      const frameInterval = Math.max(
        1 / targetFps,
        video.duration / maxFrames
      );

      let currentTime = 0;
      let previousFrame: ImageData | null = null;

      const processFrame = () => {
        if (currentTime > video.duration) {
          resolve(frames);
          return;
        }

        video.currentTime = currentTime;

        video.onseeked = () => {
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

          // Get current frame data
          const frameData = ctx.getImageData(0, 0, canvas.width, canvas.height);

          // Check if frame is significantly different from previous
          let shouldKeepFrame = true;
          if (previousFrame) {
            const diff = calculateFrameDifference(frameData, previousFrame);
            shouldKeepFrame = diff > 0.1; // Threshold for frame difference
          }

          if (shouldKeepFrame) {
            frames.push(canvas.toDataURL('image/jpeg', 0.8));
            previousFrame = frameData;
          }

          currentTime += frameInterval;
          processFrame();
        };
      };

      processFrame();
    };

    video.onerror = () => {
      reject(new Error("Error loading video for frame extraction"));
    };
  });
};

function calculateFrameDifference(frame1: ImageData, frame2: ImageData): number {
  const data1 = frame1.data;
  const data2 = frame2.data;
  let diff = 0;

  for (let i = 0; i < data1.length; i += 4) {
    diff += Math.abs(data1[i] - data2[i]); // Red
    diff += Math.abs(data1[i + 1] - data2[i + 1]); // Green
    diff += Math.abs(data1[i + 2] - data2[i + 2]); // Blue
  }

  return diff / (frame1.width * frame1.height * 3);
}