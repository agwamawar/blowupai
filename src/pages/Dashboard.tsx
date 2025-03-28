
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnalysisDashboard } from "@/components/AnalysisDashboard";
import { useToast } from "@/hooks/use-toast";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";

export default function Dashboard() {
  const location = useLocation();
  const { toast } = useToast();
  const [analysisData, setAnalysisData] = useState<any>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeNavItem, setActiveNavItem] = useState("overview");

  useEffect(() => {
    // Handle state passed from navigate()
    if (location.state?.analysisData) {
      setAnalysisData(location.state.analysisData);
      
      // Optional: Show toast when data arrives via navigation
      toast({
        title: "Analysis loaded",
        description: "Your video analysis is ready to explore",
      });
    }
  }, [location.state, toast]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleNavigate = (itemId: string) => {
    setActiveNavItem(itemId);
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
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              <ChevronLeft className={`h-5 w-5 transition-transform ${
                isSidebarOpen ? "rotate-0" : "rotate-180"
              }`} />
            </Button>
            <h1 className="text-2xl font-bold">Video Analysis Dashboard</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
          
          <Separator className="mb-6" />
          
          {analysisData ? (
            <AnalysisDashboard 
              analysisData={analysisData} 
              activeNavItem={activeNavItem}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-xl text-muted-foreground">
                No analysis data available. Upload a video to get started.
              </h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
