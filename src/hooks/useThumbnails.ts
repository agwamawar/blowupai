
import { useState, useEffect } from "react";
import { SimilarVideo } from "@/types/comparisonTypes";

export function useThumbnails(similarVideos: SimilarVideo[]) {
  const [thumbnails, setThumbnails] = useState<Record<string, string | null>>({});

  // Generate kid hairstyle thumbnails with more diverse options
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
      "15": "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=300&h=400&fit=crop&crop=faces",
      "16": "https://images.unsplash.com/photo-1586297135537-94bc9ba060aa?w=300&h=400&fit=crop&crop=faces",
      "17": "https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?w=300&h=400&fit=crop&crop=faces",
      "18": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=400&fit=crop&crop=faces",
      "19": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=300&h=400&fit=crop&crop=faces",
      "20": "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300&h=400&fit=crop&crop=faces",
      "21": "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=300&h=400&fit=crop&crop=faces",
      "22": "https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?w=300&h=400&fit=crop&crop=faces",
      "23": "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=300&h=400&fit=crop&crop=faces",
      "24": "https://images.unsplash.com/photo-1604467794349-0b74285de7e7?w=300&h=400&fit=crop&crop=faces",
      "25": "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?w=300&h=400&fit=crop&crop=faces"
    };
    
    setThumbnails(kidHairstyleThumbnails);
  }, [similarVideos]);

  return thumbnails;
}
