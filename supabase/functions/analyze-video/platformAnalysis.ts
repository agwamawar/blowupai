export interface PlatformGuidelines {
  idealDuration: string;
  recommendedAspectRatio: string;
  optimalCaptions: string;
  soundRecommendation: string;
  hashtagLimit: string;
}

export function getPlatformGuidelines(platform: string): PlatformGuidelines {
  const guidelines = {
    tiktok: {
      idealDuration: "15-60 seconds",
      recommendedAspectRatio: "9:16",
      optimalCaptions: "2-3 lines",
      soundRecommendation: "Original sound or trending music",
      hashtagLimit: "3-5 relevant hashtags",
    },
    instagram: {
      idealDuration: "30-60 seconds",
      recommendedAspectRatio: "4:5 or 9:16",
      optimalCaptions: "Up to 125 characters",
      soundRecommendation: "Background music optional",
      hashtagLimit: "5-10 relevant hashtags",
    },
    facebook: {
      idealDuration: "1-3 minutes",
      recommendedAspectRatio: "16:9 or 1:1",
      optimalCaptions: "Full sentences, longer descriptions",
      soundRecommendation: "Captions recommended",
      hashtagLimit: "2-3 relevant hashtags",
    }
  };
  
  return guidelines[platform as keyof typeof guidelines] || guidelines.tiktok;
}

export function generateHeatmapData(duration: number): Array<{ time: string; engagement: number }> {
  const heatmapPoints = Math.max(5, Math.min(10, Math.ceil(duration)));
  return Array.from({ length: heatmapPoints }, (_, i) => ({
    time: `${Math.floor(i * duration / heatmapPoints)}s`,
    engagement: Math.floor(Math.random() * 40) + 60,
  }));
}