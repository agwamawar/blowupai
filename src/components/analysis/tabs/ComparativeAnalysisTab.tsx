import { useState, useEffect } from "react";
import { ContentPerformanceCard } from "@/components/comparison/cards/ContentPerformanceCard";
import { MissingElementsCard } from "@/components/comparison/cards/MissingElementsCard";
import { UniqueStrengthsCard } from "@/components/comparison/cards/UniqueStrengthsCard";
import { BenchmarkAnalysisCard } from "@/components/comparison/cards/BenchmarkAnalysisCard";
import { SimilarContentCard } from "@/components/comparison/cards/SimilarContentCard";
import { ComparativeData, VideoMetadata, SimilarVideo } from "@/types/comparisonTypes";

interface ComparativeAnalysisTabProps {
  comparativeData: ComparativeData;
  followerCount: number;
  videoMetadata: VideoMetadata;
}

export function ComparativeAnalysisTab({
  comparativeData,
  followerCount,
  videoMetadata
}: ComparativeAnalysisTabProps) {
  const [similarVideos, setSimilarVideos] = useState<SimilarVideo[]>([]);
  const [filteredVideos, setFilteredVideos] = useState<SimilarVideo[]>([]);
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
          title: "Surprise Mall Haircut Transformation - Dad's Reaction!",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber1",
          platform: "TikTok",
          stats: {
            views: "2.1M",
            likes: "185K",
            shares: "32K"
          },
          similarityReason: "Similar surprise haircut approach and parent reactions",
          similarityScore: 94
        },
        {
          id: "2",
          title: "Little Princess Gets Royal Hair Treatment",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber2",
          platform: "Instagram",
          stats: {
            views: "1.8M",
            likes: "156K"
          },
          similarityReason: "Similar transformation theme and child-focused content",
          similarityScore: 92
        },
        {
          id: "3",
          title: "Cutting Curly Hair: Before & After Magic",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber3",
          platform: "YouTube",
          stats: {
            views: "3.2M",
            likes: "298K",
            shares: "67K"
          },
          similarityReason: "Similar curly hair expertise and transformation reveal",
          similarityScore: 89
        },
        {
          id: "4",
          title: "Professional Barber Saves Bad Haircut",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber4",
          platform: "TikTok",
          stats: {
            views: "1.5M",
            likes: "143K",
            shares: "28K"
          },
          similarityReason: "Similar rescue/transformation narrative",
          similarityScore: 87
        },
        {
          id: "5",
          title: "Kids Haircut Gone Viral - Reaction Compilation",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber5",
          platform: "Instagram",
          stats: {
            views: "2.3M",
            likes: "201K"
          },
          similarityReason: "Similar child haircut content and viral appeal",
          similarityScore: 85
        },
        {
          id: "6",
          title: "Barber Shop Magic: Tangled to Gorgeous",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber6",
          platform: "YouTube",
          stats: {
            views: "1.9M",
            likes: "167K",
            shares: "43K"
          },
          similarityReason: "Similar tangle-to-beautiful transformation theme",
          similarityScore: 83
        },
        {
          id: "7",
          title: "Dad's Emotional Reaction to Daughter's New Hair",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber7",
          platform: "TikTok",
          stats: {
            views: "1.7M",
            likes: "189K",
            shares: "45K"
          },
          similarityReason: "Similar emotional parent-child dynamic",
          similarityScore: 82
        },
        {
          id: "8",
          title: "Professional Hair Detangling Techniques",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber8",
          platform: "Instagram",
          stats: {
            views: "987K",
            likes: "78K"
          },
          similarityReason: "Similar hair care expertise and technique focus",
          similarityScore: 80
        },
        {
          id: "9",
          title: "From Messy to Magnificent: Child Hair Transformation",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber9",
          platform: "YouTube",
          stats: {
            views: "2.8M",
            likes: "234K",
            shares: "56K"
          },
          similarityReason: "Similar before/after transformation reveal",
          similarityScore: 79
        },
        {
          id: "10",
          title: "Barber's Secret to Perfect Princess Hair",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber10",
          platform: "TikTok",
          stats: {
            views: "1.4M",
            likes: "126K",
            shares: "22K"
          },
          similarityReason: "Similar princess theme and styling expertise",
          similarityScore: 78
        },
        {
          id: "11",
          title: "Surprise Salon Visit: Daughter's Dream Come True",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber11",
          platform: "Instagram",
          stats: {
            views: "1.6M",
            likes: "145K"
          },
          similarityReason: "Similar surprise element and emotional payoff",
          similarityScore: 77
        },
        {
          id: "12",
          title: "Master Barber Handles Difficult Hair",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber12",
          platform: "YouTube",
          stats: {
            views: "1.1M",
            likes: "98K",
            shares: "19K"
          },
          similarityReason: "Similar professional expertise and problem-solving",
          similarityScore: 76
        },
        {
          id: "13",
          title: "Emotional Hair Makeover: Parent's Tears of Joy",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber13",
          platform: "TikTok",
          stats: {
            views: "2.0M",
            likes: "178K",
            shares: "38K"
          },
          similarityReason: "Similar emotional impact and parent reactions",
          similarityScore: 75
        },
        {
          id: "14",
          title: "Curly Hair Specialist: Transformation Magic",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber14",
          platform: "Instagram",
          stats: {
            views: "1.3M",
            likes: "112K"
          },
          similarityReason: "Similar specialized hair type expertise",
          similarityScore: 74
        },
        {
          id: "15",
          title: "Before & After: Child's Confidence Boost",
          thumbnailUrl: null,
          videoUrl: "https://www.example.com/barber15",
          platform: "YouTube",
          stats: {
            views: "1.8M",
            likes: "159K",
            shares: "31K"
          },
          similarityReason: "Similar confidence-building transformation narrative",
          similarityScore: 73
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
  const sortVideos = (videos: SimilarVideo[], sortOption: string) => {
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

  // Generate barber-themed thumbnails
  useEffect(() => {
    const barberThumbnailUrls = {
      "1": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=500&fit=crop&crop=faces",
      "2": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=500&fit=crop&crop=faces", 
      "3": "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=500&fit=crop&crop=faces",
      "4": "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=300&h=500&fit=crop&crop=faces",
      "5": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=500&fit=crop&crop=faces",
      "6": "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=300&h=500&fit=crop&crop=faces",
      "7": "https://images.unsplash.com/photo-1626176219864-de3f9b2b8352?w=300&h=500&fit=crop&crop=faces",
      "8": "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=300&h=500&fit=crop&crop=faces",
      "9": "https://images.unsplash.com/photo-1612809475729-d0e82c3ba26e?w=300&h=500&fit=crop&crop=faces",
      "10": "https://images.unsplash.com/photo-1594736797933-d0f7e3d2c279?w=300&h=500&fit=crop&crop=faces",
      "11": "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=500&fit=crop&crop=faces",
      "12": "https://images.unsplash.com/photo-1622287162381-fd3c6e3c5eac?w=300&h=500&fit=crop&crop=faces",
      "13": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=500&fit=crop&crop=faces",
      "14": "https://images.unsplash.com/photo-1549419087-6aa4ed8e35fa?w=300&h=500&fit=crop&crop=faces",
      "15": "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=300&h=500&fit=crop&crop=faces",
    };
    
    setThumbnails(barberThumbnailUrls);
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
    </div>
  );
}
