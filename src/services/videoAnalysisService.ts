
// Mock video analysis service

export const analysisStages = [
  "Validating video format",
  "Reading metadata",
  "Detecting visual elements",
  "Analyzing audio quality",
  "Scanning text content",
  "Evaluating platform compliance",
  "Generating engagement metrics",
  "Finalizing analysis"
];

// Create a video URL without uploading to server (for demo)
export const getVideoUrl = async (file: File): Promise<string> => {
  // For quick demo purposes, just create a local object URL
  return URL.createObjectURL(file);
};

// Generate mock analysis data
export const generateMockAnalysisData = (videoUrl: string, platform: string, contentType: string, followerCount: number) => {
  const sessionId = Date.now().toString();
  
  // Adjust engagement metrics based on follower count
  const followerScale = Math.min(1, Math.log10(followerCount) / Math.log10(100000)) * 0.5;
  const baseScore = Math.floor(Math.random() * 30) + 70;
  const engagementScore = Math.min(100, Math.floor(baseScore * (1 + followerScale)));
  
  // Scale estimated engagement based on follower count
  const estimatedLikes = Math.floor(followerCount * (engagementScore / 100) * 0.1);
  const estimatedShares = Math.floor(followerCount * (engagementScore / 100) * 0.03);
  
  // Generate audience-specific recommendations
  const audienceRecommendations = [];
  
  if (followerCount < 5000) {
    audienceRecommendations.push({
      title: "Build Community Engagement",
      description: "With your current follower size, focus on building deep connections",
      actionItems: [
        "Reply to every comment within first hour of posting",
        "Create content that asks viewers direct questions",
        "Do Q&A sessions based on comment sections"
      ]
    });
  } else if (followerCount < 50000) {
    audienceRecommendations.push({
      title: "Expand Reach Through Collaborations",
      description: "Your follower base is substantial enough for strategic collaborations",
      actionItems: [
        "Partner with 3-5 creators in your niche with similar follower counts",
        "Create 'duet' or response content to trending creators",
        "Join engagement pods with other mid-tier creators"
      ]
    });
  } else {
    audienceRecommendations.push({
      title: "Leverage Your Influence",
      description: "With your significant audience, focus on premium content and partnerships",
      actionItems: [
        "Develop branded content with higher production quality",
        "Create exclusive content for your most engaged followers",
        "Launch product lines or partnerships leveraging your audience size"
      ]
    });
  }
  
  // Platform-specific follower-based recommendations
  if (platform === "tiktok") {
    audienceRecommendations.push({
      title: `Optimize for ${followerCount.toLocaleString()} TikTok Followers`,
      description: "TikTok algorithm favors different strategies based on audience size",
      actionItems: [
        followerCount < 10000 ? "Focus on consistency with daily uploads" : "Focus on quality with 3-4 posts per week",
        followerCount < 10000 ? "Join trending sounds within 24hrs of emergence" : "Put your unique spin on trends later in cycle",
        "Post during your audience's most active hours (see analytics)"
      ]
    });
  }
  
  return {
    id: sessionId,
    video_url: videoUrl,
    platform,
    content_type: contentType,
    status: 'completed',
    follower_count: followerCount,
    engagement_score: engagementScore,
    engagement_prediction: {
      estimated_likes: estimatedLikes,
      estimated_shares: estimatedShares,
      watch_time: "80% of video",
      best_segments: [
        { timestamp: "0:05", reason: "Strong viewer retention" },
        { timestamp: "0:18", reason: "High engagement point" },
        { timestamp: "0:32", reason: "Peak audience interest" }
      ]
    },
    platform_analysis: {
      compliance: {
        "Video Length": "Optimal",
        "Format": "Vertical (9:16)",
        "Content Type": contentType
      },
      guidelines: {
        "optimalLength": "15-60 seconds",
        "recommendedFormat": "9:16 vertical",
        "bestPostingTime": "6-9 PM local time"
      },
      recommendations: audienceRecommendations
    },
    video_metadata: {
      duration: "0:45",
      audience_size: followerCount
    },
    visual_quality: {
      lighting: "Good",
      stability: "Average",
      clarity: "Good"
    },
    audio_analysis: {
      clarity: "Good",
      background_noise: "Low",
      emotion: "Neutral/Positive"
    },
    content_analysis: {
      objects: ["Person", "Product", "Text", "Graphics"],
      text_detected: ["Title", "Brand Name", "Call to Action"],
      scene_transitions: "Smooth transitions at 0:12, 0:25, and 0:38",
      audience_demographics: {
        size: followerCount,
        age_groups: followerCount > 50000 ? ["18-24", "25-34"] : ["16-24", "25-29"],
        primary_interests: followerCount > 50000 ? ["Technology", "Lifestyle"] : ["Entertainment", "Trends"]
      }
    }
  };
};
