
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Sample base64 encoded image for testing (very small 1x1 pixel)
const sampleImageBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting API tests...');
    
    const results = {
      yolo_api: await testYoloApi(),
      huggingface_api: await testHuggingfaceApi(),
    };
    
    console.log('Test results:', results);
    
    return new Response(
      JSON.stringify(results),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in test-ai-apis function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    );
  }
});

async function testYoloApi() {
  console.log('Testing YOLO API...');
  const apiKey = Deno.env.get('YOLO_API_KEY');
  
  if (!apiKey) {
    return {
      status: 'error',
      message: 'YOLO_API_KEY is not configured in environment variables'
    };
  }
  
  try {
    const response = await fetch('https://api.ultralytics.com/v1/predict/H6xQpeoAjG', {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        size: 320, // Smaller size for quicker test
        confidence: 0.25,
        iou: 0.45,
        image: sampleImageBase64,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: 'error',
        message: `API returned ${response.status}: ${errorText}`,
      };
    }
    
    return {
      status: 'success',
      message: 'YOLO API is working properly',
      details: 'Successfully connected to API with valid credentials'
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Error connecting to YOLO API: ${error.message}`
    };
  }
}

async function testHuggingfaceApi() {
  console.log('Testing Hugging Face API...');
  const apiKey = Deno.env.get('HUGGINGFACE_API_KEY');
  
  if (!apiKey) {
    return {
      status: 'error',
      message: 'HUGGINGFACE_API_KEY is not configured in environment variables'
    };
  }
  
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/facebook/dinov2-large', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: sampleImageBase64,
      }),
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      return {
        status: 'error',
        message: `API returned ${response.status}: ${errorText}`,
      };
    }
    
    return {
      status: 'success',
      message: 'Hugging Face API is working properly',
      details: 'Successfully connected to API with valid credentials'
    };
  } catch (error) {
    return {
      status: 'error',
      message: `Error connecting to Hugging Face API: ${error.message}`
    };
  }
}
