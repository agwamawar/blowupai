
/**
 * Formats time in seconds to MM:SS format
 * @param time Time in seconds
 * @returns Formatted time string in MM:SS format
 */
export const formatVideoTime = (time: number): string => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

/**
 * Calculates the estimated frame rate of a video
 * @param videoElement HTML Video Element with loaded metadata
 * @param durationToCheck Duration in seconds to check for frames
 * @returns Estimated frames per second
 */
export const estimateFrameRate = async (videoElement: HTMLVideoElement, durationToCheck = 5): Promise<number> => {
  return new Promise((resolve) => {
    // Default to common frame rates if detection fails
    const defaultFrameRate = 30;
    
    // If video isn't ready, return default
    if (!videoElement.videoWidth || !videoElement.duration) {
      resolve(defaultFrameRate);
      return;
    }
    
    // Set a safety timeout
    const timeout = setTimeout(() => {
      console.log("Frame rate estimation timed out, using default");
      resolve(defaultFrameRate);
    }, 3000);
    
    try {
      // Create canvas for frame comparison
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        clearTimeout(timeout);
        resolve(defaultFrameRate);
        return;
      }
      
      canvas.width = 32;  // Use small dimensions for performance
      canvas.height = 32;
      
      let lastImageData: ImageData | null = null;
      let frameCount = 0;
      let lastTime = 0;
      const checkInterval = 1000 / 120; // Check up to 120fps
      const maxTimeToCheck = Math.min(durationToCheck, videoElement.duration / 4);
      const startTime = 0.1; // Start slightly into the video
      
      videoElement.currentTime = startTime;
      
      const seekedHandler = () => {
        const currentTime = videoElement.currentTime;
        
        // Draw current frame to canvas
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Count as new frame if it's different from the last one or it's the first frame
        if (!lastImageData || !areImageDatasEqual(lastImageData, imageData)) {
          frameCount++;
          lastImageData = imageData;
        }
        
        // Calculate time elapsed
        const timeElapsed = currentTime - startTime;
        
        // Continue if we haven't reached the check duration
        if (timeElapsed < maxTimeToCheck) {
          // Set next time to check, avoid exact frame timing
          const nextTime = startTime + (timeElapsed + checkInterval / 1000 + Math.random() * 0.01);
          lastTime = currentTime;
          videoElement.currentTime = nextTime;
        } else {
          // Done checking, calculate FPS
          videoElement.removeEventListener('seeked', seekedHandler);
          clearTimeout(timeout);
          
          const estimatedFps = frameCount / timeElapsed;
          console.log(`Estimated ${frameCount} frames over ${timeElapsed.toFixed(2)}s = ${estimatedFps.toFixed(1)} FPS`);
          
          // Map to common frame rates if close
          const commonRates = [23.976, 24, 25, 29.97, 30, 50, 60];
          const closestRate = commonRates.reduce((prev, curr) => 
            Math.abs(curr - estimatedFps) < Math.abs(prev - estimatedFps) ? curr : prev
          );
          
          // If we're within 10% of a common rate, use that
          const finalRate = Math.abs(closestRate - estimatedFps) < estimatedFps * 0.1 
            ? closestRate 
            : Math.round(estimatedFps * 10) / 10;
            
          resolve(finalRate);
        }
      };
      
      videoElement.addEventListener('seeked', seekedHandler);
    } catch (error) {
      console.error("Error estimating frame rate:", error);
      clearTimeout(timeout);
      resolve(defaultFrameRate);
    }
  });
};

/**
 * Compare two ImageData objects to see if they represent the same frame
 */
function areImageDatasEqual(data1: ImageData, data2: ImageData): boolean {
  if (data1.width !== data2.width || data1.height !== data2.height) {
    return false;
  }
  
  const pixels1 = data1.data;
  const pixels2 = data2.data;
  
  // Sample pixels for faster comparison
  const pixelCount = pixels1.length;
  const sampleSize = Math.min(100, pixelCount / 4);
  const sampleStep = Math.floor(pixelCount / 4 / sampleSize);
  
  let differences = 0;
  const threshold = 10; // Allow small differences due to compression
  
  for (let i = 0; i < pixelCount; i += sampleStep * 4) {
    const r1 = pixels1[i];
    const g1 = pixels1[i + 1];
    const b1 = pixels1[i + 2];
    
    const r2 = pixels2[i];
    const g2 = pixels2[i + 1];
    const b2 = pixels2[i + 2];
    
    if (Math.abs(r1 - r2) > threshold || 
        Math.abs(g1 - g2) > threshold || 
        Math.abs(b1 - b2) > threshold) {
      differences++;
    }
  }
  
  // Consider frames different if more than 10% of sampled pixels changed
  return differences / sampleSize < 0.1;
}

/**
 * Checks if a video is valid for analysis
 * @param file Video file to check
 * @returns Promise resolving to validation result with metadata
 */
export const validateVideo = (file: File): Promise<{
  isValid: boolean;
  message?: string;
  metadata?: {
    duration: number;
    resolution: string;
    fileSize: number;
    format: string;
  }
}> => {
  return new Promise((resolve) => {
    // Check file size (100MB limit)
    const MAX_SIZE = 100 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      resolve({
        isValid: false,
        message: `File too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Maximum size is 100MB.`
      });
      return;
    }
    
    // Check file type
    if (!file.type.startsWith('video/')) {
      resolve({
        isValid: false,
        message: `Invalid file type: ${file.type}. Please upload a video file.`
      });
      return;
    }
    
    // Create video element to check metadata
    const video = document.createElement('video');
    video.preload = 'metadata';
    
    // Set timeout for loading
    const timeout = setTimeout(() => {
      resolve({
        isValid: false,
        message: 'Video loading timed out. The file may be corrupted or too large.'
      });
    }, 10000);
    
    video.onloadedmetadata = () => {
      clearTimeout(timeout);
      
      const duration = video.duration;
      
      // Check duration (1-300 seconds)
      if (duration < 1) {
        resolve({
          isValid: false,
          message: 'Video is too short. Minimum duration is 1 second.'
        });
        return;
      }
      
      if (duration > 300) {
        resolve({
          isValid: false,
          message: `Video is too long (${Math.floor(duration)}s). Maximum duration is 5 minutes.`
        });
        return;
      }
      
      // Check resolution
      if (video.videoWidth < 320 || video.videoHeight < 240) {
        resolve({
          isValid: false, 
          message: `Video resolution is too low (${video.videoWidth}x${video.videoHeight}). Minimum is 320x240.`
        });
        return;
      }
      
      // Video is valid, return metadata
      resolve({
        isValid: true,
        metadata: {
          duration,
          resolution: `${video.videoWidth}x${video.videoHeight}`,
          fileSize: file.size,
          format: file.type
        }
      });
    };
    
    video.onerror = () => {
      clearTimeout(timeout);
      resolve({
        isValid: false,
        message: 'Failed to load video. The format may be unsupported or the file may be corrupted.'
      });
    };
    
    video.src = URL.createObjectURL(file);
  });
};
