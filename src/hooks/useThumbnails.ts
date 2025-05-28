
import { useState, useEffect } from "react";
import { SimilarVideo } from "@/types/comparisonTypes";

export function useThumbnails(similarVideos: SimilarVideo[]) {
  const [thumbnails, setThumbnails] = useState<Record<string, string | null>>({});

  // Generate kid hairstyle thumbnails
  useEffect(() => {
    const kidHairstyleThumbnails: Record<string, string | null> = {
      "1": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=faces",
      "2": "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=300&h=400&fit=crop&crop=faces",
      "3": "https://images.unsplash.com/photo-1519340241574-2cec6aef0c01?w=300&h=400&fit=crop&crop=faces",
      "4": "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=300&h=400&fit=crop&crop=faces",
      "5": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=faces",
      "6": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&h=400&fit=crop&crop=faces",
      "7": "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=300&h=400&fit=crop&crop=faces",
      "8": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=faces",
      "9": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=faces",
      "10": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=faces",
      "11": "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&h=400&fit=crop&crop=faces",
      "12": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop&crop=faces",
      "13": "https://images.unsplash.com/photo-1535295972055-1c762f4483e5?w=300&h=400&fit=crop&crop=faces",
      "14": "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?w=300&h=400&fit=crop&crop=faces",
      "15": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=faces"
    };
    
    setThumbnails(kidHairstyleThumbnails);
  }, [similarVideos]);

  return thumbnails;
}
