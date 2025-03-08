
import { useEffect, useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isThumbnailReady, setIsThumbnailReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    // Get analysis data from location state if available
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
      
      // If there's no video URL, we can immediately set thumbnail as ready
      if (!location.state.analysisData.video_url) {
        setIsThumbnailReady(true);
        setIsLoading(false);
      }
    } else {
      // If no data is available, redirect to homepage with a message
      toast({
        title: "No analysis data",
        description: "Redirecting to homepage to upload a video.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [location.state, navigate, toast]);
  
  const handleThumbnailReady = useCallback((isReady: boolean) => {
    setIsThumbnailReady(isReady);
    if (isReady) {
      setIsLoading(false);
    }
  }, []);

  if (!analysisData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-4 w-full max-w-4xl">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-[500px] w-full" />
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="space-y-4 w-full max-w-4xl">
          <Skeleton className="h-12 w-full" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Skeleton className="h-[500px] w-full" />
            </div>
            <div className="lg:col-span-2">
              <Skeleton className="h-[200px] w-full mb-4" />
              <Skeleton className="h-[280px] w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <AnalysisResults
      engagementScore={analysisData.engagement_score || 0}
      mockHeatmapData={analysisData.heatmap_data || []}
      analysisData={analysisData}
      onThumbnailReady={handleThumbnailReady}
    />
  );
};

export default Dashboard;
