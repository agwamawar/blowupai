
import { AgentOrchestrator } from './agents/AgentOrchestrator';

const orchestrator = new AgentOrchestrator();

/**
 * Creates a URL for the video file for local processing
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
      resolve(videoUrl);
    };
    
    video.onerror = () => {
      URL.revokeObjectURL(videoUrl);
      reject(new Error("Failed to load the video. The format may not be supported."));
    };
    
    video.src = videoUrl;
  });
};

export const analysisStages = [
  'Validating video format...',
  'Reading metadata...',
  'Detecting visual elements...',
  'Analyzing audio quality...',
  'Scanning text content...',
  'Evaluating platform compliance...',
  'Generating engagement metrics...',
  'Finalizing analysis...'
];

/**
 * Extracts frames from a video for AI analysis
 * This is a placeholder for actual frame extraction functionality
 */
export const extractVideoFrames = async (videoUrl: string, numFrames: number = 5): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    video.preload = 'auto';
    
    video.onloadeddata = () => {
      try {
        const frames: string[] = [];
        const duration = video.duration;
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        // Extract frames at equal intervals
        for (let i = 0; i < numFrames; i++) {
          const time = (duration / numFrames) * i;
          video.currentTime = time;
          
          // Use setTimeout to allow the video to seek
          setTimeout(() => {
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            frames.push(canvas.toDataURL('image/jpeg'));
            
            if (frames.length === numFrames) {
              console.log(`Extracted ${frames.length} frames from video`);
              resolve(frames);
            }
          }, 100 * i);
        }
      } catch (error) {
        console.error("Error extracting video frames:", error);
        reject(error);
      }
    };
    
    video.onerror = () => {
      reject(new Error("Error loading video for frame extraction"));
    };
    
    video.src = videoUrl;
  });
};
