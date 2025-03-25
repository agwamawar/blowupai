import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('googleAccessToken');
    if (!token) {
      // Store intended action (simplified - ideally use sessionStorage or URL params)
      sessionStorage.setItem('intendedAction', '/dashboard');
      navigate('/auth');
      return;
    }

    // Check for stored action after login
    const intendedAction = sessionStorage.getItem('intendedAction');
    if (intendedAction) {
      sessionStorage.removeItem('intendedAction'); //remove after use

      // Get analysis data from location state if available
      if (location.state?.analysisData) {
        console.log("Analysis data received:", location.state.analysisData);
        setAnalysisData(location.state.analysisData);
        setIsLoading(false);
      } else {
        //Handle case where analysisData is missing after login
        toast({
          title: "No analysis data found.",
          description: "Please try analyzing a video again.",
          variant: "warning",
        });
        navigate("/", { replace: true }); //or perhaps to a video upload page
      }
    } else {
      // No stored action, default to showing dashboard (if authenticated)
      if (location.state?.analysisData) {
        console.log("Analysis data received:", location.state.analysisData);
        setAnalysisData(location.state.analysisData);
        setIsLoading(false);
      } else {
        toast({
          title: "No analysis data",
          description: "Please upload a video to analyze.",
          variant: "info",
        });
        navigate("/", { replace: true });
      }
    }
  }, [location.state, navigate, toast]);


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

  // Calculate a proper engagement score - ensure it's within 0-100 range
  const engagementScore = analysisData.engagement_score 
    ? (analysisData.engagement_score > 100 ? 100 : analysisData.engagement_score) 
    : (analysisData.conceptAnalysis?.totalScore ? Math.round(analysisData.conceptAnalysis.totalScore * 100) : 75);

  // Calculate virality score - a weighted combination of concept and execution scores
  const viralityScore = analysisData.virality_score || 
    (analysisData.conceptAnalysis?.totalScore && analysisData.technicalAnalysis?.qualityScore
      ? Math.round((analysisData.conceptAnalysis.totalScore * 0.7 + analysisData.technicalAnalysis.qualityScore * 0.3) * 100)
      : engagementScore);

  // Process analysis data to ensure correct structure
  const processedAnalysisData = {
    ...analysisData,
    // Ensure video metadata is present
    video_metadata: analysisData.video_metadata || {
      platform: "TikTok",
      duration: "0:45",
      title: "Your Video"
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <AnalysisResults
          engagementScore={engagementScore}
          viralityScore={viralityScore}
          analysisData={processedAnalysisData}
        />
      </div>
    </div>
  );
};

export default Dashboard;