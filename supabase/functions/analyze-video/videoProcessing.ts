export async function downloadVideo(url: string): Promise<Uint8Array> {
  console.log('Downloading video from:', url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Failed to download video');
  }
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

export async function getVideoDuration(url: string): Promise<number> {
  console.log('Getting video duration...');
  const response = await fetch(url, { method: 'HEAD' });
  const contentLength = Number(response.headers.get('content-length'));
  
  // Estimate duration based on file size (assuming average bitrate of 2.5 Mbps)
  const estimatedDuration = (contentLength * 8) / (2.5 * 1024 * 1024);
  
  // Cap duration between 1 and 300 seconds (5 minutes)
  return Math.max(1, Math.min(300, Math.round(estimatedDuration)));
}

export async function extractFrames(videoData: Uint8Array): Promise<string[]> {
  // For now, we'll create a single frame from the video data
  // This is a simplified version to prevent memory issues
  console.log('Extracting frames...');
  const base64Data = btoa(String.fromCharCode(...videoData.slice(0, 1024 * 1024))); // Only use first 1MB
  return [base64Data];
}