
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnalysisResults } from "@/components/AnalysisResults";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Home } from "lucide-react";
import { AnalysisDataType } from "@/types/analysisTypes";

export default function ResultsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [analysisData, setAnalysisData] = useState<AnalysisDataType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    // Handle state passed from navigate()
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
      
      // Show toast when data arrives via navigation
      toast({
        title: "Analysis loaded",
        description: "Your video analysis is ready to explore",
      });
    } else {
      // If no analysis data is provided, redirect to home page
      toast({
        title: "No analysis data",
        description: "Please upload a video to analyze first",
        variant: "destructive",
      });
      navigate("/");
    }
  }, [location.state, toast, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const returnToHome = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`shrink-0 border-r transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-0"
      }`}>
        {isSidebarOpen && <AppSidebar />}
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={toggleSidebar}>
                <ChevronLeft className={`h-5 w-5 transition-transform ${
                  isSidebarOpen ? "rotate-0" : "rotate-180"
                }`} />
              </Button>
              <Button variant="outline" size="sm" onClick={returnToHome} className="flex items-center gap-1">
                <Home className="h-4 w-4" />
                <span>Home</span>
              </Button>
            </div>
            <h1 className="text-2xl font-bold">Video Analysis Results</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
          
          <Separator className="mb-6" />
          
          {analysisData ? (
            <AnalysisResults
              engagementScore={analysisData.engagement_score || 0}
              viralityScore={analysisData.virality_score || 0}
              analysisData={analysisData}
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl text-muted-foreground">
                Loading analysis data...
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
