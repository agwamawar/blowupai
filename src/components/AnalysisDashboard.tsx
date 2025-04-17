import { ReactNode, useState } from "react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ActionButtons } from "./ActionButtons";
import { AnalysisDataType } from "@/types/analysisTypes";
import { cn } from "@/lib/utils";

interface AnalysisDashboardProps {
  children: ReactNode;
  videoMetadata?: any;
  analysisData?: AnalysisDataType;
}

export function AnalysisDashboard({ children, videoMetadata, analysisData }: AnalysisDashboardProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen relative bg-gradient-to-b from-background to-muted/30">
      {/* Fixed position sidebar */}
      <div className="fixed top-0 left-0 h-screen z-50">
        <DashboardSidebar
          activeItem="files"
          onNavigate={() => {}}
          collapsed={sidebarCollapsed}
          setCollapsed={setSidebarCollapsed}
        />
      </div>

      {/* Main content area with dynamic margin */}
      <div 
        className={cn(
          "flex-1 min-h-screen transition-all duration-300 ease-in-out",
          sidebarCollapsed ? "ml-16" : "ml-64"
        )}
      >
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