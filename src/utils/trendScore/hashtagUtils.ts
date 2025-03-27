
/**
 * Utility functions for enhancing hashtags based on content type
 */

/**
 * Enhances hashtags based on content type
 */
export function enhanceHashtagsForContentType(hashtags: string[], contentType: string): string[] {
  if (!contentType) return hashtags;
  
  const contentTypeSpecificHashtags: Record<string, string[]> = {
    'Skits': ['#comedy', '#funny', '#skit'],
    'Funny Skits': ['#comedy', '#funny', '#skit', '#humour'],
    'Reaction': ['#reaction', '#react', '#reacted'],
    'Challenge': ['#challenge', '#trending', '#fyp'],
    'Storytelling': ['#storytime', '#story', '#personal'],
    'Storytime': ['#storytime', '#story', '#personal'],
    'Tutorial': ['#tutorial', '#howto', '#learn'],
    'How-To': ['#howto', '#tutorial', '#diy'],
    'Review': ['#review', '#honest', '#opinion'],
    'Duets': ['#duet', '#collab', '#duo'],
    'POV Content': ['#pov', '#perspective', '#acting'],
    'Trend Jumps': ['#trend', '#challenge', '#newtrend']
  };
  
  // Find matching content types
  for (const [type, typeHashtags] of Object.entries(contentTypeSpecificHashtags)) {
    if (contentType.includes(type)) {
      // Combine default hashtags with content-specific ones
      const combined = [...hashtags, ...typeHashtags];
      // Remove duplicates and limit to 5 hashtags
      return Array.from(new Set(combined)).slice(0, 5);
    }
  }
  
  return hashtags;
}
