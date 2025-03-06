
import { ContentQualityInsights } from "./ContentQualityInsights";
import { TrendingAnalysis } from "./TrendingAnalysis";
import { RecommendationsPanel } from "./RecommendationsPanel";
import { CompetitorBenchmark } from "./CompetitorBenchmark";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RocketIcon, Target, CheckCircle, XCircle, AlertTriangle, Trophy, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-primary mb-1">{trendScore}/100</div>
              <div className="text-sm text-gray-700 text-center">Virality Potential Score</div>
              <div className="text-xs text-green-600 mt-1">High probability of trending!</div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-green-500 mb-1">+{projectedReachBoost}%</div>
              <div className="text-sm text-gray-700 text-center">Projected Reach Boost</div>
              <div className="text-xs text-green-600 mt-1">With the following optimizations!</div>
            </div>
            <div className="p-4 bg-primary/5 rounded-lg flex flex-col items-center justify-center">
              <div className="text-2xl font-bold text-primary mb-1">{targetAudienceMatch}%</div>
              <div className="text-sm text-gray-700 text-center">Target Audience Match</div>
              <div className="text-xs text-green-600 mt-1">Content aligns well with platform trends!</div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-base font-semibold mb-4 flex items-center">
              <Target className="h-4 w-4 text-primary mr-2" />
              Key Viral Indicators
            </h3>
            
            <h4 className="text-sm font-medium mb-3">High-Impact Moments</h4>
            <div className="space-y-3 mb-6">
              {highlightMoments.filter(moment => moment.isPositive).map((moment, idx) => (
                <div key={idx} className="flex p-3 border border-green-100 bg-green-50 rounded-md">
                  <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-green-700 text-sm font-medium">{moment.timestamp}</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <CheckCircle className="h-4 w-4 text-green-600 mr-1.5" />
                      <h5 className="font-medium text-gray-800">{moment.title}</h5>
                      <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                        {moment.retention}% retention
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{moment.description}</p>
                    {moment.fix && (
                      <div className="mt-1.5 flex items-start">
                        <span className="text-xs text-green-700 font-medium flex items-center">
                          <span className="mr-1">Boost potential:</span>
                          <span>{moment.fix}</span>
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-medium mb-3">Drop-off Risks & Fixes</h4>
            <div className="space-y-3 mb-6">
              {highlightMoments.filter(moment => !moment.isPositive).map((moment, idx) => (
                <div key={idx} className="flex p-3 border border-amber-100 bg-amber-50 rounded-md">
                  <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mr-3">
                    <span className="text-amber-700 text-sm font-medium">{moment.timestamp}</span>
                  </div>
                  <div>
                    <div className="flex items-center">
                      <AlertTriangle className="h-4 w-4 text-amber-600 mr-1.5" />
                      <h5 className="font-medium text-gray-800">{moment.title}</h5>
                      <span className="ml-2 text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">
                        {moment.retention}% retention
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{moment.description}</p>
                    {moment.fix && (
                      <div className="mt-1.5 flex items-start">
                        <span className="text-xs text-amber-700 font-medium mr-1">🔹 Fix:</span>
                        <span className="text-xs text-gray-700">{moment.fix}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <ContentQualityInsights insights={contentInsights} />
            
            <TrendingAnalysis 
              trendScore={trendScore} 
              hashtags={trendingHashtags}
              opportunities={trendOpportunities}
            />
          </div>
          
          <div className="mb-6">
            <RecommendationsPanel recommendations={recommendations} />
          </div>

          <div className="mb-6">
            <CompetitorBenchmark 
              insights={contentInsights}
            />
          </div>
          
          <div className="mb-6">
            <Card className="border border-primary/20">
              <CardHeader className="pb-3">
                <CardTitle className="text-primary text-lg flex items-center">
                  <Share2 className="h-5 w-5 text-primary mr-2" />
                  Social Amplification Strategy
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {socialAmplificationStrategies.map((strategy, idx) => (
                    <div key={idx}>
                      <h4 className="text-sm font-medium mb-2">📌 {strategy.title}:</h4>
                      <ul className="space-y-1.5">
                        {strategy.items.map((item, itemIdx) => (
                          <li key={itemIdx} className="flex items-start gap-2 text-sm">
                            <span className="text-primary text-xs mt-1">🔹</span>
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                      {idx < socialAmplificationStrategies.length - 1 && <Separator className="my-3" />}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card className="border border-green-200 bg-green-50/50">
              <CardHeader className="pb-3">
                <CardTitle className="text-green-700 text-lg flex items-center">
                  <Trophy className="h-5 w-5 text-green-600 mr-2" />
                  Final Optimized Video Changes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {finalOptimizations.map((optimization, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="h-6 w-6 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-green-700 text-xs font-bold">{idx + 1}</span>
                      </div>
                      <p className="text-gray-700">{optimization}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
