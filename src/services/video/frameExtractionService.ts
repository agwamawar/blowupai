
/**
 * Service for video frame extraction
 */

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

/**
 * Extracts frames from a video at a specified frames per second (FPS) rate
 * with enhanced detection of key moments like scene changes and fast cuts
 */
export const extractVideoFrames = async (
  videoUrl: string, 
  framesPerSecond: number = 10,
  detectKeyMoments: boolean = true
): Promise<string[]> => {
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
        console.log(`Extracting frames at ${framesPerSecond} FPS`);
        
        // Calculate total frames to extract based on FPS and duration
        const totalFramesToExtract = Math.min(
          Math.ceil(duration * framesPerSecond),
          300 // Cap at 300 frames to prevent memory issues with very long videos
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
              const frameData = canvas.toDataURL('image/jpeg', 0.85);
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
              
              const frameData = canvas.toDataURL('image/jpeg', 0.85);
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
