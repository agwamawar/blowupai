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
    const { videoUrl, platform, userId } = await req.json()

    if (!videoUrl || !platform || !userId) {
      throw new Error('Missing required parameters')
    }

    // Initialize Supabase client
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Create initial analysis record
    const { data: analysis, error: insertError } = await supabase
      .from('video_analysis')
      .insert({
        user_id: userId,
        video_url: videoUrl,
        platform,
        status: 'processing'
      })
      .select()
      .single()

    if (insertError) {
      throw new Error(`Failed to create analysis record: ${insertError.message}`)
    }

    // Start content analysis using GPT-4 Vision
    const contentAnalysis = await analyzeVideoContent(videoUrl)
    const textAnalysis = await generateTextAnalysis(contentAnalysis)
    const engagementPrediction = predictEngagement(contentAnalysis, platform)

    // Update analysis record with results
    const { error: updateError } = await supabase
      .from('video_analysis')
      .update({
        content_analysis: contentAnalysis,
        text_analysis: textAnalysis,
        engagement_prediction: engagementPrediction,
        engagement_score: calculateEngagementScore(engagementPrediction),
        status: 'completed',
        updated_at: new Date().toISOString()
      })
      .eq('id', analysis.id)

    if (updateError) {
      throw new Error(`Failed to update analysis: ${updateError.message}`)
    }

    return new Response(
      JSON.stringify({ 
        message: 'Analysis completed successfully',
        analysisId: analysis.id
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    )

  } catch (error) {
    console.error('Error in analyze-video function:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    )
  }
})

async function analyzeVideoContent(videoUrl: string) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in analyzing video content for social media engagement. Analyze the given video and provide detailed insights.'
        },
        {
          role: 'user',
          content: `Analyze this video: ${videoUrl}\n\nProvide insights about:\n1. Visual content quality\n2. Pacing and timing\n3. Audience engagement potential\n4. Content relevance`
        }
      ]
    })
  })

  const data = await response.json()
  return {
    analysis: data.choices[0].message.content,
    timestamp: new Date().toISOString()
  }
}

async function generateTextAnalysis(contentAnalysis: any) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are an expert in social media content optimization. Based on the content analysis, provide specific recommendations for improvement.'
        },
        {
          role: 'user',
          content: `Based on this analysis:\n${contentAnalysis.analysis}\n\nProvide specific recommendations for:\n1. Content improvement\n2. Engagement optimization\n3. Platform-specific adjustments`
        }
      ]
    })
  })

  const data = await response.json()
  return {
    recommendations: data.choices[0].message.content,
    timestamp: new Date().toISOString()
  }
}

function predictEngagement(contentAnalysis: any, platform: string) {
  // Extract key factors from content analysis
  const analysis = contentAnalysis.analysis.toLowerCase()
  
  // Basic engagement prediction logic
  const factors = {
    visualQuality: analysis.includes('high quality') ? 0.8 : 0.5,
    pacing: analysis.includes('good pacing') ? 0.7 : 0.4,
    relevance: analysis.includes('relevant') ? 0.9 : 0.6,
    engagement: analysis.includes('engaging') ? 0.85 : 0.5
  }

  // Platform-specific multipliers
  const platformMultipliers = {
    tiktok: 1.2,
    instagram: 1.1,
    facebook: 0.9,
    snapchat: 1.0
  }

  // Calculate base score
  const baseScore = Object.values(factors).reduce((sum, value) => sum + value, 0) / Object.keys(factors).length

  // Apply platform multiplier
  const multiplier = platformMultipliers[platform as keyof typeof platformMultipliers] || 1.0
  
  return {
    predicted_score: baseScore * multiplier,
    factors,
    platform_multiplier: multiplier,
    timestamp: new Date().toISOString()
  }
}

function calculateEngagementScore(prediction: any): number {
  return Math.round(prediction.predicted_score * 100)
}