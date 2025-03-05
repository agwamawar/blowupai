
import { Home, Clock, Upload, Settings, PieChart, BarChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
}

export function DashboardSidebar({ activeItem, onNavigate }: DashboardSidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <Home size={20} /> },
    { id: "analytics", label: "Analytics", icon: <PieChart size={20} /> },
    { id: "history", label: "Past Analyses", icon: <Clock size={20} /> },
    { id: "upload", label: "Upload New", icon: <Upload size={20} /> },
    { id: "settings", label: "Settings", icon: <Settings size={20} /> },
  ];

  return (
    <div className="h-screen bg-slate-800 w-64 p-4 flex flex-col border-r border-slate-700">
      <div className="mb-8 px-2">
        <h2 className="text-xl font-bold text-white flex items-center">
          <BarChart className="mr-2 text-primary" />
          Video Analytics
        </h2>
      </div>
      
      <div className="space-y-1">
        {menuItems.map((item) => (
          <Button
            key={item.id}
            variant="ghost"
            className={cn(
              "w-full justify-start text-slate-300 hover:text-white hover:bg-slate-700",
              activeItem === item.id && "bg-slate-700 text-white"
            )}
            onClick={() => onNavigate(item.id)}
          >
            <span className="mr-2">{item.icon}</span>
            {item.label}
          </Button>
        ))}
      </div>
      
      <div className="mt-auto pt-4 border-t border-slate-700">
        <div className="rounded-lg bg-slate-700/50 p-4">
          <h3 className="font-medium text-slate-300 mb-2">Pro Tip</h3>
          <p className="text-sm text-slate-400">
            Try adjusting your video's first 3 seconds to maximize viewer retention.
          </p>
        </div>
      </div>
    </div>
  );
}
