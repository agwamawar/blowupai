import React from 'react';
import { ExternalLink } from 'lucide-react';

// Import viral social media content images
import viralDanceContent from '@/assets/viral-dance-content.jpg';
import viralCookingHack from '@/assets/viral-cooking-hack.jpg';
import viralComedySkit from '@/assets/viral-comedy-skit.jpg';
import viralMakeupTransform from '@/assets/viral-makeup-transform.jpg';
import viralFitnessChallenge from '@/assets/viral-fitness-challenge.jpg';
import viralTravelContent from '@/assets/viral-travel-content.jpg';
import viralDIYCraft from '@/assets/viral-diy-craft.jpg';
import viralMusicPerformance from '@/assets/viral-music-performance.jpg';
import viralFashionTransition from '@/assets/viral-fashion-transition.jpg';
import viralTechUnbox from '@/assets/viral-tech-unbox.jpg';
import viralEducationalContent from '@/assets/viral-educational-content.jpg';
import viralLifestyleVlog from '@/assets/viral-lifestyle-vlog.jpg';

const ContentExploreSection = () => {
  // Mock data for content thumbnails - representing viral social media videos
  const contentItems = [
    {
      id: 1,
      image: viralTechUnbox,
      title: "Tech Unboxing Goes Viral",
      views: "2.4M",
      category: "Tech Review",
      aspectRatio: "medium" // 4:5 ratio
    },
    {
      id: 2,
      image: viralMakeupTransform,
      title: "Makeup Transformation Trend",
      views: "1.8M",
      category: "Beauty",
      aspectRatio: "medium" // 4:5 ratio
    },
    {
      id: 3,
      image: viralCookingHack,
      title: "Cooking Hack That Broke TikTok",
      views: "3.2M",
      category: "Food",
      aspectRatio: "tall"
    },
    {
      id: 4,
      image: viralFitnessChallenge,
      title: "Fitness Challenge Craze",
      views: "945K",
      category: "Fitness",
      aspectRatio: "tall"
    },
    {
      id: 5,
      image: viralTravelContent,
      title: "Travel Content Phenomenon",
      views: "1.5M",
      category: "Travel",
      aspectRatio: "tall"
    },
    {
      id: 6,
      image: viralComedySkit,
      title: "Comedy Skit Goes Viral",
      views: "4.1M",
      category: "Comedy",
      aspectRatio: "square"
    },
    {
      id: 7,
      image: viralFashionTransition,
      title: "Fashion Transition Trend",
      views: "2.7M",
      category: "Fashion",
      aspectRatio: "square"
    },
    {
      id: 8,
      image: viralMusicPerformance,
      title: "Bedroom Pop Performance",
      views: "5.3M",
      category: "Music",
      aspectRatio: "tall"
    },
    {
      id: 9,
      image: viralLifestyleVlog,
      title: "Morning Routine Viral Hit",
      views: "1.2M",
      category: "Lifestyle",
      aspectRatio: "square"
    },
    {
      id: 10,
      image: viralDanceContent,
      title: "Dance Challenge Explosion",
      views: "6.8M",
      category: "Dance",
      aspectRatio: "tall"
    },
    {
      id: 11,
      image: viralEducationalContent,
      title: "Educational Content Breakthrough",
      views: "3.8M",
      category: "Education", 
      aspectRatio: "tall"
    },
    {
      id: 12,
      image: viralDIYCraft,
      title: "DIY Craft Satisfying Video",
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
