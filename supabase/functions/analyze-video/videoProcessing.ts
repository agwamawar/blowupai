
export async function downloadVideo(url: string): Promise<Uint8Array> {
  console.log('Downloading video from:', url);
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Failed to download video');
    }
    const arrayBuffer = await response.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  } catch (error) {
    console.error('Error downloading video:', error);
    throw error;
  }
}

export async function getVideoDuration(url: string): Promise<number> {
  console.log('Getting video duration...');
  try {
    const response = await fetch(url, { method: 'HEAD' });
    const contentLength = Number(response.headers.get('content-length'));
    
    // Estimate duration based on file size (assuming average bitrate of 2.5 Mbps)
    const estimatedDuration = Math.min(300, Math.max(1, Math.round((contentLength * 8) / (2.5 * 1024 * 1024))));
    console.log('Estimated video duration:', estimatedDuration, 'seconds');
    return estimatedDuration;
  } catch (error) {
    console.error('Error getting video duration:', error);
    return 30; // Default duration if estimation fails
  }
}

export async function extractFrames(videoData: Uint8Array): Promise<string[]> {
  console.log('Extracting single frame from video...');
  try {
    // Extract only the first 100KB of data to create a thumbnail
    const sampleSize = Math.min(videoData.length, 100 * 1024);
    const base64Data = btoa(String.fromCharCode.apply(null, videoData.slice(0, sampleSize)));
    return [base64Data];
  } catch (error) {
    console.error('Error extracting frames:', error);
    throw error;
  }
}
