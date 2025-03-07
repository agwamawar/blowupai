
import React from 'react';
import { ChartBar, Flame, Zap, Music, Clock } from 'lucide-react';

/**
 * Utility functions for generating analysis data
 */

/**
 * Generates personalized content-based hashtags based on analysis data and follower count
 */
export const generatePersonalizedHashtags = (analysisData: any, followerCount: number = 10000) => {
  const baseHashtags = ["#contentcreator", "#socialmedia"];
  const detectedObjects = analysisData?.content_analysis?.objects || [];
  
  // Add hashtags based on detected objects
  const objectHashtags = detectedObjects
    .slice(0, 3)
    .map((obj: string) => `#${obj.toLowerCase().replace(/\s+/g, '')}`);
  
  // Add platform-specific hashtag
  const platformHashtag = analysisData?.video_metadata?.platform 
    ? [`#${analysisData.video_metadata.platform.toLowerCase()}`]
    : ["#trending"];
    
  // Add follower count based hashtags
  const followerTierHashtag = followerCount < 10000 
    ? ["#smallcreator", "#growingcommunity"] 
    : followerCount < 50000 
      ? ["#midtier", "#influencer"] 
      : ["#contentcreator", "#influencermarketing"];
  
  return [...baseHashtags, ...objectHashtags, ...platformHashtag, ...followerTierHashtag.slice(0, 1)];
};

/**
 * Generates video-specific trend opportunities based on follower count
 */
export const generateTrendOpportunities = (analysisData: any, followerCount: number = 10000) => {
  const objects = analysisData?.content_analysis?.objects || [];
  const platform = analysisData?.video_metadata?.platform || "TikTok";
  
  // Base opportunities that apply to all follower counts
  const baseOpportunities = [
    `Videos featuring ${objects.length > 0 ? objects[0] : "similar content"} with quick zooms at 0:03 seeing 43% higher completion rates`,
    `${platform} creators using on-screen text for 60% of video duration get 2.8x more shares`
  ];
  
  // Follower-specific opportunities
  const followerOpportunities = [];
  
  if (followerCount < 10000) {
    followerOpportunities.push(
      "Small accounts using trending sounds within 24hrs of emergence see 2.2x faster follower growth",
      "Creators under 10K followers who post consistently (min. 1/day) grow 3x faster than intermittent posters"
    );
  } else if (followerCount < 50000) {
    followerOpportunities.push(
      "Mid-size creators (10K-50K) mentioning their follower milestone in videos see 67% more new follows",
      "Collaboration videos between mid-tier creators boost mutual engagement by 45% on average"
    );
  } else {
    followerOpportunities.push(
      "Larger accounts (50K+) leveraging 'close friends' or 'subscriber-only' content see 35% higher retention",
      "Creators with 50K+ followers who launch products see 3.2x higher conversion than smaller accounts"
    );
  }
  
  // Add platform-specific opportunity with concrete example
  if (platform === "TikTok") {
    followerOpportunities.push(`TikTok creators with ${followerCount < 50000 ? "smaller audiences" : "larger audiences"} are seeing success with ${followerCount < 50000 ? "behind-the-scenes content showing authenticity" : "premium branded content with higher production value"}`);
  } else if (platform === "Instagram") {
    followerOpportunities.push(`Instagram ${followerCount < 50000 ? "growth accounts" : "established creators"} are having success with ${followerCount < 50000 ? "carousel posts featuring data visualizations" : "exclusive reels showing premium lifestyle content"}`);
  } else if (platform === "YouTube") {
    followerOpportunities.push(`YouTube ${followerCount < 50000 ? "smaller channels" : "larger channels"} are trending with ${followerCount < 50000 ? "shorter format deep dives under 10 minutes" : "longer premium content with higher production value"}`);
  }
  
  return [...baseOpportunities, ...followerOpportunities.slice(0, 3)];
};

/**
 * Creates content insights based on video analysis with benchmark comparisons
 * Adjusted for follower count
 */
