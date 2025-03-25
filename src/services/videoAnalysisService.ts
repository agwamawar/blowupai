
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
<<<<<<< HEAD
import { AgentOrchestrator } from './agents/AgentOrchestrator';

const orchestrator = new AgentOrchestrator();

export const extractVideoFrames = async (
  videoUrl: string, 
  framesPerSecond: number = 10,
  detectSceneChanges: boolean = false
=======
export const extractVideoFrames = async (
  videoUrl: string, 
  framesPerSecond: number = 5, // Reduced from 10 to 5
  detectKeyMoments: boolean = true
>>>>>>> d31c82e (Checkpoint before assistant change: Refactor video analysis pipeline and implement Gemini-based trend analysis.  Reduce frame extraction rate and improve error handling.)
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
<<<<<<< HEAD

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
=======
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
        console.log(`Extracting frames at ${framesPerSecond} FPS`);
        
        // Calculate total frames to extract based on FPS and duration
        // Reduce max frames from 300 to 100 to avoid payload issues
        const totalFramesToExtract = Math.min(
          Math.ceil(duration * framesPerSecond),
          100 // Cap at 100 frames to prevent memory and payload size issues
        );
        
        // Distribute frames evenly throughout the video
        const frameInterval = duration / totalFramesToExtract;
        
        // Store previous frame data for scene change detection
        let previousFrameData: ImageData | null = null;
        
        const extractFrame = async (time: number): Promise<{ 
          frameData: string;
          isKeyMoment: boolean;
          diff: number;
        }> => {
          return new Promise((resolve) => {
            video.currentTime = Math.min(time, duration - 0.1); // Avoid seeking past the end
            
            const seekTimeout = setTimeout(() => {
              console.warn(`Seek timeout at ${time}s, using current frame`);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              // Reduce JPEG quality from 0.85 to 0.75 to make frames smaller
              const frameData = canvas.toDataURL('image/jpeg', 0.75); 
              resolve({ 
                frameData, 
                isKeyMoment: false,
                diff: 0
              });
            }, 2000);
            
            video.onseeked = () => {
              clearTimeout(seekTimeout);
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              
              // Scene change detection
              let isKeyMoment = false;
              let diff = 0;
              
              if (detectKeyMoments && previousFrameData) {
                // Get current frame data for comparison
                const currentFrameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                
                // Compare with previous frame to detect significant changes
                diff = calculateFrameDifference(previousFrameData, currentFrameData);
                isKeyMoment = diff > 0.15; // Threshold for key moment detection
                
                // Update previous frame data
                previousFrameData = currentFrameData;
              } else if (detectKeyMoments) {
                // First frame, set as previous
                previousFrameData = ctx.getImageData(0, 0, canvas.width, canvas.height);
              }
              
              // Reduce JPEG quality from 0.85 to 0.75 to make frames smaller
              const frameData = canvas.toDataURL('image/jpeg', 0.75);
              resolve({ 
                frameData, 
                isKeyMoment,
                diff
              });
            };
          });
        };
        
        // Extract frames sequentially to avoid race conditions
        const frameTimes = [];
        let keyMomentCount = 0;
        
        // Always include first and last frame
        frameTimes.push(0); // First frame
        
        // Add evenly distributed frames in between
        for (let i = 1; i < totalFramesToExtract - 1; i++) {
          frameTimes.push(i * frameInterval);
        }
        
        // Add last frame if we have room
        if (totalFramesToExtract > 1) {
          frameTimes.push(Math.max(0, duration - 0.1)); // Last frame
        }
        
        console.log(`Planned frame extraction at ${frameTimes.length} timestamps`);
        
        // Extract frames sequentially to avoid race conditions
        for (const time of frameTimes) {
          const { frameData, isKeyMoment, diff } = await extractFrame(time);
          frames.push(frameData);
          
          if (isKeyMoment) {
            keyMomentCount++;
            console.log(`Detected key moment at ${time.toFixed(2)}s (diff: ${diff.toFixed(3)})`);
          }
        }
        
        if (frames.length === 0) {
          reject(new Error("No frames could be extracted from the video"));
        } else {
          console.log(`Successfully extracted ${frames.length} frames from video (including ${keyMomentCount} key moments)`);
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

/**
 * Calculates the visual difference between two frames
 * Used to detect scene changes and key moments
 */
function calculateFrameDifference(prevFrame: ImageData, currentFrame: ImageData): number {
  const prevData = prevFrame.data;
  const currData = currentFrame.data;
  const length = prevData.length;
  let diffCount = 0;
  
  // Sample pixels at regular intervals (every 16 pixels) for performance
  for (let i = 0; i < length; i += 16 * 4) {
    // Compare RGB values (skip alpha)
    const rDiff = Math.abs(prevData[i] - currData[i]);
    const gDiff = Math.abs(prevData[i + 1] - currData[i + 1]);
    const bDiff = Math.abs(prevData[i + 2] - currData[i + 2]);
    
    // If any channel has significant difference, count as changed pixel
    if (rDiff > 30 || gDiff > 30 || bDiff > 30) {
      diffCount++;
    }
  }
  
  // Return percentage of pixels that changed significantly
  return diffCount / (length / (16 * 4));
}

>>>>>>> d31c82e (Checkpoint before assistant change: Refactor video analysis pipeline and implement Gemini-based trend analysis.  Reduce frame extraction rate and improve error handling.)
