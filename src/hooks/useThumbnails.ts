
import { useState, useEffect } from "react";
import { SimilarVideo } from "@/types/comparisonTypes";

export function useThumbnails(similarVideos: SimilarVideo[]) {
  const [thumbnails, setThumbnails] = useState<Record<string, string | null>>({});

  // Generate kid-focused barber and haircut thumbnails
  useEffect(() => {
    const barberThumbnailUrls = {
      "1": "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=300&h=500&fit=crop&crop=faces",
      "2": "https://images.unsplash.com/photo-1626176219864-de3f9b2b8352?w=300&h=500&fit=crop&crop=faces", 
      "3": "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=500&fit=crop&crop=faces",
      "4": "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=300&h=500&fit=crop&crop=faces",
      "5": "https://images.unsplash.com/photo-1622287162716-f311baa1a2b8?w=300&h=500&fit=crop&crop=faces",
      "6": "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=300&h=500&fit=crop&crop=faces",
      "7": "https://images.unsplash.com/photo-1493256338651-d82f7acb2b38?w=300&h=500&fit=crop&crop=faces",
      "8": "https://images.unsplash.com/photo-1552058544-f2b08422138a?w=300&h=500&fit=crop&crop=faces",
      "9": "https://images.unsplash.com/photo-1622287162381-fd3c6e3c5eac?w=300&h=500&fit=crop&crop=faces",
      "10": "https://images.unsplash.com/photo-1594736797933-d0f7e3d2c279?w=300&h=500&fit=crop&crop=faces",
      "11": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=500&fit=crop&crop=faces",
      "12": "https://images.unsplash.com/photo-1501286353178-1ec881214838?w=300&h=500&fit=crop&crop=faces",
      "13": "https://images.unsplash.com/photo-1622902046580-2b47f47f5471?w=300&h=500&fit=crop&crop=faces",
      "14": "https://images.unsplash.com/photo-1626176219864-de3f9b2b8352?w=300&h=500&fit=crop&crop=faces",
      "15": "https://images.unsplash.com/photo-1605497788044-5a32c7078486?w=300&h=500&fit=crop&crop=faces",
    };
    
    setThumbnails(barberThumbnailUrls);
  }, [similarVideos]);

  return thumbnails;
}
