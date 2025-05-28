
import { useState, useEffect } from "react";
import { SimilarVideo } from "@/types/comparisonTypes";

export function useThumbnails(similarVideos: SimilarVideo[]) {
  const [thumbnails, setThumbnails] = useState<Record<string, string | null>>({});

  // Generate barber-themed thumbnails with focus on kids haircuts
  useEffect(() => {
    const barberThumbnailUrls = {
      "1": "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=300&h=500&fit=crop&crop=faces",
      "2": "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=300&h=500&fit=crop&crop=faces", 
      "3": "https://images.unsplash.com/photo-1594736797933-d0f7e3d2c279?w=300&h=500&fit=crop&crop=faces",
      "4": "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=300&h=500&fit=crop&crop=faces",
      "5": "https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=300&h=500&fit=crop&crop=faces",
      "6": "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=300&h=500&fit=crop&crop=faces",
      "7": "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=500&fit=crop&crop=faces",
      "8": "https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?w=300&h=500&fit=crop&crop=faces",
      "9": "https://images.unsplash.com/photo-1612809475729-d0e82c3ba26e?w=300&h=500&fit=crop&crop=faces",
      "10": "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=300&h=500&fit=crop&crop=faces",
      "11": "https://images.unsplash.com/photo-1502823403499-6ccfcf4fb453?w=300&h=500&fit=crop&crop=faces",
      "12": "https://images.unsplash.com/photo-1549419087-6aa4ed8e35fa?w=300&h=500&fit=crop&crop=faces",
      "13": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=500&fit=crop&crop=faces",
      "14": "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=300&h=500&fit=crop&crop=faces",
      "15": "https://images.unsplash.com/photo-1493962853295-0fd70327578a?w=300&h=500&fit=crop&crop=faces",
    };
    
    setThumbnails(barberThumbnailUrls);
  }, [similarVideos]);

  return thumbnails;
}
