export function getPlatformGuidelines(platform: string) {
  const guidelines = {
    tiktok: {
      recommendedDuration: 30,
      maxDuration: 180,
      aspectRatio: '9:16',
      maxFileSize: '287MB',
    },
    instagram: {
      recommendedDuration: 60,
      maxDuration: 90,
      aspectRatio: '9:16',
      maxFileSize: '100MB',
    },
    facebook: {
      recommendedDuration: 120,
      maxDuration: 240,
      aspectRatio: '16:9',
      maxFileSize: '4GB',
    },
    snapchat: {
      recommendedDuration: 10,
      maxDuration: 60,
      aspectRatio: '9:16',
      maxFileSize: '32MB',
    },
  };

  return guidelines[platform as keyof typeof guidelines] || guidelines.tiktok;
}

export function generateHeatmapData(duration: number) {
  const points = Math.min(10, Math.max(5, Math.floor(duration / 10)));
  const data = [];

  for (let i = 0; i < points; i++) {
    const time = `${Math.floor((i * duration) / points)}:${Math.floor(Math.random() * 60)
      .toString()
      .padStart(2, '0')}`;
    data.push({ time, engagement: Math.floor(Math.random() * 40) + 60 });
  }

  return data;
}