export const generateContentInsights = (analysisData: any, followerCount: number = 10000) => {
  // Adjust benchmarks based on follower count
  const followerAdjustment = Math.min(1, Math.log10(followerCount) / Math.log10(100000)) * 15;
  const smallAccountBenchmark = 73;
  const largeAccountBenchmark = 88;
  
  // Higher benchmark for larger accounts
  const benchmarkValue = Math.min(
    largeAccountBenchmark, 
    Math.floor(smallAccountBenchmark + followerAdjustment)
  );
  
  return [
    {
      label: "Hook Strength",
      value: analysisData?.engagement_prediction?.best_segments?.[0] ? 85 : 65,
      icon: <Flame className="h-4 w-4 text-red-400" />,
      description: analysisData?.engagement_prediction?.best_segments?.[0] 
        ? "Strong opening that captures attention immediately" 
        : `First 3 seconds need more visual interest and motion for your ${followerCount.toLocaleString()} followers`,
      benchmarkValue: benchmarkValue - 5
    },
    {
      label: "Pacing",
      value: 72,
      icon: <Zap className="h-4 w-4 text-yellow-400" />,
      description: analysisData?.content_analysis?.scene_transitions === "Multiple scenes detected"
        ? "Good scene transitions, could be slightly faster at 0:12-0:18"
        : `Single scene format needs more dynamic elements every ${followerCount > 50000 ? "3-5" : "5-7"} seconds for your audience size`,
      benchmarkValue: benchmarkValue
    },
    {
      label: "Audio Quality",
      value: 90,
      icon: <Music className="h-4 w-4 text-blue-400" />,
      description: `Excellent sound clarity with appropriate background music levels (${followerCount > 50000 ? "15-20%" : "25-30%"} volume)`,
      benchmarkValue: benchmarkValue - 10
    },
    {
      label: "Retention",
      value: 78,
      icon: <Clock className="h-4 w-4 text-green-400" />,
      description: `Good viewer retention through ${analysisData?.video_metadata?.duration || "0:45"}, drop at 0:28 could be improved with pattern interrupt for ${followerCount > 50000 ? "your premium audience" : "your growing audience"}`,
      benchmarkValue: benchmarkValue - 3
    }
  ];
};

/**
 * Generates content-specific recommendations with concrete action items
 * Tailored for follower count
 */
