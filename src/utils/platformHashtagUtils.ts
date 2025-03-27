
/**
 * Utility functions for generating platform-specific hashtags
 */

/**
 * Gets hashtags specific to a platform and content type
 */
export const getPlatformSpecificHashtags = (platform: string, contentType: string): string[] => {
  const baseHashtags = {
    'tiktok': ['#fyp', '#foryoupage', '#viral', '#tiktoktrend'],
    'instagram': ['#reels', '#instadaily', '#trending', '#instareels'],
    'youtube': ['#shorts', '#youtubeshorts', '#trending', '#viralvideo']
  };
  
  // Add content-specific hashtags
  const contentHashtags = {
    'gaming': ['#gaming', '#gamer', '#videogames'],
    'comedy': ['#funny', '#comedy', '#humor'],
    'dance': ['#dance', '#choreography', '#dancechallenge'],
    'beauty': ['#beauty', '#makeup', '#skincare'],
    'fashion': ['#fashion', '#style', '#outfit'],
    'food': ['#food', '#recipe', '#cooking'],
    'fitness': ['#fitness', '#workout', '#health'],
    'travel': ['#travel', '#adventure', '#wanderlust'],
    'education': ['#learn', '#education', '#tutorial'],
    'lifehack': ['#lifehack', '#hack', '#diy']
  };
  
  // Get base hashtags for the platform
  const platformTags = baseHashtags[platform] || baseHashtags['tiktok'];
  
  // Try to match content type to our predefined categories
  let contentTypeLower = contentType.toLowerCase();
  let contentTags = [];
  
  // Check if the content type contains any of our keywords
  for (const [category, tags] of Object.entries(contentHashtags)) {
    if (contentTypeLower.includes(category)) {
      contentTags = tags;
      break;
    }
  }
  
  // If no match, use a default set
  if (contentTags.length === 0) {
    contentTags = ['#trending', '#viral', '#content'];
  }
  
  // Combine platform and content hashtags
  return [...platformTags.slice(0, 2), ...contentTags.slice(0, 2)];
};

