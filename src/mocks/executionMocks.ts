
// Execution analysis specific mock data
export const executionAnalysisMockData = {
  editingQuality: {
    pacingScore: 7.5,
    transitions: ["Fade", "Cut", "Zoom"],
    visualEffects: ["Text overlay", "Lower third", "Graphics"]
  },
  audioQuality: {
    clarity: 8,
    balance: 7,
    backgroundMusic: {
      used: true,
      type: "Upbeat electronic"
    },
    soundEffects: ["Whoosh", "Pop", "Ding"]
  },
  platformOptimization: {
    correctAspectRatio: true,
    suggestedHashtags: ["#trending", "#tutorial", "#howto"]
  },
  contentStructure: {
    hookStrength: 6.5,
    buildup: 8,
    payoff: 7,
    keyMoments: [
      { timestamp: "0:08", description: "Main concept introduction lacks immediate hook" },
      { timestamp: "0:23", description: "Good explanation of key benefit with visual aid" },
      { timestamp: "0:42", description: "Strong demonstration of technique with clear framing" },
      { timestamp: "1:12", description: "Effective conclusion with clear call-to-action" }
    ]
  },
  styleConsistency: {
    colorGrading: 7,
    textOverlays: 8,
    framing: 6,
    brandAlignment: 7
  },
  narrativeFlow: {
    pacing: 7,
    storyProgression: 8,
    transitions: 6,
    engagementCurve: [
      { point: 0, value: 100 },
      { point: 1, value: 95 },
      { point: 2, value: 85 },
      { point: 3, value: 80 },
      { point: 4, value: 75 },
      { point: 5, value: 70 },
      { point: 6, value: 68 },
      { point: 7, value: 72 },
      { point: 8, value: 75 },
      { point: 9, value: 70 },
      { point: 10, value: 65 }
    ]
  }
};
