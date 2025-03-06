
// Mock video analysis service

export const analysisStages = [
  "Validating video format",
  "Reading metadata",
  "Detecting visual elements",
  "Analyzing audio quality",
  "Scanning text content",
  "Evaluating platform compliance",
  "Generating engagement metrics",
  "Finalizing analysis"
];

// Create a video URL without uploading to server (for demo)
export const getVideoUrl = async (file: File): Promise<string> => {
  // For quick demo purposes, just create a local object URL
  return URL.createObjectURL(file);
};

// Generate mock analysis data
export const generateMockAnalysisData = (videoUrl: string, platform: string, contentType: string, analysisPeriod: number) => {
  const sessionId = Date.now().toString();
  
  return {
    id: sessionId,
    video_url: videoUrl,
    platform,
    content_type: contentType,
    status: 'completed',
    analysis_period: analysisPeriod,
    engagement_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
    engagement_prediction: {
      estimated_likes: Math.floor(Math.random() * 5000) + 3000,
      estimated_shares: Math.floor(Math.random() * 1000) + 500,
      watch_time: "80% of video",
      best_segments: [
        { timestamp: "0:05", reason: "Strong viewer retention" },
        { timestamp: "0:18", reason: "High engagement point" },
        { timestamp: "0:32", reason: "Peak audience interest" }
      ]
    },
    platform_analysis: {
      compliance: {
        "Video Length": "Optimal",
        "Format": "Vertical (9:16)",
        "Content Type": contentType
      },
      guidelines: {
        "optimalLength": "15-60 seconds",
        "recommendedFormat": "9:16 vertical",
        "bestPostingTime": "6-9 PM local time"
      },
      recommendations: [
        "Add more on-screen text overlays for higher retention",
        "Use trending sounds to increase discoverability",
        "Create a stronger hook in the first 3 seconds"
      ]
    },
    video_metadata: {
      duration: "0:45"
    },
    visual_quality: {
      lighting: "Good",
      stability: "Average",
      clarity: "Good"
    },
    audio_analysis: {
      clarity: "Good",
      background_noise: "Low",
      emotion: "Neutral/Positive"
    },
    content_analysis: {
      objects: ["Person", "Product", "Text", "Graphics"],
      text_detected: ["Title", "Brand Name", "Call to Action"],
      scene_transitions: "Smooth transitions at 0:12, 0:25, and 0:38"
    }
  };
};
