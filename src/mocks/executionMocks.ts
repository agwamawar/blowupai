
// Execution analysis specific mock data
export const executionAnalysisMockData = {
  editingQuality: {
    pacingScore: 7.5,
    transitions: [
      { type: "Fade", timestamp: "0:03", effectiveness: 85 },
      { type: "Cut", timestamp: "0:12", effectiveness: 92 },
      { type: "Zoom", timestamp: "0:24", effectiveness: 88 }
    ],
    visualEffects: [
      { type: "Text overlay", impact: 82 },
      { type: "Lower third", impact: 78 },
      { type: "Graphics", impact: 85 }
    ],
    pacing: {
      averageClipDuration: 2.3,
      idealClipDuration: 1.8,
      patternInterrupts: [
        { timestamp: "0:08", suggestion: "Add sudden zoom for emphasis" },
        { timestamp: "0:15", suggestion: "Insert quick motion graphics" },
        { timestamp: "0:22", suggestion: "Use speed ramp effect" }
      ]
    }
  },
  audioQuality: {
    voiceClarity: {
      score: 8.5,
      metrics: {
        clarity: 85,
        volume: 92,
        consistency: 88,
        noise: 12
      }
    },
    mixBalance: {
      score: 7.8,
      levels: {
        voice: 0,
        music: -12,
        effects: -18
      }
    },
    backgroundMusic: {
      used: true,
      type: "Upbeat electronic",
      effectiveness: 82,
      suggestions: [
        "Lower volume during key points",
        "Add bass boost at 0:15",
        "Fade out music at transitions"
      ]
    },
    soundEffects: [
      { type: "Whoosh", timestamp: "0:03", impact: 75 },
      { type: "Pop", timestamp: "0:12", impact: 82 },
      { type: "Ding", timestamp: "0:24", impact: 88 }
    ]
  }
};
