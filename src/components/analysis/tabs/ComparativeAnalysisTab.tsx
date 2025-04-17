import { useState, useEffect } from "react";
import { ContentPerformanceCard } from "@/components/comparison/cards/ContentPerformanceCard";
import { MissingElementsCard } from "@/components/comparison/cards/MissingElementsCard";
import { UniqueStrengthsCard } from "@/components/comparison/cards/UniqueStrengthsCard";
import { BenchmarkAnalysisCard } from "@/components/comparison/cards/BenchmarkAnalysisCard";
import { SimilarContentCard } from "@/components/comparison/cards/SimilarContentCard";

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

  // Generate mock thumbnails from video URLs
  useEffect(() => {
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
      <ContentPerformanceCard 
        similarityIndex={{
          conceptMatch: comparativeData.similarityIndex?.conceptMatch || 72,
          executionMatch: comparativeData.similarityIndex?.executionMatch || 65
        }}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MissingElementsCard 
          missingElements={comparativeData.missingElements || [
            "Clear call-to-action",
            "Pattern interrupts every 7-10 seconds",
            "Trending audio implementation"
          ]}
        />
        
        <UniqueStrengthsCard 
          uniqueStrengths={comparativeData.uniqueStrengths || [
            "Original presentation style",
            "Useful informational content",
            "Good production quality"
          ]}
        />
      </div>
      
      <SimilarContentCard 
        videoTitle={videoMetadata.title || "Your Video"}
        filteredVideos={filteredVideos}
        onFilterChange={handleFilterChange}
        onSortChange={handleSortChange}
        thumbnails={thumbnails}
      />
      
      <BenchmarkAnalysisCard contentInsights={contentInsights} />
    </div>
  );
}
