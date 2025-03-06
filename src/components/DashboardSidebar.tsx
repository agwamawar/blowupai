
import { Home, Clock, Upload, Settings, PieChart, BarChart, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "analytics", label: "Analytics", icon: <PieChart size={20} /> },
    { id: "history", label: "Past Analyses", icon: <Clock size={20} /> },
    { id: "upload", label: "Upload New", icon: <Upload size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  const handleLogin = () => {
    navigate("/auth");
  };

  return (
    <div className={cn(
      "h-screen bg-white/20 backdrop-blur-md border-r border-[#8E9196]/30 flex flex-col transition-all duration-300 w-16 shadow-sm relative z-50"
    )}>
      {/* Logo at the top */}
      <div className="mb-8 px-2 flex items-center justify-center py-6">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="rounded-full p-2 hover:bg-primary/10"
              onClick={() => navigate("/")}
            >
              <BarChart className="text-primary w-6 h-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="z-[100]">
            BlowUp AI
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* Menu items */}
      <div className="space-y-1 px-2 flex-1">
        {menuItems.map((item) => (
          <Tooltip key={item.id} delayDuration={0}>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  "w-full justify-start hover:text-primary hover:bg-white/30 px-2 transition-all",
                  activeItem === item.id && "bg-primary/20 text-primary"
                )}
                onClick={() => onNavigate(item.id)}
              >
                <span className="mx-auto">{item.icon}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" sideOffset={10} className="z-[100]">
              {item.label}
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      
      {/* Login button at the bottom */}
      <div className="mt-auto mb-6 px-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-center hover:text-primary hover:bg-white/30 px-2 transition-all"
              onClick={handleLogin}
            >
              <LogIn size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="z-[100]">
            Login / Sign Up
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
