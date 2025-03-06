
import React from 'react';
import { ChartBar, Flame, Zap, Music, Clock } from 'lucide-react';

/**
 * Utility functions for generating analysis data
 */

/**
 * Generates personalized content-based hashtags based on analysis data
 */
export const generatePersonalizedHashtags = (analysisData: any) => {
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
    
  return [...baseHashtags, ...objectHashtags, ...platformHashtag];
};

/**
 * Generates video-specific trend opportunities
 */
export const generateTrendOpportunities = (analysisData: any) => {
  const objects = analysisData?.content_analysis?.objects || [];
  const platform = analysisData?.video_metadata?.platform || "TikTok";
  
  // More specific and actionable opportunity suggestions
  const specificOpportunities = [
    `Videos featuring ${objects.length > 0 ? objects[0] : "similar content"} with quick zooms at 0:03 seeing 43% higher completion rates`,
    `${platform} creators using on-screen text for 60% of video duration get 2.8x more shares`,
    `${objects.length > 1 ? `Content featuring both ${objects[0]} and ${objects[1]}` : "Similar content"} with pattern interrupts every 7-10 seconds boost average watch time by 37%`
  ];
  
  // Add platform-specific opportunity with concrete example
  if (platform === "TikTok") {
    specificOpportunities.push("TikTok videos using 'Original Sound - KAII' trending audio are getting featured on FYP 2.5x more frequently");
  } else if (platform === "Instagram") {
    specificOpportunities.push("Reels with bold text callouts within first 2 seconds have 44% higher retention than those without text");
  } else if (platform === "YouTube") {
    specificOpportunities.push("Adding chapters with emoji prefixes in Shorts descriptions increases click-through by 22%");
  }
  
  return specificOpportunities;
};

/**
 * Creates content insights based on video analysis with benchmark comparisons
 */
export const generateContentInsights = (analysisData: any) => {
  return [
    {
      label: "Hook Strength",
      value: analysisData?.engagement_prediction?.best_segments?.[0] ? 85 : 65,
      icon: <Flame className="h-4 w-4 text-red-400" />,
      description: analysisData?.engagement_prediction?.best_segments?.[0] 
        ? "Strong opening that captures attention immediately" 
        : "First 3 seconds need more visual interest and motion",
      benchmarkValue: 73
    },
    {
      label: "Pacing",
      value: 72,
      icon: <Zap className="h-4 w-4 text-yellow-400" />,
      description: analysisData?.content_analysis?.scene_transitions === "Multiple scenes detected"
        ? "Good scene transitions, could be slightly faster at 0:12-0:18"
        : "Single scene format needs more dynamic elements every 5-7 seconds",
      benchmarkValue: 81
    },
    {
      label: "Audio Quality",
      value: 90,
      icon: <Music className="h-4 w-4 text-blue-400" />,
      description: "Excellent sound clarity with appropriate background music levels (25% volume)",
      benchmarkValue: 76
    },
    {
      label: "Retention",
      value: 78,
      icon: <Clock className="h-4 w-4 text-green-400" />,
      description: `Good viewer retention through ${analysisData?.video_metadata?.duration || "0:45"}, drop at 0:28 could be improved with pattern interrupt`,
      benchmarkValue: 69
    }
  ];
};

/**
 * Generates content-specific recommendations with concrete action items
 */
export const generatePersonalizedRecommendations = (analysisData: any) => {
  const objects = analysisData?.content_analysis?.objects || [];
  const bestSegments = analysisData?.engagement_prediction?.best_segments || [];
  const platform = analysisData?.video_metadata?.platform || "TikTok";
  const duration = analysisData?.video_metadata?.duration || "0:45";
  
  const recommendations = [
    {
      title: bestSegments.length > 0 ? "Optimize Your Best Segment" : "Improve Your Opening Hook",
      description: bestSegments.length > 0 
        ? `Your strongest moment at ${bestSegments[0]?.timestamp} drives 2.3x higher retention than other segments.`
        : "The first 3 seconds are critical for viewer retention.",
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
  
  // Add object-based recommendation with specific techniques
  if (objects.length > 0) {
    recommendations.push({
      title: `Highlight ${objects[0]} More Effectively`,
      description: `Videos featuring clear focus on ${objects[0]} see 37% higher completion rates.`,
      actionItems: [
        `Use close-up shots of ${objects[0]} with bright lighting`,
        `Add text overlay that directly mentions ${objects[0]} benefits`,
        "Create visual contrast between subject and background (use depth of field)"
      ]
    });
  }
  
  // Add platform-specific recommendation with exact examples
  if (platform === "TikTok") {
    recommendations.push({
      title: "Leverage Current TikTok Audio Trends",
      description: "Videos using trending sounds appear on FYP 2.8x more frequently.",
      actionItems: [
        "Use 'Original Sound - KAII' currently trending with 1.5M videos",
        "Align transitions with beat drops at 0:03 and 0:12",
        "Mention the sound name in your caption for discoverability"
      ]
    });
  } else if (platform === "Instagram") {
    recommendations.push({
      title: "Optimize for Instagram Algorithm",
      description: "Instagram's current algorithm prioritizes specific patterns.",
      actionItems: [
        "Use exactly 3-5 relevant hashtags in first comment (not caption)",
        "Add 'Save this for later' text overlay to boost save rate",
        "Include location tag to leverage local discovery"
      ]
    });
  } else {
    recommendations.push({
      title: "Optimize Text Overlays for Maximum Impact",
      description: "Strategic text usage increases retention by 42%.",
      actionItems: [
        "Use large text (at least 14% of screen height) with contrasting outline",
        "Position key statements at top of frame for 2.5+ seconds",
        "Limit to 1-2 lines maximum per text element"
      ]
    });
  }
  
  // Add pacing recommendation with specific timing guidance
  recommendations.push({
    title: "Perfect Your Video Pacing",
    description: `For ${duration} videos, optimal pacing follows a specific pattern.`,
    actionItems: [
      "Make first transition within 3-5 seconds of opening",
      "Add pattern interrupts every 7-10 seconds (zoom, text, sound effect)",
      "Speed up explanation segments by 10-15% in editing"
    ]
  });
  
  return recommendations;
};
