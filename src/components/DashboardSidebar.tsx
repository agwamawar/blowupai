
import { Home, Clock, Upload, Settings, PieChart, BarChart, ChevronRight, ChevronLeft } from "lucide-react";
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
      "h-screen bg-white/30 backdrop-blur-md border-r border-white/20 flex flex-col transition-all duration-300",
      collapsed ? "w-16" : "w-64"
    )}>
      <div className={cn(
        "mb-8 px-2 flex items-center",
        collapsed ? "justify-center py-4" : "py-4"
      )}>
        {!collapsed && (
          <h2 className="text-xl font-bold text-primary flex items-center">
            <BarChart className="mr-2 text-primary" />
            Video Analytics
          </h2>
        )}
        {collapsed && (
          <BarChart className="text-primary w-6 h-6" />
        )}
      </div>
      
      <div className="space-y-1 px-2">
        {menuItems.map((item) => (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:text-primary hover:bg-primary/10",
                  activeItem === item.id && "bg-primary/10 text-primary",
                  collapsed ? "px-2" : ""
                )}
                onClick={() => onNavigate(item.id)}
              >
                <span className={cn("", collapsed ? "mx-auto" : "mr-2")}>{item.icon}</span>
                {!collapsed && item.label}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right">
                {item.label}
              </TooltipContent>
            )}
          </Tooltip>
        ))}
      </div>
      
      <div className="mt-auto">
        <Button 
          variant="ghost" 
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="mx-auto mb-4 mt-4 hover:bg-primary/10"
        >
          {collapsed ? 
            <ChevronRight className="h-5 w-5 text-primary" /> : 
            <ChevronLeft className="h-5 w-5 text-primary" />
          }
        </Button>
      </div>
      
      {!collapsed && (
        <div className="p-4 border-t border-white/20">
          <div className="rounded-lg bg-primary/5 p-4">
            <h3 className="font-medium text-primary mb-2">Pro Tip</h3>
            <p className="text-sm text-gray-600">
              Try adjusting your video's first 3 seconds to maximize viewer retention.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
