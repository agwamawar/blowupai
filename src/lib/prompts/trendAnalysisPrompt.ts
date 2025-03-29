
export const TREND_ANALYSIS_PROMPT = `Analyze this video content for viral potential. 
Focus on:
1. Current trending patterns and virality indicators
2. Audience engagement potential
3. Platform-specific viral elements
4. Content timing and relevance

Return a JSON response in this exact format:
{
  "viralityScore": <number 0-100>,
  "trendAlignment": <number 0-100>,
  "trendingElements": [<string>],
  "recommendedHashtags": [<string>],
  "engagementTriggers": [<string>],
  "contentOptimizations": [<string>],
  "timingRecommendations": {
    "bestPostTime": <string>,
    "trendLifespan": <string>
  }
}`;

export const BATCH_ANALYSIS_PROMPT = `Analyze this batch of video frames for viral elements.
Focus on visual hooks, patterns, and engaging elements.
Identify key moments that could drive virality.`;
