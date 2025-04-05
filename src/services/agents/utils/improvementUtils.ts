/**
 * Utility functions for generating improvement suggestions
 */

/**
 * Gets content-type specific improvement suggestions
 */
export function getContentTypeSpecificImprovements(contentType: string): string[] {
  if (!contentType) return [];
  
  const contentImprovements: Record<string, string[]> = {
    'Skits': [
      "Add a stronger punchline in the first 7 seconds",
      "Include quick zoom transitions for comedy emphasis",
      "Show reaction shots after key punchlines"
    ],
    'Comedy': [
      "Deliver the punchline faster to improve retention",
      "Add more exaggerated facial expressions on key moments",
      "Use sound effects to emphasize comedic elements"
    ],
    'Reaction': [
      "Show your authentic initial reaction without cuts",
      "Add picture-in-picture to show content and reaction simultaneously",
      "Include more emotional variations in your reactions (surprise, shock, laughter)"
    ],
    'Challenge': [
      "Show the end result of the challenge in first 2 seconds",
      "Add on-screen challenge instructions with trending hashtag",
      "Include slow-motion for the most impressive moment"
    ],
    'Storytelling': [
      "Start with the most dramatic moment of your story first",
      "Add timestamps or chapter markers for longer narratives",
      "Use emotional music that builds with your story arc"
    ],
    'Tutorial': [
      "Show the finished result in the first 2 seconds before steps",
      "Add numbered step indicators as text overlays",
      "Use close-ups for detailed techniques with proper lighting"
    ],
    'How-To': [
      "Include a materials/ingredients list as text overlay",
      "Break complex steps into clearly numbered sequences",
      "Add satisfying close-up of the final result"
    ],
    'Review': [
      "State your rating in the first 3 seconds",
      "Use clear before/after comparisons or demonstrations",
      "Include pros/cons lists as text overlays"
    ],
    'Duets': [
      "Ensure perfect synchronization with the original content",
      "Add your own text overlays that complement the original",
      "Use contrasting actions/reactions to create visual interest"
    ],
    'POV': [
      "Establish the perspective clearly in first 2 seconds",
      "Use camera movements that enhance the immersive effect",
      "Add context-setting text overlay at the beginning"
    ],
    'Trends': [
      "Join trend within first 48 hours of emergence",
      "Use the exact trending sound/template but add unique twist",
      "Include trending hashtags in both video and description"
    ]
  };
  
  // Check if the content type matches any of our predefined categories
  for (const [category, improvements] of Object.entries(contentImprovements)) {
    if (contentType.includes(category)) {
      return improvements;
    }
  }
  
  return [];
}

/**
 * Generates platform-specific improvement suggestions
 */
export function getPlatformSpecificImprovements(platform: string): string[] {
  const platformImprovements: Record<string, string[]> = {
    'tiktok': [
      "Use a trending TikTok sound to increase discoverability",
      "Add more text overlays with trending TikTok fonts",
      "Include a clear call-to-action for comments and shares"
    ],
    'instagram': [
      "Use Instagram's native filters for a more polished look",
      "Add Reels-specific stickers to increase engagement",
      "Include a swipe-up prompt or call-to-action"
    ],
    'youtube': [
      "Add an attention-grabbing thumbnail with expressive facial expression",
      "Incorporate YouTube Shorts specific aspect ratio",
      "Add subscribe call-to-action with animation effect"
    ]
  };
  
  return platformImprovements[platform.toLowerCase()] || platformImprovements['tiktok'];
}

/**
 * Generates video-specific improvement suggestions based on analysis data
 */
export function getVideoSpecificImprovements(data: any): string[] {
  const { conceptAnalysis, technicalAnalysis, metadata } = data;
  
  const platform = metadata?.platform?.toLowerCase() || 'tiktok';
  const contentType = metadata?.content_type || [];
  const contentTypeString = Array.isArray(contentType) ? contentType.join(', ') : contentType;
  
  // Analyze specific weaknesses
  const improvements: string[] = [];
  
  if (technicalAnalysis?.hook_strength < 7) {
    improvements.push(`Strengthen your opening hook with a clearer ${platform}-optimized pattern interrupt`);
  }
  
  if (technicalAnalysis?.text_overlay_count < 3) {
    improvements.push(`Add more text overlays to highlight key points in your ${contentTypeString} content`);
  }
  
  // Content-specific improvements
  const contentImprovements = getContentTypeSpecificImprovements(contentTypeString);
  
  // Platform-specific improvements
  const platformSpecific = getPlatformSpecificImprovements(platform);
  
  // Return a mix of content-specific and platform-specific improvements
  let result = [];
  
  // First prioritize content-specific improvements
  if (contentImprovements.length > 0) {
    result.push(contentImprovements[0]);
    
    // If we have more than one content improvement, add another
    if (contentImprovements.length > 1) {
      result.push(contentImprovements[1]);
    } else {
      result.push(platformSpecific[0]);
    }
  } else {
    // Add platform-specific improvements if no content-specific ones
    result.push(platformSpecific[0]);
    result.push(platformSpecific[1]);
  }
  
  // If we have technical analysis with recommendations, add one of those
  if (technicalAnalysis?.recommendations?.length > 0) {
    result.push(technicalAnalysis.recommendations[0]);
  } else if (improvements.length > 0) {
    // Otherwise add from our general improvements
    result.push(improvements[0]);
  } else if (platformSpecific.length > 2) {
    // Or add another platform-specific one
    result.push(platformSpecific[2]);
  }
  
  // Return only three improvements to not overwhelm
  return result.slice(0, 3);
}
