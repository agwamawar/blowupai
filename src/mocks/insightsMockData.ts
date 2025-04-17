// Mock data for top performing content
export const topPerformingContent = [
  {
    title: "Royal Treatment Barbershop Surprise",
    videoUrl: "https://example.com/video1",
    technique: "Pattern interrupt with emotional twist",
    views: "2.1M",
    engagement: "42%"
  },
  {
    title: "Mall Haircut Prank Gone Right",
    videoUrl: "https://example.com/video2",
    technique: "Tension to resolution storytelling",
    views: "1.8M",
    engagement: "38%"
  },
  {
    title: "Princess Crown Transformation",
    videoUrl: "https://example.com/video3",
    technique: "Before/after reveal with emotional hook",
    views: "1.5M",
    engagement: "35%"
  }
];

// Highlight moments based on video timestamps
export const defaultHighlightMoments = [
  {
    timestamp: "00:02",
    title: "Strong Pattern Interrupt",
    description: "Instant tension with dad's reaction creates viral hook",
    retention: 98,
    isPositive: true
  },
  {
    timestamp: "00:06",
    title: "Emotional Shift",
    description: "Smooth transition from tension to understanding with 'royalty' line",
    retention: 92,
    isPositive: true
  },
  {
    timestamp: "00:15",
    title: "Professional Showcase",
    description: "High-quality B-roll of tools and techniques drives credibility",
    retention: 88,
    isPositive: true
  },
  {
    timestamp: "00:23",
    title: "Satisfying Reveal",
    description: "Before/after split screen with princess theme resonates strongly",
    retention: 95,
    isPositive: true
  }
];

// Optimizations based on content analysis
export const defaultOptimizations = [
  "Add freeze frame with record scratch at 0:03 to amplify tension",
  "Incorporate trending SZA 'Good Days' remix for mood transition",
  "Use 120fps slow-motion for hair falling shots",
  "Add sparkle effects to final reveal for princess theme"
];

// Content insights based on video elements
export const defaultContentInsights = [
  {
    label: "Hook Strength",
    value: 95,
    icon: {
      type: "zap",
      color: "yellow"
    },
    description: "Instant chaos approach creates powerful pattern interrupt"
  },
  {
    label: "Story Arc",
    value: 92,
    icon: {
      type: "trending-up",
      color: "green"
    },
    description: "Perfect tension-to-resolution narrative flow"
  },
  {
    label: "Production Quality",
    value: 88,
    icon: {
      type: "video",
      color: "blue"
    },
    description: "Strong B-roll and transition game with room for enhancement"
  }
];

// Mock data for concept analysis
export const conceptAnalysisMockData = {
  theme: {
    primary: "Beauty & Personal Care",
    secondary: [
      "Family Content",
      "Transformation",
      "Professional Services"
    ],
    storyStructure: "Tension-Resolution with Professional Transformation",
    emotionalTone: "From confrontational to heartwarming",
    targetAudience: [
      "Parents",
      "Beauty Enthusiasts",
      "Family Content Viewers",
      "Transformation Content Lovers"
    ]
  },
  appeal: {
    storytelling: {
      score: 9,
      feedback: "Masterful tension build and resolution with the 'royalty' angle. The narrative perfectly balances drama with professional service."
    },
    originality: {
      score: 9,
      feedback: "Unique approach to showcasing professional services through a risky but controlled social experiment."
    },
    relatability: {
      score: 8,
      feedback: "Strong parent-child dynamics and universal theme of making children feel special."
    },
    simplicity: {
      score: 7,
      feedback: "Clear story progression but could simplify the transition sequences."
    }
  },
  narrative: {
    hook: "Mall prank turns into heartwarming transformation",
    premise: "Professional service can turn chaos into magic",
    keyElements: [
      "Pattern interrupt opening",
      "Emotional twist",
      "Professional showcase",
      "Family dynamics",
      "Transformation reveal",
      "Princess theme"
    ]
  },
  suggestions: [
    "Add text overlay explaining safety measures during mall approach",
    "Include more reaction shots from other mall visitors",
    "Extend the princess theme throughout with subtle crown graphics",
    "Consider adding professional hair care tips as bottom text"
  ]
};

// Mock data for execution analysis
export const executionAnalysisMockData = {
  editingQuality: {
    pacingScore: 9,
    transitions: ["Whip-pan", "Pop transition", "Split-screen"],
    visualEffects: ["Red tint flash", "Slow motion", "Sparkle effects"]
  },
  audioQuality: {
    clarity: 8,
    balance: 9,
    backgroundMusic: {
      used: true,
      type: "Tension to melodic transition"
    },
    soundEffects: ["Heartbeat", "Record scratch", "Pop sound"]
  },
  platformOptimization: {
    correctAspectRatio: true,
    suggestedHashtags: ["#RoyalTrim", "#HairTransformation", "#BarbershopMoments"]
  },
  contentStructure: {
    hookStrength: 9.5,
    buildup: 8.5,
    payoff: 9,
    keyMoments: [
      { timestamp: "0:02", description: "Perfect tension build with dad's reaction" },
      { timestamp: "0:06", description: "'Royalty' line delivers emotional shift" },
      { timestamp: "0:15", description: "Professional skills showcase needs more close-ups" },
      { timestamp: "0:23", description: "Strong transformation reveal with princess theme" }
    ]
  }
};

// Mock data for virality prediction
export const viralityPredictionMockData = {
  overallScore: 92,
  projectedPerformance: {
    estimatedViews: "1M-3M",
    projectedLikes: "200k-500k",
    commentSharePrediction: {
      comments: 15000,
      shares: 50000
    }
  },
  improvementSuggestions: [
    "Add more dramatic zoom on dad's reaction at 0:02",
    "Extend the princess theme with subtle crown animations",
    "Include short haircare tip in final frame",
    "Optimize thumbnail with split-screen transformation"
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