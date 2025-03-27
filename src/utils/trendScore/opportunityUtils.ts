
/**
 * Utility functions for enhancing trend opportunities based on content type
 */

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
