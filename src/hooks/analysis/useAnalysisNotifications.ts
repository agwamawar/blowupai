
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { VideoMetadata } from "@/hooks/useVideoAnalysis";

/**
 * Hook to manage analysis notifications and navigation
 */
export function useAnalysisNotifications() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const showSuccessToast = (videoMetadata: VideoMetadata | null, videoDuration: number) => {
    toast({
      title: "Analysis completed",
      description: `Your ${videoMetadata?.duration.toFixed(1) || videoDuration.toFixed(1)}s video analysis is ready to view.`,
    });
  };

  const showErrorToast = (error: any) => {
    toast({
      title: "Analysis failed",
      description: error instanceof Error ? error.message : "An unexpected error occurred during video processing",
      variant: "destructive",
    });
  };

  const navigateToDashboard = () => {
    setTimeout(() => {
      navigate('/dashboard');
    }, 100);
  };

  return {
    showSuccessToast,
    showErrorToast,
    navigateToDashboard
  };
}
