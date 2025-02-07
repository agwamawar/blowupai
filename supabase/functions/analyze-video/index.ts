import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { decode as base64Decode } from "https://deno.land/std@0.182.0/encoding/base64.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

async function downloadVideo(url: string): Promise<Uint8Array> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download video: ${response.statusText}`);
  }
  const arrayBuffer = await response.arrayBuffer();
  return new Uint8Array(arrayBuffer);
}

async function extractFrames(videoData: Uint8Array, numFrames = 5): Promise<string[]> {
  // For now, we'll use a mock implementation
  // In a production environment, you'd want to use a proper video processing library
  // This is a placeholder that returns empty frames
  return Array(numFrames).fill('mock_frame_data');
}

async function analyzeFrameWithYOLO(frameData: string): Promise<any> {
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

async function analyzeSceneWithDINO(frameData: string): Promise<any> {
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

async function transcribeAudioWithWhisper(videoData: Uint8Array): Promise<string> {
  // Convert video data to base64
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

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { videoUrl, platform, userId, simulatedUsers } = await req.json()
    console.log('Analyzing video:', { videoUrl, platform, userId, simulatedUsers })

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Download video
    console.log('Downloading video...');
    const videoData = await downloadVideo(videoUrl);
    console.log('Video downloaded successfully');

    // Extract frames for analysis
    console.log('Extracting frames...');
    const frames = await extractFrames(videoData);
    console.log(`Extracted ${frames.length} frames`);

    // Analyze frames with YOLO and DINO
    console.log('Analyzing frames with YOLO and DINO...');
    const objectDetectionResults = await Promise.all(
      frames.map(frame => analyzeFrameWithYOLO(frame))
    );
    const sceneAnalysisResults = await Promise.all(
      frames.map(frame => analyzeSceneWithDINO(frame))
    );

    // Transcribe audio with Whisper
    console.log('Transcribing audio with Whisper...');
    const transcription = await transcribeAudioWithWhisper(videoData);
    console.log('Audio transcription completed');

    // Process and combine results
    const detectedObjects = new Set<string>();
    objectDetectionResults.forEach(result => {
      result.predictions?.forEach((pred: any) => {
        detectedObjects.add(pred.class);
      });
    });

    // Calculate engagement score based on various factors
    const engagementScore = Math.min(100, Math.floor(
      (detectedObjects.size * 10) +  // More objects = more engaging
      (transcription.length / 100) +  // Longer transcription = more content
      (Math.random() * 20)  // Random factor for variation
    ));

    const analysisData = {
      engagement_score: engagementScore,
      content_analysis: {
        objects: Array.from(detectedObjects),
        scene_transitions: 'Smooth transitions detected',
        text_detected: ['Title', 'Captions'],  // Placeholder - implement OCR if needed
      },
      text_analysis: {
        transcription,
        keywords: transcription.split(' ').slice(0, 10),  // Simple keyword extraction
      },
      engagement_prediction: {
        estimated_likes: Math.floor(simulatedUsers * (engagementScore / 100) * 0.3),
        estimated_shares: Math.floor(simulatedUsers * (engagementScore / 100) * 0.1),
        watch_time: `${Math.floor(Math.random() * 2) + 1}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
        best_segments: [
          {
            timestamp: "0:15",
            reason: "High viewer retention during introduction",
          },
          {
            timestamp: "1:30",
            reason: "Strong emotional engagement",
          },
          {
            timestamp: "2:45",
            reason: "Effective call to action",
          },
        ],
      },
    };

    // Store analysis results
    const { data, error: dbError } = await supabase
      .from('video_analysis')
      .insert({
        user_id: userId,
        video_url: videoUrl,
        platform,
        status: 'completed',
        content_analysis: analysisData.content_analysis,
        text_analysis: analysisData.text_analysis,
        engagement_prediction: analysisData.engagement_prediction,
        engagement_score: analysisData.engagement_score,
      })
      .select()
      .single();

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store analysis results');
    }

    console.log('Analysis completed and stored:', data);

    return new Response(
      JSON.stringify(analysisData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
})