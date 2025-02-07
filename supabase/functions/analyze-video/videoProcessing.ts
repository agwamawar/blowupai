export async function downloadVideo(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

export async function getVideoDuration(videoUrl: string): Promise<number> {
  try {
    const response = await fetch(videoUrl, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    if (!contentType?.startsWith('video/')) {
      throw new Error('Not a video file');
    }

    const fileSizeInBytes = parseInt(contentLength || '0', 10);
    const estimatedBitrate = 1000000; // Assume 1Mbps as average bitrate
    const estimatedDurationInSeconds = Math.ceil(fileSizeInBytes * 8 / estimatedBitrate);
    
    return Math.max(1, Math.min(estimatedDurationInSeconds, 300));
  } catch (error) {
    console.error('Error getting video duration:', error);
    return 30;
  }
}

export async function extractFrames(videoData: Uint8Array, numFrames = 5): Promise<string[]> {
  // Mock implementation for frame extraction
  return Array(numFrames).fill('mock_frame_data');
}