
import { ReactNode } from "react";
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
  return (
    <div className="flex h-screen bg-slate-900 text-white overflow-hidden">
      <DashboardSidebar 
        activeItem={activeNavItem}
        onNavigate={onNavigate}
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
          
          {children}
        </div>
      </div>
    </div>
  );
}
