
import { ReactNode, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ActionButtons } from "./ActionButtons";
import { AnalysisDataType } from "@/types/analysisTypes";
import { Menu } from "lucide-react";
import { Button } from "./ui/button";

interface AnalysisDashboardProps {
  activeNavItem: string;
  onNavigate: (item: string) => void;
  children: ReactNode;
  analysisData?: AnalysisDataType;
}

export function AnalysisDashboard({ 
  activeNavItem, 
  onNavigate, 
  children,
  analysisData
}: AnalysisDashboardProps) {
  // Sidebar will always be collapsed on mobile
  const [sidebarCollapsed, setSidebarCollapsed] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  
  // Extract video metadata for the download report
  const videoMetadata = {
    title: analysisData?.video_metadata?.title || "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    platform: analysisData?.video_metadata?.platform
  };

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };
  
  return (
    <div className="flex flex-col md:flex-row h-screen bg-gradient-to-b from-background to-background/95 text-foreground overflow-hidden">
      {/* Mobile Sidebar Toggle */}
      <div className="md:hidden flex items-center p-4 border-b border-gray-200/30">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleMobileSidebar} 
          className="mr-2"
          aria-label="Toggle sidebar"
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold text-primary">
          Dashboard
        </h1>
      </div>
      
      {/* Mobile Sidebar */}
      <div className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-200 ${mobileSidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
           onClick={toggleMobileSidebar}>
        <div className="w-64 h-full bg-white" onClick={e => e.stopPropagation()}>
          <DashboardSidebar 
            activeItem={activeNavItem}
            onNavigate={(item) => {
              onNavigate(item);
              setMobileSidebarOpen(false);
            }}
            collapsed={false}
            setCollapsed={() => {}}
          />
        </div>
      </div>
      
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <DashboardSidebar 
          activeItem={activeNavItem}
          onNavigate={onNavigate}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4 md:p-6">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <h1 className="hidden md:block text-2xl font-bold text-primary">
              Dashboard
            </h1>
            
            <div className="ml-auto">
              <ActionButtons 
                videoMetadata={videoMetadata}
                analysisData={analysisData}
              />
            </div>
          </div>
          
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl border border-white/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
