interface PlatformGuidelines {
  maxDuration: number;
  recommendedDuration: number;
  aspectRatio: string;
  maxFileSize: number;
  format: string[];
}

const platformGuidelines: Record<string, PlatformGuidelines> = {
  tiktok: {
    maxDuration: 600,
    recommendedDuration: 30,
    aspectRatio: "9:16",
    maxFileSize: 512,
    format: ["MP4", "MOV"],
  },
  instagram: {
    maxDuration: 60,
    recommendedDuration: 30,
    aspectRatio: "9:16",
    maxFileSize: 100,
    format: ["MP4"],
  },
  facebook: {
    maxDuration: 240,
    recommendedDuration: 60,
    aspectRatio: "16:9",
    maxFileSize: 4000,
    format: ["MP4", "MOV"],
  },
  snapchat: {
    maxDuration: 60,
    recommendedDuration: 10,
    aspectRatio: "9:16",
    maxFileSize: 32,
    format: ["MP4"],
  },
};

export function getPlatformGuidelines(platform: string) {
  return platformGuidelines[platform.toLowerCase()] || platformGuidelines.tiktok;
}

export function generateHeatmapData(duration: number) {
  const numPoints = Math.min(10, Math.max(5, Math.floor(duration / 3)));
  const points = [];
  
  for (let i = 0; i < numPoints; i++) {
    const timeInSeconds = Math.floor((i / (numPoints - 1)) * duration);
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    points.push({
      time: `${minutes}:${seconds.toString().padStart(2, '0')}`,
      engagement: Math.floor(Math.random() * 40) + 60, // Random value between 60-100
    });
  }
  
  return points;
}