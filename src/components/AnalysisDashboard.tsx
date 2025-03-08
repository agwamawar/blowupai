import { ReactNode } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ActionButtons } from "./ActionButtons";
import { AnalysisDataType } from "@/types/analysisTypes";

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
  // Sidebar will always be collapsed
  const sidebarCollapsed = true;
  
  // Extract video metadata for the download report
  const videoMetadata = {
    title: analysisData?.video_metadata?.title || "My Awesome Video",
    duration: analysisData?.video_metadata?.duration || "0:45",
    platform: analysisData?.video_metadata?.platform
  };
  
  return (
    <div className="flex h-screen bg-gradient-to-b from-background to-background/95 text-foreground overflow-hidden">
      <DashboardSidebar 
        activeItem={activeNavItem}
        onNavigate={onNavigate}
        collapsed={sidebarCollapsed}
        setCollapsed={() => {}}
      />
      
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-primary">
              Dashboard
            </h1>
            
            <ActionButtons 
              videoMetadata={videoMetadata}
              analysisData={analysisData}
            />
          </div>
          
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
