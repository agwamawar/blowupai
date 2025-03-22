
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
 * Extracts frames from a video for AI analysis
 * Implementation enhanced for reliable frame extraction
 */
export const extractVideoFrames = async (videoUrl: string, numFrames: number = 5): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    
    const frames: string[] = [];
    let loadingError = false;
    
    // Set timeout to catch stalled video loading
    const loadTimeout = setTimeout(() => {
      loadingError = true;
      reject(new Error("Video frame extraction timed out"));
    }, 15000); // 15 second timeout
    
    video.onloadeddata = async () => {
      clearTimeout(loadTimeout);
      
      if (loadingError) return;
      
      try {
        const duration = video.duration;
        
        if (duration === 0) {
          reject(new Error("Video has zero duration"));
          return;
        }
        
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        console.log(`Video dimensions: ${canvas.width}x${canvas.height}, duration: ${duration}s`);
        
        // Use strategic frame selection - include start, middle and end frames
        const extractFrame = (time: number): Promise<string> => {
          return new Promise((resolve) => {
            video.currentTime = Math.min(time, duration - 0.1); // Avoid seeking past the end
            
            const seekTimeout = setTimeout(() => {
              console.warn(`Seek timeout at ${time}s, using current frame`);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL('image/jpeg', 0.85));
            }, 2000);
            
            video.onseeked = () => {
              clearTimeout(seekTimeout);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              resolve(canvas.toDataURL('image/jpeg', 0.85));
            };
          });
        };
        
        // Extract strategic frames - beginning, spaced through middle, and end
        const frameTimes = [];
        
        // Always include first and last frame 
        frameTimes.push(0); // First frame
        
        // Add middle frames
        for (let i = 1; i < numFrames - 1; i++) {
          frameTimes.push((duration / numFrames) * i);
        }
        
        // Add last frame if we have room
        if (numFrames > 1) {
          frameTimes.push(Math.max(0, duration - 0.1)); // Last frame
        }
        
        console.log(`Extracting frames at times:`, frameTimes);
        
        // Extract frames sequentially to avoid race conditions
        for (const time of frameTimes) {
          const frameData = await extractFrame(time);
          frames.push(frameData);
          console.log(`Extracted frame at ${time}s`);
        }
        
        if (frames.length === 0) {
          reject(new Error("No frames could be extracted from the video"));
        } else {
          console.log(`Successfully extracted ${frames.length} frames from video`);
          resolve(frames);
        }
      } catch (error) {
        console.error("Error extracting video frames:", error);
        reject(error);
      }
    };
    
    video.onerror = (e) => {
      clearTimeout(loadTimeout);
      console.error("Video loading error during frame extraction:", e);
      reject(new Error("Error loading video for frame extraction"));
    };
    
    video.src = videoUrl;
    video.load(); // Force load
  });
};
