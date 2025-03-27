
/**
 * Utility functions for generating content opportunities
 */

/**
 * Gets platform and content-specific opportunities
 */
export const getContentSpecificOpportunities = (platform: string, contentType: string): string[] => {
  const baseTips = {
    'tiktok': [
      'Use trending TikTok sounds',
      'Add text overlays for key points',
      'Create a strong hook in first 3 seconds'
    ],
    'instagram': [
      'Use Instagram-specific filters',
      'Incorporate Reels-optimized transitions',
      'Add engaging stickers'
    ],
    'youtube': [
      'Optimize thumbnail for YouTube Shorts',
      'Add subscribe call-to-action',
      'Use YouTube chapters for longer content'
    ]
  };
  
  const contentSpecificTips = {
    'gaming': [
      'Show gameplay highlights in first 3 seconds',
      'Add reaction overlays at key moments',
      'Include game title in text overlays'
    ],
    'comedy': [
      'Deliver punchline within first 5 seconds',
      'Use dramatic sound effects at key moments',
      'Add reaction text overlays'
    ],
    'dance': [
      'Start with the most impressive move',
      'Use popular dance music that\'s trending',
      'Add beat-synced transitions'
    ],
    'beauty': [
      'Show the end result in the first 2 seconds',
      'Use close-ups for detailed techniques',
      'Include product information in text overlays'
    ],
    'fashion': [
      'Show outfit transformation in first 3 seconds',
      'Use trending transition effects between outfits',
      'Include outfit details in text overlays'
    ],
    'food': [
      'Show finished dish in first 2 seconds',
      'Use close-ups of sizzling/bubbling moments',
      'Include recipe text overlays'
    ],
    'fitness': [
      'Show before/after or impressive move first',
      'Use motivational text overlays',
      'Include form tips in captions'
    ]
  };
  
  // Get base tips for the platform
  const platformTips = baseTips[platform] || baseTips['tiktok'];
  
  // Try to match content type to our predefined categories
  let contentTypeLower = contentType.toLowerCase();
  let specificTips = [];
  
  // Check if the content type contains any of our keywords
  for (const [category, tips] of Object.entries(contentSpecificTips)) {
    if (contentTypeLower.includes(category)) {
      specificTips = tips;
      break;
    }
  }
  
  // If no match, use a default set
  if (specificTips.length === 0) {
    specificTips = [
      'Create a strong pattern interrupt in first 3 seconds',
      'Add text overlays for key messages',
      'Use trending transitions between scenes'
    ];
  }
  
  // Return a mix of platform and content-specific tips
  return [platformTips[0], specificTips[0], platformTips[1]];
};

