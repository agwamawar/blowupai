
/**
 * Utility functions for categorizing content
 */

/**
 * Gets relevant categories based on content type
 */
export const getRelevantCategories = (contentType: string): string[] => {
  const contentCategories = {
    'gaming': ['Gaming', 'Entertainment'],
    'comedy': ['Comedy', 'Entertainment'],
    'dance': ['Dance', 'Entertainment'],
    'beauty': ['Beauty', 'Lifestyle'],
    'fashion': ['Fashion', 'Lifestyle'],
    'food': ['Food', 'Lifestyle'],
    'fitness': ['Fitness', 'Health'],
    'travel': ['Travel', 'Lifestyle'],
    'education': ['Education', 'Informative'],
    'lifehack': ['Life Hacks', 'How-to']
  };
  
  let contentTypeLower = contentType.toLowerCase();
  
  // Check if the content type contains any of our keywords
  for (const [category, categories] of Object.entries(contentCategories)) {
    if (contentTypeLower.includes(category)) {
      return categories;
    }
  }
  
  // Default categories
  return ['Entertainment', 'Social Media'];
};

