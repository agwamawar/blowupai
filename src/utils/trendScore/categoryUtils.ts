
/**
 * Utility functions for enhancing categories based on content type
 */

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
