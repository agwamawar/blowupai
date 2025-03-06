import { Home, Clock, Upload, Settings, PieChart, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

export function DashboardSidebar({ 
  activeItem, 
  onNavigate, 
  collapsed,
  setCollapsed 
}: DashboardSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "analytics", label: "Analytics", icon: <PieChart size={20} /> },
    { id: "history", label: "Past Analyses", icon: <Clock size={20} /> },
    { id: "upload", label: "Upload New", icon: <Upload size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className={cn(
      "h-screen bg-white/30 backdrop-blur-md border-r border-white/20 flex flex-col transition-all duration-300 w-16"
    )}>
      <div className="mb-8 px-2 flex items-center justify-center py-4">
        <BarChart className="text-primary w-6 h-6" />
      </div>
      
      <div className="space-y-1 px-2">
        {menuItems.map((item) => (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:text-primary hover:bg-primary/10 px-2",
                  activeItem === item.id && "bg-primary/10 text-primary"
                )}
                onClick={() => onNavigate(item.id)}
              >
                <span className="mx-auto">{item.icon}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
    </div>
  );
}
