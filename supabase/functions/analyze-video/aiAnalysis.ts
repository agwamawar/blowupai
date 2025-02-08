import "https://deno.land/x/xhr@0.1.0/mod.ts";

export async function analyzeFrameWithYOLO(frameData: string): Promise<any> {
  console.log('Analyzing frame with YOLO...');
  try {
    const response = await fetch('https://api.ultralytics.com/v1/predict/H6xQpeoAjG', {
      method: 'POST',
      headers: {
        'x-api-key': Deno.env.get('YOLO_API_KEY') || '',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        size: 320, // Reduced size for faster processing
        confidence: 0.25,
        iou: 0.45,
        image: frameData,
      }),
    });

    if (!response.ok) {
      console.error('YOLO API error:', await response.text());
      return null;
    }

    const result = await response.json();
    console.log('YOLO analysis completed successfully');
    return result;
  } catch (error) {
    console.error('YOLO analysis error:', error);
    return null;
  }
}

export async function analyzeSceneWithDINO(frameData: string): Promise<any> {
  console.log('Analyzing scene with DINO...');
  try {
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
      console.error('DINO API error:', await response.text());
      return null;
    }

    const result = await response.json();
    console.log('DINO analysis completed successfully');
    return result;
  } catch (error) {
    console.error('DINO analysis error:', error);
    return null;
  }
}
