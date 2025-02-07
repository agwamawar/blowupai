import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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

    // Mock analysis data (replace with actual AI analysis in production)
    const analysisData = {
      engagement_score: Math.floor(Math.random() * 40) + 60, // 60-100
      visual_quality: {
        lighting: ['Good', 'Average', 'Poor'][Math.floor(Math.random() * 3)],
        stability: ['Good', 'Average', 'Poor'][Math.floor(Math.random() * 3)],
        clarity: ['Good', 'Average', 'Poor'][Math.floor(Math.random() * 3)],
      },
      audio_analysis: {
        clarity: ['Good', 'Average', 'Poor'][Math.floor(Math.random() * 3)],
        background_noise: ['Low', 'Medium', 'High'][Math.floor(Math.random() * 3)],
        emotion: ['Energetic', 'Neutral', 'Calm'][Math.floor(Math.random() * 3)],
      },
      content_analysis: {
        objects: ['Person', 'Phone', 'Computer', 'Chair', 'Table'].slice(0, Math.floor(Math.random() * 3) + 2),
        text_detected: ['Title', 'Caption', 'Hashtag'].slice(0, Math.floor(Math.random() * 3)),
        scene_transitions: ['Smooth transitions with good pacing', 'Some abrupt cuts detected', 'Well-timed scene changes'][Math.floor(Math.random() * 3)],
      },
      engagement_prediction: {
        estimated_likes: Math.floor(simulatedUsers * (Math.random() * 0.3 + 0.1)), // 10-40% of users
        estimated_shares: Math.floor(simulatedUsers * (Math.random() * 0.1 + 0.05)), // 5-15% of users
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
    }

    // Store analysis results in the database
    const { data, error: dbError } = await supabase
      .from('video_analysis')
      .insert({
        user_id: userId,
        video_url: videoUrl,
        platform,
        status: 'completed',
        engagement_score: analysisData.engagement_score,
        content_analysis: analysisData.content_analysis,
        engagement_prediction: analysisData.engagement_prediction,
      })
      .select()
      .single()

    if (dbError) {
      console.error('Database error:', dbError)
      throw new Error('Failed to store analysis results')
    }

    console.log('Analysis completed and stored:', data)

    return new Response(
      JSON.stringify(analysisData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})