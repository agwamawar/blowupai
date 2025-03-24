/**
 * Services for video analysis and processing
 */

import { AgentOrchestrator } from './agents/AgentOrchestrator';

const orchestrator = new AgentOrchestrator();

export const analysisStages = [
  'Setting up video analysis...',
  'Analyzing video content...',
  'Extracting key frames...',
  'Running trend analysis...',
  'Calculating virality potential...',
  'Generating recommendations...'
];

/**
 * Gets a URL for a video file
 */
export const getVideoUrl = async (file: File): Promise<string> => {
  return new Promise((resolve) => {
    const video = document.createElement('video');
    video.preload = 'metadata';

    video.onloadedmetadata = () => {
      console.log(`Video loaded successfully. Duration: ${video.duration}s`);

      // Additional validation for video content
      if (video.duration < 1) {
        throw new Error('Video is too short for analysis');
      }
      if (video.duration > 600) {
        throw new Error('Video exceeds maximum duration of 10 minutes');
      }

      URL.revokeObjectURL(video.src);
      resolve(URL.createObjectURL(file));
    };

    video.onerror = () => {
      throw new Error('Failed to load video file');
    };

    video.src = URL.createObjectURL(file);
  });
};

/**
 * Extracts frames from a video at a specified frames per second (FPS) rate
 * with enhanced detection of key moments like scene changes and fast cuts
 */
import { AgentOrchestrator } from './agents/AgentOrchestrator';

const orchestrator = new AgentOrchestrator();

export const extractVideoFrames = async (
  videoUrl: string, 
  framesPerSecond: number = 10,
  detectSceneChanges: boolean = false
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';

    // Create canvas for frame extraction
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    if (!context) {
      reject(new Error('Failed to get canvas context'));
      return;
    }

    // Array to store frame data URLs
    const frames: string[] = [];

    video.addEventListener('loadedmetadata', () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Calculate frame interval based on FPS
      const frameInterval = 1 / framesPerSecond;
      let currentTime = 0;

      const captureFrame = () => {
        if (currentTime <= video.duration) {
          video.currentTime = currentTime;
          currentTime += frameInterval;
        } else {
          resolve(frames);
        }
      };

      video.onseeked = () => {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const frame = canvas.toDataURL('image/jpeg', 0.8);

        if (detectSceneChanges) {
          // Only add frame if it's significantly different from previous
          if (frames.length === 0 || isNewScene(frames[frames.length - 1], frame)) {
            frames.push(frame);
          }
        } else {
          frames.push(frame);
        }

        captureFrame();
      };

      captureFrame();
    });

    video.src = videoUrl;
    video.load();
  });
};

// Utility function to detect scene changes
function isNewScene(prevFrame: string, currentFrame: string): boolean {
  // Simplified pixel difference calculation
  const threshold = 0.15; // Adjust this value to control sensitivity
  const diffRatio = calculateFrameDifference(prevFrame, currentFrame);
  return diffRatio > threshold;
}

function calculateFrameDifference(frame1: string, frame2: string): number {
  // Basic implementation - could be enhanced for better accuracy
  const img1 = new Image();
  const img2 = new Image();
  img1.src = frame1;
  img2.src = frame2;

  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  if (!context) return 0;

  canvas.width = 16; // Reduced size for performance
  canvas.height = 16;

  context.drawImage(img1, 0, 0, 16, 16);
  const data1 = context.getImageData(0, 0, 16, 16).data;

  context.drawImage(img2, 0, 0, 16, 16);
  const data2 = context.getImageData(0, 0, 16, 16).data;

  let diffCount = 0;
  const length = data1.length;

  for (let i = 0; i < length; i += 4) {
    if (Math.abs(data1[i] - data2[i]) > 30 ||
        Math.abs(data1[i+1] - data2[i+1]) > 30 ||
        Math.abs(data1[i+2] - data2[i+2]) > 30) {
      diffCount++;
    }
  }

  return diffCount / (length / (16 * 4));
}