
// Mock data for top performing content
export const topPerformingContent = [
  {
    title: "5 Productivity Hacks",
    videoUrl: "https://example.com/video1",
    technique: "Pattern interrupts with visual demos",
    views: "1.2M",
    engagement: "32%"
  },
  {
    title: "Morning Routine Challenge",
    videoUrl: "https://example.com/video2",
    technique: "Before/after transformation",
    views: "950K",
    engagement: "28%"
  },
  {
    title: "Budget Travel Tips",
    videoUrl: "https://example.com/video3",
    technique: "Story-driven with key takeaways",
    views: "1.5M",
    engagement: "35%"
  }
];

// Fallback data for highlightMoments
export const defaultHighlightMoments = [
  {
    timestamp: "00:12",
    title: "Strong Hook",
    description: "The opening hook captures attention effectively",
    retention: 95,
    isPositive: true
  },
  {
    timestamp: "00:45",
    title: "Key Information",
    description: "Important information presented clearly",
    retention: 85,
    isPositive: true
  }
];

// Fallback data for optimizations
export const defaultOptimizations = [
  "Add captions to improve accessibility",
  "Include a clear call-to-action at the end",
  "Use more visual transitions between key points"
];

// Fallback content insights
export const defaultContentInsights = [
  {
    label: "Pacing",
    value: 85,
    icon: {
      type: "timer",
      color: "blue"
    },
    description: "Good pacing throughout the video"
  },
  {
    label: "Visual Quality",
    value: 92,
    icon: {
      type: "image",
      color: "violet"
    },
    description: "High quality visuals with good lighting"
  }
];

// Mock data for concept analysis
export const conceptAnalysisMockData = {
  viralityScore: 78,
  trendAlignment: {
    categoryMatch: "Tutorials",
    trendLifespan: "Growing",
    remixPotential: 8
  },
  emotionalAppeal: {
    primaryEmotion: "Curiosity",
    intensityRating: 7,
    psychologicalHooks: ["Curiosity Gap", "Value Proposition", "Relatability"]
  },
  hookRetention: {
    openingHookStrength: 8,
    hasPatternDisrupt: true,
    predictedDropoffs: [
      { timestamp: "00:22", percentage: 15 },
      { timestamp: "01:05", percentage: 25 }
    ],
    rewatchability: 7
  },
  uniqueness: {
    originalityScore: 6,
    shareabilityScore: 8,
    engagementPredictors: ["Comments", "Saves"]
  }
};

// Mock data for execution analysis
export const executionAnalysisMockData = {
  editingQuality: {
    pacingScore: 7,
    hasTextOverlays: true,
    onScreenElements: ["Text Overlays", "Transitions", "Graphics"]
  },
  audioDesign: {
    usedTrendingAudio: false,
    soundChoiceImpact: 6,
    audioSyncScore: 8
  },
  platformOptimization: {
    correctAspectRatio: true,
    thumbnailAppeal: 7,
    hashtagEffectiveness: 8,
    suggestedHashtags: ["#LearnOnTikTok", "#ProductivityHacks", "#WorkLife"]
  }
};

// Mock data for virality prediction
export const viralityPredictionMockData = {
  overallScore: 75,
  projectedPerformance: {
    estimatedViews: "10k-50k",
    projectedLikes: "2k-5k",
    commentSharePrediction: {
      comments: 120,
      shares: 300
    }
  },
  improvementSuggestions: [
    "Increase hook strength by adding movement in first 2 seconds",
    "Boost emotional appeal by connecting content to current events",
    "Optimize thumbnail with clearer text and more vibrant colors"
  ]
};

// Mock data for comparative analysis
export const comparativeAnalysisMockData = {
  similarityIndex: {
    conceptMatch: 72,
    executionMatch: 65
  },
  missingElements: [
    "Clear call-to-action",
    "Pattern interrupts every 7-10 seconds",
    "Trending audio implementation"
  ],
  uniqueStrengths: [
    "Original presentation style",
    "Useful informational content",
    "Good production quality"
  ],
  performanceComparison: {
    percentileRank: 65,
    potentialBoost: 35
  }
};
