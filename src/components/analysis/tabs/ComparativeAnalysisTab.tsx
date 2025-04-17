
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, AlertTriangle, CheckCircle, BarChart2, Lightbulb, TrendingUp } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { CompetitorBenchmark } from "@/components/CompetitorBenchmark";
import { SimilarVideosGrid } from "@/components/comparison/SimilarVideosGrid";
import { SimilarityExplanation } from "@/components/comparison/SimilarityExplanation";
import { ComparisonFilters } from "@/components/comparison/ComparisonFilters";
import { ContentSimilarityAgent } from "@/services/agents/implementations/ContentSimilarityAgent";
import { ThumbnailGenerator } from "@/components/video/ThumbnailGenerator";
import { toast } from "sonner";

interface ComparativeAnalysisTabProps {
  comparativeData: any;
  followerCount: number;
  videoMetadata: {
    platform: string;
    contentType: string;
    duration: string;
    title?: string;
  };
}

export function ComparativeAnalysisTab({
  comparativeData,
  followerCount,
  videoMetadata
}: ComparativeAnalysisTabProps) {
  const [similarVideos, setSimilarVideos] = useState<any[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPlatformFilter, setCurrentPlatformFilter] = useState("all");
  const [currentSortOption, setCurrentSortOption] = useState("relevance");
  const [thumbnails, setThumbnails] = useState<Record<string, string | null>>({});

  // Generate insights based on follower count
  const contentInsights = [
    {
      label: "Hook Strength",
      value: 75,
      icon: { type: "flame", color: "text-red-500" },
      description: "Opening hook effectiveness",
      benchmarkValue: 85
    },
    {
      label: "Pacing",
      value: 65,
      icon: { type: "zap", color: "text-amber-500" },
      description: "Content flow and rhythm",
      benchmarkValue: 80
    },
    {
      label: "Visual Quality",
      value: 90,
      icon: { type: "image", color: "text-violet-500" },
      description: "Overall visual appearance",
      benchmarkValue: 92
    },
    {
      label: "Audio Quality",
      value: 82,
      icon: { type: "music", color: "text-blue-500" },
      description: "Sound clarity and balance",
      benchmarkValue: 88
    }
  ];

  // Initialize with mock data for similar videos
  useEffect(() => {
    if (comparativeData && comparativeData.similarVideos) {
      setSimilarVideos(comparativeData.similarVideos);
      setFilteredVideos(comparativeData.similarVideos);
    } else {
      // Mock data if no real data is available
      const mockSimilarVideos = [
        {
          id: "1",
          title: "5 Tips for Better TikTok Content",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/video1",
          platform: "TikTok",
          stats: {
            views: "1.2M",
            likes: "85K",
            shares: "12K"
          },
          similarityReason: "Similar hook and narrative structure",
          similarityScore: 92
        },
        {
          id: "2",
          title: "How I Went Viral with My First Video",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/video2",
          platform: "Instagram",
          stats: {
            views: "956K",
            likes: "72K"
          },
          similarityReason: "Similar content style and pacing",
          similarityScore: 88
        },
        {
          id: "3",
          title: "Content Strategy That Works in 2024",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/video3",
          platform: "YouTube",
          stats: {
            views: "2.5M",
            likes: "176K",
            shares: "45K"
          },
          similarityReason: "Similar topic and production quality",
          similarityScore: 85
        },
        {
          id: "4",
          title: "Editing Tricks for Viral Reels",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/video4",
          platform: "Instagram",
          stats: {
            views: "788K",
            likes: "93K"
          },
          similarityReason: "Similar editing style and technique",
          similarityScore: 83
        },
        {
          id: "5",
          title: "How to Create Engaging Short-Form Videos",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/video5",
          platform: "TikTok",
          stats: {
            views: "1.5M",
            likes: "110K",
            shares: "22K"
          },
          similarityReason: "Similar audience targeting and hooks",
          similarityScore: 80
        },
        {
          id: "6",
          title: "Quick Transitions for Better Engagement",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/video6",
          platform: "YouTube",
          stats: {
            views: "650K",
            likes: "48K"
          },
          similarityReason: "Similar transition techniques",
          similarityScore: 78
        }
      ];

      setSimilarVideos(mockSimilarVideos);
      setFilteredVideos(mockSimilarVideos);
    }
  }, [comparativeData]);

  // Handle filter change
  const handleFilterChange = (filter: string) => {
    setCurrentPlatformFilter(filter);
    
    if (filter === "all") {
      setFilteredVideos(sortVideos(similarVideos, currentSortOption));
    } else {
      const filtered = similarVideos.filter(video => video.platform === filter);
      setFilteredVideos(sortVideos(filtered, currentSortOption));
    }
  };

  // Handle sort change
  const handleSortChange = (sort: string) => {
    setCurrentSortOption(sort);
    setFilteredVideos(sortVideos(filteredVideos, sort));
  };

  // Sort videos based on option
  const sortVideos = (videos: any[], sortOption: string) => {
    const videosToSort = [...videos];
    
    switch (sortOption) {
      case "views":
        return videosToSort.sort((a, b) => {
          const aViews = parseInt(a.stats.views.replace(/[^0-9]/g, ""));
          const bViews = parseInt(b.stats.views.replace(/[^0-9]/g, ""));
          return bViews - aViews;
        });
      case "engagement":
        return videosToSort.sort((a, b) => {
          const aLikes = parseInt(a.stats.likes.replace(/[^0-9]/g, ""));
          const bLikes = parseInt(b.stats.likes.replace(/[^0-9]/g, ""));
          return bLikes - aLikes;
        });
      case "relevance":
      default:
        return videosToSort.sort((a, b) => b.similarityScore - a.similarityScore);
    }
  };

  // Handle thumbnail generation - in a real app, this would be server-generated thumbnails
  const handleThumbnailGenerated = (videoId: string, url: string | null) => {
    setThumbnails(prev => ({
      ...prev,
      [videoId]: url
    }));
  };

  // Generate mock thumbnails from video URLs (in a real app, these would be actual thumbnails)
  useEffect(() => {
    // This would be replaced by actual thumbnail generation or fetching from an API
    const mockThumbnailUrls = {
      "1": "https://picsum.photos/seed/vid1/300/500",
      "2": "https://picsum.photos/seed/vid2/300/500",
      "3": "https://picsum.photos/seed/vid3/300/500",
      "4": "https://picsum.photos/seed/vid4/300/500",
      "5": "https://picsum.photos/seed/vid5/300/500",
      "6": "https://picsum.photos/seed/vid6/300/500",
    };
    
    setThumbnails(mockThumbnailUrls);
  }, [similarVideos]);
  
  return (
    <div className="space-y-6">
      {/* Content Performance Match */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            Content Performance Match
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Concept Similarity to Top Content</span>
                  <span className="font-semibold">{comparativeData.similarityIndex?.conceptMatch || 72}%</span>
                </div>
                <Progress 
                  value={comparativeData.similarityIndex?.conceptMatch || 72} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground">
                  How closely your content concept matches top performers in your niche
                </p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Execution Quality Match</span>
                  <span className="font-semibold">{comparativeData.similarityIndex?.executionMatch || 65}%</span>
                </div>
                <Progress 
                  value={comparativeData.similarityIndex?.executionMatch || 65} 
                  className="h-2" 
                />
                <p className="text-xs text-muted-foreground">
                  How your production quality compares to category leaders
                </p>
              </div>
            </div>
            
            <div className="flex flex-col justify-center items-center bg-primary/5 p-4 rounded-lg">
              <div className="text-7xl font-bold text-primary mb-2">
                {Math.round((comparativeData.similarityIndex?.conceptMatch + comparativeData.similarityIndex?.executionMatch) / 2) || 68}%
              </div>
              <div className="text-sm text-center text-muted-foreground">
                Overall similarity to top performing content
              </div>
              <div className="text-xs text-center text-green-600 mt-2">
                {followerCount < 50000 
                  ? "Great start! You're on the right track with industry standards." 
                  : "Your content matches quality benchmarks for your follower size."}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* What's Missing / What's Unique */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              What's Missing
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {(comparativeData.missingElements || [
                "Clear call-to-action",
                "Pattern interrupts every 7-10 seconds",
                "Trending audio implementation"
              ]).map((element, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-red-50 rounded-lg">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0 border border-red-200">
                    <span className="text-sm text-red-500 font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-red-800">{element}</p>
                    <p className="text-xs text-red-600">
                      {i === 0 ? "Top videos get 32% more followers with clear CTAs" : 
                       i === 1 ? "Viewers stay 45% longer with frequent pattern interrupts" :
                       "Trending audio boosts discovery by 83%"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="border border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-primary text-lg flex items-center">
              <CheckCircle className="h-5 w-5 mr-2" />
              What's Unique
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              {(comparativeData.uniqueStrengths || [
                "Original presentation style",
                "Useful informational content",
                "Good production quality"
              ]).map((strength, i) => (
                <div key={i} className="flex items-start gap-2 p-3 bg-green-50 rounded-lg">
                  <div className="mt-0.5 h-5 w-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 border border-green-200">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-800">{strength}</p>
                    <p className="text-xs text-green-600">
                      {i === 0 ? "Your unique style stands out from 87% of similar content" : 
                       i === 1 ? "High-value content increases saves by 52%" :
                       "Professional look builds audience trust and credibility"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Benchmark & Creative Inspiration */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Similar Content Benchmarks
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4">
          {/* Similarity explanation */}
          <SimilarityExplanation 
            userVideoTitle={videoMetadata.title || "Your Video"}
            similarityMethod=" content theme, style, and execution quality"
            matchCount={filteredVideos.length}
          />
          
          {/* Filters for the similar videos */}
          <ComparisonFilters 
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
            totalVideos={filteredVideos.length}
          />
          
          {/* Grid of similar videos */}
          <SimilarVideosGrid 
            videos={filteredVideos.map(video => ({
              ...video,
              thumbnailUrl: thumbnails[video.id] || null
            }))}
          />
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-3">
              Study these top performers to identify patterns and techniques you can incorporate
            </p>
            <Button>
              <Lightbulb className="h-4 w-4 mr-2" />
              Apply Winning Strategies
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Performance Comparison */}
      <Card className="border border-primary/20">
        <CardHeader className="pb-2">
          <CardTitle className="text-primary text-lg flex items-center">
            <BarChart2 className="h-5 w-5 mr-2" />
            Benchmark Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <CompetitorBenchmark insights={contentInsights} />
        </CardContent>
      </Card>
    </div>
  );
}
