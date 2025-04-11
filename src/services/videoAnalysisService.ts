
// Mock service for frontend-only functionality

export const analysisStages = [
  "Initializing analysis",
  "Processing video content",
  "Analyzing engagement patterns",
  "Extracting key moments",
  "Generating recommendations",
  "Finalizing report"
];

export const videoAnalysisService = {
  analyzeVideo: async (videoUrl: string, options: any) => {
    // This is a mock implementation for frontend-only functionality
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          video_url: videoUrl,
          engagement_score: Math.floor(Math.random() * 40) + 60,
          virality_score: Math.floor(Math.random() * 30) + 70,
          trend_score: Math.floor(Math.random() * 25) + 75,
          trending_hashtags: [
            "#trending",
            "#viral",
            "#content",
            "#creativity"
          ],
          trend_opportunities: [
            "Add trending audio to your content",
            "Incorporate current events references",
            "Use popular challenge formats",
            "Respond to trending topics in your niche"
          ]
        });
      }, 3000);
    });
  },
  
  getAnalysisStatus: async (analysisId: string) => {
    return {
      status: "completed",
      progress: 100
    };
  }
};
