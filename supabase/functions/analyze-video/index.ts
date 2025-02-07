import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'
import { downloadVideo, getVideoDuration, extractFrames } from './videoProcessing.ts'
import { analyzeFrameWithYOLO, analyzeSceneWithDINO, transcribeAudioWithWhisper } from './aiAnalysis.ts'
import { getPlatformGuidelines, generateHeatmapData } from './platformAnalysis.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { videoUrl, platform, userId, simulatedUsers } = await req.json();
    console.log('Analyzing video:', { videoUrl, platform, userId, simulatedUsers });

    // Get video duration and platform guidelines
    const duration = await getVideoDuration(videoUrl);
    console.log('Estimated video duration:', duration, 'seconds');
    const platformGuidelines = getPlatformGuidelines(platform);
    
    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Process video
    console.log('Downloading video...');
    const videoData = await downloadVideo(videoUrl);
    console.log('Video downloaded successfully');

    console.log('Extracting frames...');
    const frames = await extractFrames(videoData);
    console.log(`Extracted ${frames.length} frames`);

    // Analyze frames
    console.log('Analyzing frames with YOLO and DINO...');
    const objectDetectionResults = await Promise.all(
      frames.map(frame => analyzeFrameWithYOLO(frame))
    );
    const sceneAnalysisResults = await Promise.all(
      frames.map(frame => analyzeSceneWithDINO(frame))
    );

    // Transcribe audio
    console.log('Transcribing audio with Whisper...');
    const transcription = await transcribeAudioWithWhisper(videoData);
    console.log('Audio transcription completed');

    // Process results
    const detectedObjects = new Set<string>();
    objectDetectionResults.forEach(result => {
      result.predictions?.forEach((pred: any) => {
        detectedObjects.add(pred.class);
      });
    });

    const engagementScore = Math.min(100, Math.floor(
      (detectedObjects.size * 10) +
      (transcription.length / 100) +
      (Math.random() * 20)
    ));

    const mockHeatmapData = generateHeatmapData(duration);

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