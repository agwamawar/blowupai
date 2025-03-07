
import { Home, PieChart, Upload, Settings, User, File } from "lucide-react";
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
    { id: "files", label: "Video Files", icon: <File size={20} /> },
    { id: "analytics", label: "Analytics", icon: <PieChart size={20} /> },
    { id: "upload", label: "Upload New", icon: <Upload size={20} /> },
  ];

  const handleProfile = () => {
    navigate("/auth");
  };

  const handleLogoClick = () => {
    // Navigate back to home page (root)
    navigate("/", { replace: true });
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
              onClick={handleLogoClick}
            >
              <img 
                src="/lovable-uploads/bf61151c-dbf9-4cf5-a035-287f39d770b3.png" 
                alt="BlowUp AI" 
                className="w-auto h-6 object-contain" 
              />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="z-[100]">
            Back to Home
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
      
      {/* Settings at the bottom */}
      <div className="mt-auto px-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-center hover:text-primary hover:bg-white/30 px-2 transition-all mb-2"
              onClick={() => onNavigate("settings")}
            >
              <Settings size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="z-[100]">
            Settings
          </TooltipContent>
        </Tooltip>
      </div>
      
      {/* User profile button at the bottom */}
      <div className="mb-6 px-2">
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className="w-full justify-center hover:text-primary hover:bg-white/30 px-2 transition-all"
              onClick={handleProfile}
            >
              <User size={20} />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right" sideOffset={10} className="z-[100]">
            Profile
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
