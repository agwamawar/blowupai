
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AnalysisResults } from "@/components/AnalysisResults";
import { toast } from "@/components/ui/use-toast";

const Dashboard = () => {
  const [analysisData, setAnalysisData] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Get analysis data from location state if available
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
    } else {
      // If no data is available, redirect to homepage with a message
      toast({
        title: "No analysis data",
        description: "Redirecting to homepage to upload a video.",
        variant: "destructive",
      });
      navigate("/", { replace: true });
    }
  }, [location.state, navigate]);

  if (!analysisData) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <AnalysisResults
      engagementScore={analysisData.engagement_score || 0}
      mockHeatmapData={analysisData.heatmap_data || []}
      analysisData={analysisData}
    />
  );
};

export default Dashboard;
