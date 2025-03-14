
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
        size: 640, // Increased size for better detection
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

    // Extract content niche and quality metrics
    const detectedObjects = result.predictions || [];
    const uniqueObjects = new Set(detectedObjects.map((pred: any) => pred.class));
    
    // Determine content niche based on detected objects
    const niche = determineContentNiche(Array.from(uniqueObjects));
    
    // Analyze content quality
    const qualityMetrics = analyzeContentQuality(detectedObjects);
    
    // Assess virality potential
    const viralityScore = assessViralityPotential(detectedObjects, uniqueObjects.size);

    return {
      raw_predictions: result,
      content_analysis: {
        niche,
        quality_metrics: qualityMetrics,
        virality_assessment: viralityScore,
        detected_objects: Array.from(uniqueObjects),
      }
    };
  } catch (error) {
    console.error('YOLO analysis error:', error);
    return null;
  }
}

function determineContentNiche(objects: string[]): string {
  const nicheKeywords = {
    lifestyle: ['person', 'clothing', 'accessories', 'furniture'],
    fitness: ['person', 'sports equipment', 'gym'],
    food: ['food', 'drink', 'kitchen', 'plate'],
    tech: ['laptop', 'phone', 'computer', 'electronics'],
    beauty: ['person', 'makeup', 'cosmetics'],
    gaming: ['computer', 'console', 'controller'],
  };

  let maxMatchCount = 0;
  let determinedNiche = 'general';

  for (const [niche, keywords] of Object.entries(nicheKeywords)) {
    const matchCount = keywords.filter(keyword => 
      objects.some(obj => obj.toLowerCase().includes(keyword.toLowerCase()))
    ).length;

    if (matchCount > maxMatchCount) {
      maxMatchCount = matchCount;
      determinedNiche = niche;
    }
  }

  return determinedNiche;
}

function analyzeContentQuality(predictions: any[]): {
  composition_score: number;
  lighting_score: number;
  subject_prominence: number;
} {
  // Analyze composition based on object placement and confidence
  const compositionScore = Math.min(100, 
    predictions.reduce((score, pred) => 
      score + (pred.confidence * 50) + (pred.box?.center ? 30 : 0), 20)
  );

  // Estimate lighting quality based on detection confidence
  const lightingScore = Math.min(100,
    predictions.reduce((score, pred) => score + pred.confidence * 60, 40)
  );

  // Calculate subject prominence
  const subjectProminence = Math.min(100,
    predictions.reduce((score, pred) => {
      const area = (pred.box?.width || 0) * (pred.box?.height || 0);
      return score + (area * 100);
    }, 0)
  );

  return {
    composition_score: Math.round(compositionScore),
    lighting_score: Math.round(lightingScore),
    subject_prominence: Math.round(subjectProminence)
  };
}

function assessViralityPotential(predictions: any[], uniqueObjectCount: number): {
  score: number;
  factors: string[];
} {
  const factors: string[] = [];
  let baseScore = 60; // Base virality score

  // More unique objects can make content more interesting
  if (uniqueObjectCount >= 3) {
    baseScore += 10;
    factors.push('Diverse visual elements');
  }

  // High confidence predictions suggest clear, engaging content
  const highConfidencePreds = predictions.filter(pred => pred.confidence > 0.8).length;
  if (highConfidencePreds > 0) {
    baseScore += 15;
    factors.push('Clear and distinct subjects');
  }

  // Human presence often increases engagement
  if (predictions.some(pred => pred.class === 'person')) {
    baseScore += 15;
    factors.push('Human presence detected');
  }

  return {
    score: Math.min(100, baseScore),
    factors
  };
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
