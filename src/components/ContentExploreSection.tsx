import React from 'react';
import { ExternalLink } from 'lucide-react';

const ContentExploreSection = () => {
  // Mock data for content thumbnails - representing various creator videos
  const contentItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=600&fit=crop",
      title: "Tech Creator's Viral Moment",
      views: "2.4M",
      category: "Tech Review",
      aspectRatio: "tall" // 2:3 ratio
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1494790108755-2616c560c4b0?w=400&h=400&fit=crop",
      title: "Beauty Tutorial Success",
      views: "1.8M",
      category: "Beauty",
      aspectRatio: "square" // 1:1 ratio
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=700&fit=crop",
      title: "Food Content That Went Viral",
      views: "3.2M",
      category: "Food",
      aspectRatio: "tall"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop",
      title: "Fitness Journey Transformation",
      views: "945K",
      category: "Fitness",
      aspectRatio: "medium" // 4:5 ratio
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop",
      title: "Travel Vlog Breakthrough",
      views: "1.5M",
      category: "Travel",
      aspectRatio: "tall"
    },
    {
      id: 6,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
      title: "Comedy Skit Success",
      views: "4.1M",
      category: "Comedy",
      aspectRatio: "square"
    },
    {
      id: 7,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=650&fit=crop",
      title: "Fashion Content Creator",
      views: "2.7M",
      category: "Fashion",
      aspectRatio: "tall"
    },
    {
      id: 8,
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop",
      title: "Music Performance Viral",
      views: "5.3M",
      category: "Music",
      aspectRatio: "medium"
    },
    {
      id: 9,
      image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop",
      title: "Lifestyle Vlog Hit",
      views: "1.2M",
      category: "Lifestyle",
      aspectRatio: "tall"
    },
    {
      id: 10,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
      title: "Business Tips Success",
      views: "890K",
      category: "Business",
      aspectRatio: "square"
    },
    {
      id: 11,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=650&fit=crop",
      title: "Educational Content Viral",
      views: "3.8M",
      category: "Education", 
      aspectRatio: "tall"
    },
    {
      id: 12,
      image: "https://images.unsplash.com/photo-1488161628813-04e9bfaf5e56?w=400&h=500&fit=crop",
      title: "DIY Project Success",
      views: "2.1M",
      category: "DIY",
      aspectRatio: "medium"
    }
  ];

  const getGridRowSpan = (aspectRatio: string) => {
    switch (aspectRatio) {
      case 'square':
        return 'row-span-4';
      case 'medium':
        return 'row-span-5';
      case 'tall':
        return 'row-span-6';
      default:
        return 'row-span-5';
    }
  };

  return (
    <section className="w-full bg-black text-white py-16">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-4xl md:text-5xl font-light text-center mb-4 tracking-tight">
          Explore How Creators Use BlowUp AI
        </h2>
      </div>

      {/* Masonry Grid */}
      <div className="w-full">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 auto-rows-[60px] gap-0">
          {contentItems.map((item) => (
            <div
              key={item.id}
              className={`relative group cursor-pointer overflow-hidden ${getGridRowSpan(item.aspectRatio)} bg-gray-900`}
              style={{
                backgroundImage: `url(${item.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            >
              {/* Image overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
              
              {/* Hover overlay with case study indicator */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                  <ExternalLink className="h-5 w-5 text-black" />
                </div>
              </div>

              {/* Content info overlay (bottom) */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="text-white">
                  <p className="text-xs font-medium truncate mb-1">{item.title}</p>
                  <div className="flex items-center justify-between text-xs text-gray-300">
                    <span>{item.category}</span>
                    <span>{item.views} views</span>
                  </div>
                </div>
              </div>

              {/* Play button indicator (top right) */}
              <div className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center opacity-80">
                <div className="w-0 h-0 border-l-[6px] border-l-white border-t-[3px] border-t-transparent border-b-[3px] border-b-transparent ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContentExploreSection;
