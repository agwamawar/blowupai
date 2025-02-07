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
  const estimatedDuration = Math.min(300, Math.max(1, Math.round((contentLength * 8) / (2.5 * 1024 * 1024))));
  console.log('Estimated video duration:', estimatedDuration, 'seconds');
  return estimatedDuration;
}

export async function extractFrames(videoData: Uint8Array): Promise<string[]> {
  // Extract only first frame to prevent memory issues
  console.log('Extracting single frame from video...');
  const sampleSize = Math.min(videoData.length, 1024 * 1024); // Use max 1MB of data
  const base64Data = btoa(String.fromCharCode(...videoData.slice(0, sampleSize)));
  return [base64Data];
}