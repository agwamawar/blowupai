
import { useCallback } from 'react';
import { toast } from "sonner";

export const useVideoClick = () => {
  const handleVideoClick = useCallback((url: string, title: string) => {
    try {
      // Validate URL
      new URL(url);
      
      // Open video in new tab
      const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
      
      if (newWindow) {
        toast.success(`Opening "${title}"`, {
          description: "External video opened in a new tab"
        });
      } else {
        throw new Error("Popup blocked");
      }
    } catch (error) {
      if (error.message === "Popup blocked") {
        toast.error("Popup Blocked", {
          description: "Please allow popups to open videos in a new tab"
        });
      } else {
        toast.error("Invalid Video URL", {
          description: "Could not open the video. Please try again later."
        });
      }
      console.error("Error opening video:", error);
    }
  }, []);

  return handleVideoClick;
};
