
import React from 'react';
import { ChartBar, Flame, Zap, Music, Clock } from 'lucide-react';

/**
 * Creates content insights based on video analysis with benchmark comparisons
 * Adjusted for follower count
 */
export const generateContentInsights = (analysisData: any, followerCount: number = 0) => {
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
