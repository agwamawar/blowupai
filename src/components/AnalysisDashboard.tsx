
import { ReactNode, useState } from "react";
import { BarChart2 } from "lucide-react";
import { DashboardSidebar } from "./DashboardSidebar";
import { ActionButtons } from "./ActionButtons";

interface AnalysisDashboardProps {
  activeNavItem: string;
  onNavigate: (item: string) => void;
  children: ReactNode;
}

export function AnalysisDashboard({ 
  activeNavItem, 
  onNavigate, 
  children 
}: AnalysisDashboardProps) {
  // Sidebar will always be collapsed - removed the state and toggle functionality
  const sidebarCollapsed = true;
  
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
            <h1 className="text-2xl font-bold flex items-center">
              <BarChart2 className="mr-2 text-primary" />
              Video Analysis Dashboard
            </h1>
            
            <ActionButtons />
          </div>
          
          <div className="bg-white/30 backdrop-blur-md rounded-2xl p-8 shadow-xl border border-white/20">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
