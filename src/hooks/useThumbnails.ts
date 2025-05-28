
import { useState, useEffect } from "react";
import { SimilarVideo } from "@/types/comparisonTypes";

export function useThumbnails(similarVideos: SimilarVideo[]) {
  const [thumbnails, setThumbnails] = useState<Record<string, string | null>>({});

  // Return empty thumbnails - no thumbnail functionality
  useEffect(() => {
    const emptyThumbnails: Record<string, string | null> = {};
    similarVideos.forEach(video => {
      emptyThumbnails[video.id] = null;
    });
    
    setThumbnails(emptyThumbnails);
  }, [similarVideos]);

  return thumbnails;
}
