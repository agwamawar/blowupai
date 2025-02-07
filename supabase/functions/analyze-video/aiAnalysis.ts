export async function analyzeFrameWithYOLO(frameData: string): Promise<any> {
  console.log('Analyzing frame with YOLO...');
  const response = await fetch('https://api.ultralytics.com/v1/predict/H6xQpeoAjG', {
    method: 'POST',
    headers: {
      'x-api-key': Deno.env.get('YOLO_API_KEY') || '',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      size: 640,
      confidence: 0.25,
      iou: 0.45,
      image: frameData,
    }),
  });

  if (!response.ok) {
    throw new Error(`YOLO API error: ${await response.text()}`);
  }

  return await response.json();
}

export async function analyzeSceneWithDINO(frameData: string): Promise<any> {
  console.log('Analyzing scene with DINO...');
  const response = await fetch('https://api-inference.huggingface.co/models/facebook/dinov2-large', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('HUGGINGFACE_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inputs: frameData,
    }),
  });

  if (!response.ok) {
    throw new Error(`DINO API error: ${await response.text()}`);
  }

  return await response.json();
}

export async function transcribeAudioWithWhisper(videoData: Uint8Array): Promise<string> {
  console.log('Transcribing audio with Whisper...');
  const base64Data = btoa(String.fromCharCode(...videoData));
  
  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      file: base64Data,
      model: 'whisper-1',
      response_format: 'text',
    }),
  });

  if (!response.ok) {
    throw new Error(`Whisper API error: ${await response.text()}`);
  }

  return await response.text();
}