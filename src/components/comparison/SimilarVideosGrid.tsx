
import { useState } from "react";
import { SimilarVideoCard } from "./SimilarVideoCard";

interface SimilarVideo {
  id: string;
  title: string;
  thumbnailUrl: string | null;
  videoUrl: string;
  platform: "TikTok" | "Instagram" | "YouTube" | string;
  stats: {
    views: string;
    likes: string;
    shares?: string;
  };
  similarityReason: string;
  similarityScore: number;
}

interface SimilarVideosGridProps {
  videos: SimilarVideo[];
}

export function SimilarVideosGrid({ videos }: SimilarVideosGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {videos.map((video) => (
        <SimilarVideoCard
          key={video.id}
          title={video.title}
          thumbnailUrl={video.thumbnailUrl}
          videoUrl={video.videoUrl}
          platform={video.platform}
          stats={video.stats}
          similarityReason={video.similarityReason}
        />
      ))}
    </div>
  );
}
