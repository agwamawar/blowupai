
import { ContentQualityInsights } from "./ContentQualityInsights";
import { TrendingAnalysis } from "./TrendingAnalysis";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { CompetitorBenchmark } from "./CompetitorBenchmark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon } from "lucide-react";
import { ViralPerformanceMetrics } from "./ViralPerformanceMetrics";
import { KeyViralMoments } from "./KeyViralMoments";
import { SocialAmplificationStrategy } from "./SocialAmplificationStrategy";
import { FinalOptimizations } from "./FinalOptimizations";

interface InsightItem {
  label: string;
  value: number;
  icon: React.ReactNode;
  description: string;
  benchmarkValue?: number;
}

interface HighlightMoment {
  timestamp: string;
  title: string;
  description: string;
  retention: number;
  isPositive: boolean;
  fix?: string;
}

interface InsightsSectionProps {
  contentInsights: InsightItem[];
  trendScore: number;
  trendingHashtags: string[];
  trendOpportunities: string[];
  recommendations: Array<{
    title: string;
    description: string;
    actionItems?: string[];
  }>;
  bestSegments?: Array<{ timestamp: string; reason: string }>;
  projectedReachBoost?: number;
  targetAudienceMatch?: number;
}

export function InsightsSection({
  contentInsights,
  trendScore,
  trendingHashtags,
  trendOpportunities,
  recommendations,
  bestSegments = [],
  projectedReachBoost = 37,
  targetAudienceMatch = 91
}: InsightsSectionProps) {
  // Enhanced moments with specific insights and actionable fixes
  const highlightMoments: HighlightMoment[] = [
    {
      timestamp: "0:03",
      title: "Strong Hook",
      description: "Your opening hook instantly captures attention",
      retention: 94,
      isPositive: true
    },
    {
      timestamp: "0:15",
      title: "Engagement Peak",
      description: "Smooth transition + visual focus drives engagement",
      retention: 96,
      isPositive: true
    },
    {
      timestamp: "0:20",
      title: "Viewers Start Skipping",
      description: "Attention drop detected at this timestamp",
      retention: 68,
      isPositive: false,
      fix: "Add a 1-second text pop-up with a \"Wait for it…\" teaser"
    },
    {
      timestamp: "0:29",
      title: "CTA is Weak",
      description: "Only 30% of viewers act on this call to action",
      retention: 72,
      isPositive: false,
      fix: "Change the CTA to \"Comment '🔥' if you're watching till the end!\""
    },
    {
      timestamp: "0:32",
      title: "Small Engagement Dip",
      description: "Temporary drop in viewer attention",
      retention: 70,
      isPositive: false,
      fix: "Insert a 0.5-second screen shake or zoom effect to re-engage viewers"
    },
    {
      timestamp: "0:38",
      title: "Shareable Moment Detected",
      description: "Good close, but lacks strong CTA for action",
      retention: 88,
      isPositive: true,
      fix: "Add \"Tag someone who needs to see this!\" text overlay"
    }
  ];

  // Final optimized changes for maximum impact
  const finalOptimizations = [
    "Move best scene (0:15) to earlier in the video (0:05)",
    "Replace current CTA with: \"Comment '🔥' if you're watching till the end!\"",
    "Add a \"Wait for it…\" pop-up at 0:20 to reduce drop-off",
    "Use trending audio from TikTok's trending sounds library",
    "Insert zoom/shake effect at 0:32 to re-engage viewers"
  ];

  // Social amplification strategies
  const socialAmplificationStrategies = [
    {
      title: "Optimized Video Edits",
      items: [
        "Crop video into a square format (1080x1080) for reposting on Instagram Reels",
        "Add auto-generated captions at the bottom for 15% longer watch time"
      ]
    },
    {
      title: "TikTok SEO Optimization",
      items: [
        "Change caption to: \"Wait for the 🔥 moment at 0:38! #ForYouPage\"",
        "Include exactly 3-5 trending hashtags in your first comment"
      ]
    },
    {
      title: "Repost Strategy",
      items: [
        "Repost on YouTube Shorts with this new title: \"Viral TikTok Trend You Need to See!\"",
        "Create a teaser for Instagram stories with a link to your main profile"
      ]
    }
  ];

  return (
    <>
      <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md mb-6">
        <CardHeader className="pb-3">
          <CardTitle className="text-primary text-lg flex items-center">
            <RocketIcon className="h-5 w-5 text-primary mr-2" />
            Viral Performance Report
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Viral Performance Metrics */}
          <ViralPerformanceMetrics 
            trendScore={trendScore}
            projectedReachBoost={projectedReachBoost}
            targetAudienceMatch={targetAudienceMatch}
          />

          {/* Key Viral Moments */}
          <KeyViralMoments highlightMoments={highlightMoments} />
          
          {/* Content Quality and Trending Analysis */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ContentQualityInsights insights={contentInsights} />
            <TrendingAnalysis 
              trendScore={trendScore} 
              hashtags={trendingHashtags}
              opportunities={trendOpportunities}
            />
          </div>
          
          {/* Recommendations */}
          <div className="mb-6">
            <RecommendationsPanel recommendations={recommendations} />
          </div>

          {/* Competitor Benchmark */}
          <div className="mb-6">
            <CompetitorBenchmark insights={contentInsights} />
          </div>
          
          {/* Social Amplification Strategy */}
          <div className="mb-6">
            <SocialAmplificationStrategy strategies={socialAmplificationStrategies} />
          </div>
          
          {/* Final Optimizations */}
          <FinalOptimizations optimizations={finalOptimizations} />
        </CardContent>
      </Card>
    </>
  );
}
