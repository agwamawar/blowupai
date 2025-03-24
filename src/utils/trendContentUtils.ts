
/**
 * Utility functions for enhancing trend analysis with content-specific data
 */

/**
 * Calculates trend score based on content type
 */
export function calculateTrendScoreForContentType(contentType: string): number {
  const baseScore = 75;
  
  if (!contentType) return baseScore;
  
  // Adjust score based on content type and current trends
  if (contentType.includes('Challenge') || contentType.includes('Trend Jumps')) {
    return baseScore + 15; // Challenges tend to be highly trending
  } else if (contentType.includes('Skits') || contentType.includes('Funny')) {
    return baseScore + 10; // Comedy content performs well generally
  } else if (contentType.includes('Tutorial') || contentType.includes('How-To')) {
    return baseScore + 5; // Educational content has steady performance
  } else if (contentType.includes('Reaction')) {
    return baseScore + 8; // Reaction videos have good engagement
  } else if (contentType.includes('Review')) {
    return baseScore + 3; // Reviews have moderate trend alignment
  }
  
  return baseScore;
}

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

/**
 * Enhances categories based on content type
 */
export function enhanceCategoriesForContentType(categories: string[], contentType: string): string[] {
  if (!contentType) return categories;
  
  const contentTypeCategories: Record<string, string[]> = {
    'Skits': ['Comedy', 'Entertainment', 'Humor'],
    'Funny Skits': ['Comedy', 'Entertainment', 'Humor'],
    'Reaction': ['Reactions', 'Commentary', 'Entertainment'],
    'Challenge': ['Challenges', 'Trends', 'Social Media'],
    'Storytelling': ['Storytelling', 'Personal', 'Lifestyle'],
    'Storytime': ['Storytelling', 'Personal', 'Lifestyle'],
    'Tutorial': ['Education', 'How-To', 'DIY'],
    'How-To': ['Education', 'How-To', 'DIY'],
    'Review': ['Reviews', 'Products', 'Opinion'],
    'Duets': ['Collaboration', 'Entertainment', 'Duets'],
    'POV Content': ['POV', 'Acting', 'Creative'],
    'Trend Jumps': ['Trends', 'Challenges', 'Viral Content']
  };
  
  // Find matching content types
  for (const [type, typeCategories] of Object.entries(contentTypeCategories)) {
    if (contentType.includes(type)) {
      // Combine default categories with content-specific ones, prioritizing specific
      return [...typeCategories, ...categories.filter(cat => !typeCategories.includes(cat))].slice(0, 3);
    }
  }
  
  return categories;
}

/**
 * Enhances trend opportunities based on content type
 */
export function enhanceTrendOpportunitiesForContentType(opportunities: string[], contentType: string): string[] {
  if (!contentType) return opportunities;
  
  const contentTypeOpportunities: Record<string, string[]> = {
    'Skits': [
      'Use comedy timing techniques with 1-second pauses before punchlines',
      'Add unexpected pattern interrupts at the 5-second mark',
      'Include reaction shots after key moments'
    ],
    'Funny Skits': [
      'Use comedy timing techniques with 1-second pauses before punchlines',
      'Add unexpected pattern interrupts at the 5-second mark',
      'Include reaction shots after key moments'
    ],
    'Reaction': [
      'Capture authentic initial reactions without cuts',
      'Use split screen techniques to show content and reaction simultaneously',
      'Add text overlays highlighting key emotional moments'
    ],
    'Challenge': [
      'Show the challenge result in the first 3 seconds',
      'Include slow-motion segments for impressive moments',
      'Add clear on-screen challenge instructions'
    ],
    'Storytelling': [
      'Start with the most emotional or surprising moment',
      'Use music that builds with the narrative arc',
      'Include text timestamps for story progression'
    ],
    'Storytime': [
      'Start with the most emotional or surprising moment',
      'Use music that builds with the narrative arc',
      'Include text timestamps for story progression'
    ],
    'Tutorial': [
      'Show the finished result in the first 2 seconds',
      'Use step-by-step text overlays with numbers',
      'Include close-up shots of detailed techniques'
    ],
    'How-To': [
      'Show the finished result in the first 2 seconds',
      'Use step-by-step text overlays with numbers',
      'Include close-up shots of detailed techniques'
    ],
    'Review': [
      'State clear rating in first 3 seconds',
      'Use before/after or comparison shots',
      'Include pros/cons text overlays'
    ],
    'Duets': [
      'Synchronize movements/reactions perfectly',
      'Use transitions that flow between both creators',
      'Leverage contrasting styles for maximum effect'
    ],
    'POV Content': [
      'Establish perspective clearly in first 2 seconds',
      'Use camera movements that enhance immersion',
      'Incorporate POV-specific text overlays'
    ],
    'Trend Jumps': [
      'Participate in trend within 24-48 hours of emergence',
      'Add unique personal twist to stand out',
      'Use trending sound/template exactly as popular version'
    ]
  };
  
  // Find matching content types
  for (const [type, typeOpportunities] of Object.entries(contentTypeOpportunities)) {
    if (contentType.includes(type)) {
      // Return content-specific opportunities, they're more valuable than generic ones
      return typeOpportunities;
    }
  }
  
  return opportunities;
}
