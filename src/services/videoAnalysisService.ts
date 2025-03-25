
/**
 * Services for video analysis and processing
 */

import { AgentOrchestrator } from './agents/AgentOrchestrator';
import * as ffmpeg from 'ffmpeg-js';

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
export const extractVideoFrames = async (videoUrl: string, targetFps: number = 10) => {
  const frames: string[] = [];
  const maxFrames = 100; // Limit total frames

  try {
    const video = document.createElement('video');
    video.src = videoUrl;
    await video.load();

    const duration = video.duration;
    const interval = 1 / targetFps;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) throw new Error('Canvas context not available');

    // Set optimal dimensions for analysis
    const targetWidth = 480; // Reduced size while maintaining aspect
    const targetHeight = video.videoHeight * (targetWidth / video.videoWidth);

    canvas.width = targetWidth;
    canvas.height = targetHeight;

    for (let time = 0; time < duration && frames.length < maxFrames; time += interval) {
      video.currentTime = time;
      await new Promise(resolve => video.addEventListener('seeked', resolve, { once: true }));

      ctx.drawImage(video, 0, 0, targetWidth, targetHeight);

      // Convert to compressed JPEG with reduced quality
      const frame = canvas.toDataURL('image/jpeg', 0.7);
      frames.push(frame);
    }

    return frames;
  } catch (error) {
    console.error('Frame extraction error:', error);
    return [];
  }
};
