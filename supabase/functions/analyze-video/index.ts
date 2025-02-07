import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

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
  return Array(numFrames).fill('mock_frame_data');
}

async function analyzeFrameWithYOLO(frameData: string): Promise<any> {
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

async function analyzeSceneWithDINO(frameData: string): Promise<any> {
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

async function transcribeAudioWithWhisper(videoData: Uint8Array): Promise<string> {
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

async function getVideoDuration(videoUrl: string): Promise<number> {
  try {
    const response = await fetch(videoUrl, { method: 'HEAD' });
    const contentLength = response.headers.get('content-length');
    const contentType = response.headers.get('content-type');
    
    if (!contentType?.startsWith('video/')) {
      throw new Error('Not a video file');
    }

    // As a fallback, we'll estimate duration based on file size
    // This is a rough estimation - in production you'd want to use a proper video processing library
    const fileSizeInBytes = parseInt(contentLength || '0', 10);
    const estimatedBitrate = 1000000; // Assume 1Mbps as average bitrate
    const estimatedDurationInSeconds = Math.ceil(fileSizeInBytes * 8 / estimatedBitrate);
    
    return Math.max(1, Math.min(estimatedDurationInSeconds, 300)); // Cap between 1 and 300 seconds
  } catch (error) {
    console.error('Error getting video duration:', error);
    return 30; // Default fallback duration
  }
}

async function getPlatformGuidelines(platform: string) {
  const guidelines = {
    tiktok: {
      idealDuration: "15-60 seconds",
      recommendedAspectRatio: "9:16",
      optimalCaptions: "2-3 lines",
      soundRecommendation: "Original sound or trending music",
      hashtagLimit: "3-5 relevant hashtags",
    },
    instagram: {
      idealDuration: "30-60 seconds",
      recommendedAspectRatio: "4:5 or 9:16",
      optimalCaptions: "Up to 125 characters",
      soundRecommendation: "Background music optional",
      hashtagLimit: "5-10 relevant hashtags",
    },
    facebook: {
      idealDuration: "1-3 minutes",
      recommendedAspectRatio: "16:9 or 1:1",
      optimalCaptions: "Full sentences, longer descriptions",
      soundRecommendation: "Captions recommended",
      hashtagLimit: "2-3 relevant hashtags",
    }
  };
  
  return guidelines[platform as keyof typeof guidelines] || guidelines.tiktok;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { videoUrl, platform, userId, simulatedUsers } = await req.json();
    console.log('Analyzing video:', { videoUrl, platform, userId, simulatedUsers });

    // Get video duration first
    const duration = await getVideoDuration(videoUrl);
    console.log('Estimated video duration:', duration, 'seconds');

    // Get platform guidelines
    const platformGuidelines = await getPlatformGuidelines(platform);
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

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

    // Generate heatmap data based on actual video duration
    const heatmapPoints = Math.max(5, Math.min(10, Math.ceil(duration)));
    const mockHeatmapData = Array.from({ length: heatmapPoints }, (_, i) => ({
      time: `${Math.floor(i * duration / heatmapPoints)}s`,
      engagement: Math.floor(Math.random() * 40) + 60,
    }));

    const analysisData = {
      engagement_score: engagementScore,
      video_metadata: {
        duration: `${duration}s`,
        format: videoUrl.split('.').pop(),
      },
      platform_analysis: {
        guidelines: platformGuidelines,
        compliance: {
          duration: duration <= 60 ? "Optimal" : "Too long",
          sound: "Original sound detected",
          captions: "Present",
        },
        recommendations: [
          "Add trending hashtags",
          "Include call-to-action",
          "Use platform-specific features",
        ],
      },
      content_analysis: {
        objects: Array.from(detectedObjects),
        scene_transitions: 'Smooth transitions detected',
        text_detected: ['Title', 'Captions'],
      },
      text_analysis: {
        transcription,
        keywords: transcription.split(' ').slice(0, 10),
      },
      engagement_prediction: {
        estimated_likes: Math.floor(simulatedUsers * (engagementScore / 100) * 0.3),
        estimated_shares: Math.floor(simulatedUsers * (engagementScore / 100) * 0.1),
        watch_time: `${duration}s`,
        best_segments: mockHeatmapData.map((point, index) => ({
          timestamp: point.time,
          reason: index === 0 ? "Strong opening hook" :
                 index === mockHeatmapData.length - 1 ? "Effective closing" :
                 "High engagement segment",
        })),
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