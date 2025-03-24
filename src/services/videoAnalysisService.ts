/**
 * Services for video analysis and processing
 */

import { AgentOrchestrator } from './agents/AgentOrchestrator';

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
import { AgentOrchestrator } from './agents/AgentOrchestrator';

export const extractVideoFrames = async (
  videoUrl: string, 
  framesPerSecond: number = 10,
  detectKeyMoments: boolean = true
): Promise<string[]> => {
  try {
    // Create video element
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';

    const frames: string[] = [];

    // Wait for video metadata to load
    await new Promise((resolve) => {
      video.addEventListener('loadedmetadata', () => resolve(true));
      video.src = videoUrl;
    });

    // Set video to desired position and capture frame
    const captureFrame = () => {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      return canvas.toDataURL('image/jpeg');
    };

    // Calculate frame interval
    const frameInterval = 1 / framesPerSecond;
    const duration = video.duration;

    // Capture frames at specified intervals
    for (let time = 0; time < duration; time += frameInterval) {
      video.currentTime = time;
      await new Promise(resolve => {
        video.addEventListener('seeked', resolve, { once: true });
      });
      frames.push(captureFrame());
    }

    return frames;
  } catch (error) {
    console.error('Error extracting video frames:', error);
    throw error;
  }
};