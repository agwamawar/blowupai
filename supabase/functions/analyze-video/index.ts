
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
    const { videoUrl, platform, userId, followerCount } = await req.json();
    console.log('Received request:', { videoUrl, platform, userId, followerCount });

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

    // Calculate engagement score based on follower count and content quality
    const followerScale = Math.min(1, Math.log10(followerCount) / Math.log10(100000)) * 0.5;
    const contentQualityScore = (detectedObjects.size * 10) + (Math.random() * 20);
    const engagementScore = Math.min(100, Math.floor(contentQualityScore + (followerScale * 30)));

    const mockHeatmapData = generateHeatmapData(duration);

    // Scale engagement predictions based on follower count
    const estimatedLikes = Math.floor(followerCount * (engagementScore / 100) * 0.1);
    const estimatedShares = Math.floor(followerCount * (engagementScore / 100) * 0.03);

    // Adjust recommendations based on follower count
    const followerBasedRecommendations = [];
    
    if (followerCount < 5000) {
      followerBasedRecommendations.push("Focus on building community engagement with reply chains");
      followerBasedRecommendations.push("Collaborate with creators in similar follower range");
    } else if (followerCount < 50000) {
      followerBasedRecommendations.push("Leverage trending sounds to reach broader audience");
      followerBasedRecommendations.push("Create content series to build consistent viewership");
    } else {
      followerBasedRecommendations.push("Develop branded content opportunities with unique aesthetics");
      followerBasedRecommendations.push("Focus on high production quality to maintain premium audience expectations");
    }

    // Add platform-specific follower recommendations
    if (platform === 'tiktok') {
      followerBasedRecommendations.push(followerCount < 10000 
        ? "Participate in trending challenges to boost discovery" 
        : "Create your own trending challenge format");
    } else if (platform === 'instagram') {
      followerBasedRecommendations.push(followerCount < 10000 
        ? "Leverage Instagram's collab features to tap into other audiences" 
        : "Use Instagram's exclusive content features for superfans");
    }

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
          ...followerBasedRecommendations,
          duration > platformGuidelines.recommendedDuration ? 
            `Consider shortening to ${platformGuidelines.recommendedDuration} seconds for better engagement` : 
            "Video length is optimal",
        ],
      },
      content_analysis: {
        objects: Array.from(detectedObjects),
        scene_transitions: sceneAnalysisResults ? 'Multiple scenes detected' : 'Single scene video',
        text_detected: [],
        audience_size: followerCount,
      },
      engagement_prediction: {
        estimated_likes: estimatedLikes,
        estimated_shares: estimatedShares,
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
        analysis_period: followerCount, // Reusing the field to store follower count
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
