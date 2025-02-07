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
  // For now, we'll return a single frame as base64
  // In a production environment, you'd want to properly extract multiple frames
  const base64Data = btoa(String.fromCharCode(...videoData));
  return [base64Data];
}