export const generatePersonalizedRecommendations = (analysisData: any, followerCount: number = 10000) => {
  const objects = analysisData?.content_analysis?.objects || [];
  const bestSegments = analysisData?.engagement_prediction?.best_segments || [];
  const platform = analysisData?.video_metadata?.platform || "TikTok";
  const duration = analysisData?.video_metadata?.duration || "0:45";
  
  // Base recommendations that work for all follower counts
  const recommendations = [
    {
      title: bestSegments.length > 0 ? "Optimize Your Best Segment" : "Improve Your Opening Hook",
      description: bestSegments.length > 0 
        ? `Your strongest moment at ${bestSegments[0]?.timestamp} drives 2.3x higher retention than other segments.`
        : `The first 3 seconds are critical for viewer retention with your ${followerCount.toLocaleString()} followers.`,
      actionItems: bestSegments.length > 0
          ? [
              `Repurpose the ${bestSegments[0]?.timestamp} segment as your thumbnail or preview`,
              "Create a pattern interrupt before this moment to build anticipation",
              "Use this segment style for future video openings"
            ]
          : [
              "Start with movement in first 1 second (zoom, slide or person)",
              "Open with a surprising statistic or question",
              "Show end result first, then explain how to get there"
            ]
    }
  ];
  
  // Follower-count specific recommendations
  if (followerCount < 10000) {
    recommendations.push({
      title: "Leverage Small Account Strategy",
      description: "Smaller accounts need to focus on rapid growth tactics.",
      actionItems: [
        "Post daily at consistent times to build algorithmic favor",
        "Reply to every comment within 30 minutes of posting",
        "Join engagement groups with similar-sized creators"
      ]
    });
  } else if (followerCount < 50000) {
    recommendations.push({
      title: "Mid-Size Creator Strategy",
      description: "At your follower level, focus on both retention and acquisition.",
      actionItems: [
        "Create a content series with consistent branding and format",
        "Leverage 2-3 trending sounds per week with your unique style",
        "Develop a recognizable content signature (intro, transition, or catchphrase)"
      ]
    });
  } else {
    recommendations.push({
      title: "Large Account Optimization",
      description: "With 50K+ followers, focus on maintaining premium content quality.",
      actionItems: [
        "Develop a content calendar with 2-3 high-quality posts per week",
        "Invest in better lighting and audio equipment for studio quality",
        "Create exclusive content formats that smaller creators can't easily replicate"
      ]
    });
  }
  
  // Add object-based recommendation with specific techniques
  if (objects.length > 0) {
    recommendations.push({
      title: `Highlight ${objects[0]} More Effectively`,
      description: `Videos featuring clear focus on ${objects[0]} see 37% higher completion rates with your audience size.`,
      actionItems: [
        `Use close-up shots of ${objects[0]} with ${followerCount > 50000 ? "professional" : "bright"} lighting`,
        `Add text overlay that directly mentions ${objects[0]} benefits`,
        followerCount > 50000 
          ? "Use professional color grading to make subject stand out" 
          : "Create visual contrast between subject and background"
      ]
    });
  }
  
  // Add platform-specific recommendation with exact examples for follower count
  if (platform === "TikTok") {
    recommendations.push({
      title: "Leverage Current TikTok Audio Trends",
      description: `Videos using trending sounds appear on FYP ${followerCount > 50000 ? "1.5" : "2.8"}x more frequently.`,
      actionItems: [
        "Use 'Original Sound - KAII' currently trending with 1.5M videos",
        followerCount < 50000 
          ? "Join trends within first 24-48 hours for maximum distribution" 
          : "Add your premium spin to established trends",
        followerCount < 50000 
          ? "Mention the sound name in your caption for discoverability"
          : "Create your own sound that smaller creators can use"
      ]
    });
  } else if (platform === "Instagram") {
    recommendations.push({
      title: "Optimize for Instagram Algorithm",
      description: "Instagram's current algorithm prioritizes specific patterns for your audience size.",
      actionItems: [
        followerCount < 50000 
          ? "Use exactly 3-5 relevant hashtags in first comment (not caption)" 
          : "Use 1-2 branded hashtags and 2-3 niche hashtags",
        "Add 'Save this for later' text overlay to boost save rate",
        followerCount > 50000 
          ? "Create Instagram-exclusive content to drive platform loyalty" 
          : "Include location tag to leverage local discovery"
      ]
    });
  } else {
    recommendations.push({
      title: "Optimize Text Overlays for Maximum Impact",
      description: `Strategic text usage increases retention by ${followerCount > 50000 ? "35" : "42"}%.`,
      actionItems: [
        `Use ${followerCount > 50000 ? "branded" : "large"} text (at least 14% of screen height) with contrasting outline`,
        "Position key statements at top of frame for 2.5+ seconds",
        followerCount > 50000 
          ? "Use consistent text styling across all content for brand recognition" 
          : "Limit to 1-2 lines maximum per text element"
      ]
    });
  }
  
  // Add pacing recommendation with specific timing guidance based on follower count
  recommendations.push({
    title: "Perfect Your Video Pacing",
    description: `For ${duration} videos targeting ${followerCount.toLocaleString()} followers, optimal pacing follows a specific pattern.`,
    actionItems: [
      followerCount > 50000 
        ? "Make first transition within 2-3 seconds of opening" 
        : "Make first transition within 3-5 seconds of opening",
      followerCount > 50000 
        ? "Add pattern interrupts every 5-8 seconds (zoom, text, sound effect)" 
        : "Add pattern interrupts every 7-10 seconds (zoom, text, sound effect)",
      "Speed up explanation segments by 10-15% in editing"
    ]
  });
  
  return recommendations;
};
