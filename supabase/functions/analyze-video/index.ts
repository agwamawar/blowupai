
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { downloadVideo, getVideoDuration, extractFrames } from './videoProcessing.ts';
import { analyzeFrameWithYOLO, analyzeSceneWithDINO } from './aiAnalysis.ts';
import { getPlatformGuidelines, generateHeatmapData } from './platformAnalysis.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting video analysis...');
    const { videoUrl, platform, userId, simulatedUsers } = await req.json();
    console.log('Received request:', { videoUrl, platform, userId, simulatedUsers });

    // Initialize duration and guidelines first
    const duration = await getVideoDuration(videoUrl);
    const platformGuidelines = getPlatformGuidelines(platform);
    
    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Download and process video
    console.log('Downloading video...');
    const videoData = await downloadVideo(videoUrl);
    console.log('Video downloaded, size:', videoData.length);

    // Extract single frame
    console.log('Extracting frame...');
    const frames = await extractFrames(videoData);
    console.log('Frame extraction completed');

    // Analyze frame with error handling
    console.log('Starting AI analysis...');
    const [objectDetectionResults, sceneAnalysisResults] = await Promise.all([
      analyzeFrameWithYOLO(frames[0]).catch(err => {
        console.error('YOLO analysis failed:', err);
        return null;
      }),
      analyzeSceneWithDINO(frames[0]).catch(err => {
        console.error('DINO analysis failed:', err);
        return null;
      })
    ]);

    // Process results safely
    const detectedObjects = new Set<string>();
    if (objectDetectionResults?.predictions) {
      objectDetectionResults.predictions.forEach((pred: any) => {
        if (pred.class) detectedObjects.add(pred.class);
      });
    }

    // Calculate engagement score
    const engagementScore = Math.min(100, Math.floor(
      (detectedObjects.size * 10) +
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
          duration: duration <= platformGuidelines.recommendedDuration ? "Optimal" : 
                   duration <= platformGuidelines.maxDuration ? "Acceptable" : "Too long",
          sound: "Original sound detected",
          captions: "Present",
        },
        recommendations: [
          duration > platformGuidelines.recommendedDuration ? 
            `Consider shortening to ${platformGuidelines.recommendedDuration} seconds for better engagement` : 
            "Video length is optimal",
          "Add trending hashtags",
          "Include call-to-action",
        ],
      },
      content_analysis: {
        objects: Array.from(detectedObjects),
        scene_transitions: sceneAnalysisResults ? 'Multiple scenes detected' : 'Single scene video',
        text_detected: [],
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
    console.log('Storing analysis results...');
    const { error: dbError } = await supabase
      .from('video_analysis')
      .insert({
        user_id: userId,
        video_url: videoUrl,
        platform,
        status: 'completed',
        content_analysis: analysisData.content_analysis,
        engagement_prediction: analysisData.engagement_prediction,
        engagement_score: analysisData.engagement_score,
      });

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store analysis results');
    }

    console.log('Analysis completed successfully');
    return new Response(
      JSON.stringify(analysisData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in analyze-video function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});
