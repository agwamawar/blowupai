import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Monitor analysis data changes
  useEffect(() => {
    const processAnalysisData = async () => {
      try {
        if (!analysisData) return;

        // Validate analysis data
        if (!analysisData.analysis_completed || !analysisData.timestamp) {
          throw new Error('Invalid or incomplete analysis data');
        }

        console.log('Dashboard: Analysis data updated:', analysisData);
        
        // Update UI state
        setIsLoading(false);
        
        toast({
          title: "Success",
          description: "Analysis completed successfully",
          variant: "default",
        });
      } catch (error) {
        console.error('Dashboard: Error processing analysis data:', error);
        setIsLoading(false);
        setAnalysisData(null);
        
        toast({
          title: "Error",
          description: error.message || "Failed to process analysis data",
          variant: "destructive",
        });
      }
    };

    processAnalysisData();
  }, [analysisData, toast]);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  useEffect(() => {
    console.log('Dashboard: Location state received:', location.state);
    console.log('Dashboard: Current loading state:', isLoading);
    
    // Check if analysis data is in location state (passed from Index page)
    if (location.state?.analysisData) {
      console.log('Dashboard: Setting analysis data from location state:', location.state.analysisData);
      setAnalysisData(location.state.analysisData);
      setIsLoading(false);
      console.log('Dashboard: Loading state set to false');
      return;
    }

    // Fallback to localStorage if not in location state
    const pendingAnalysis = localStorage.getItem('pendingAnalysis');
    if (!pendingAnalysis) {
      navigate('/');
      return;
    }

    setIsLoading(true);
    
    try {
      // Parse the stored analysis data
      const parsedData = JSON.parse(pendingAnalysis);
      
      // If we have real analysis data, use it
      if (parsedData && Object.keys(parsedData).length > 0) {
        setAnalysisData(parsedData);
        localStorage.removeItem('pendingAnalysis');
        setIsLoading(false);
      } else {
        // Simulate analysis with mock data if no real data exists
        const simulatedAnalysisData = {
          engagement_score: 85,
          virality_score: 92,
          video_metadata: {
            platform: parsedData?.platform || "Unknown",
            duration: "0:45",
            title: parsedData?.fileName || "Your Video"
          },
          conceptAnalysis: { totalScore: 0.85 },
          technicalAnalysis: { qualityScore: 0.92 }
        };
        
        setTimeout(() => {
          setAnalysisData(simulatedAnalysisData);
          localStorage.removeItem('pendingAnalysis');
          setIsLoading(false);
        }, 1500);
      }
    } catch (error) {
      console.error("Error parsing analysis data:", error);
      toast({
        title: "Error loading analysis",
        description: "Could not load your video analysis. Please try again.",
        variant: "destructive",
      });
      navigate('/');
    }
  }, [navigate, location, toast]);

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

  console.log('Dashboard: Rendering with loading state:', isLoading);
  console.log('Dashboard: Analysis data present:', !!analysisData);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div>Loading analysis results...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8">
        <AnalysisResults
          engagementScore={analysisData.engagement_score || 
            (analysisData.conceptAnalysis?.totalScore ? Math.round(analysisData.conceptAnalysis.totalScore * 100) : 75)}
          viralityScore={analysisData.virality_score || 
            (analysisData.conceptAnalysis?.totalScore && analysisData.technicalAnalysis?.qualityScore
              ? Math.round((analysisData.conceptAnalysis.totalScore * 0.7 + analysisData.technicalAnalysis.qualityScore * 0.3) * 100)
              : 75)}
          analysisData={analysisData}
        />
      </div>
    </div>
  );
};

export default Dashboard;
