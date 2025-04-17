
import { useState } from "react";
import {
  PanelLeft,
  PlusCircle,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  const [expanded, setExpanded] = useState(true);

  const toggleSidebar = () => {
    setExpanded(!expanded);
  };

  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300",
        expanded ? "w-64" : "w-16"
      )}
    >
      <div className="flex flex-col h-full p-4">
        {/* Collapse toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm z-10"
          onClick={toggleSidebar}
        >
          <PanelLeft className="h-3 w-3" />
          <span className="sr-only">Toggle sidebar</span>
        </Button>

        {/* Logo - only show when expanded */}
        {expanded && (
          <div className="flex items-center mb-8 mt-2">
            <img 
              src="/lovable-uploads/900faaa6-34de-4dc6-adbd-8739fc835550.png" 
              alt="BlowUp AI" 
              className="h-8 w-auto" 
            />
          </div>
        )}

        {/* New Video Analysis button */}
        <Button 
          variant="outline" 
          className={cn(
            "mb-6 justify-start",
            expanded ? "px-3" : "px-0 justify-center"
          )}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          {expanded && <span>New Video Analysis</span>}
        </Button>

        {/* History section */}
        <div>
          {expanded && <h3 className="text-sm font-medium text-gray-500 mb-3">History</h3>}
          {!expanded && <History className="h-5 w-5 mx-auto mb-3 text-gray-500" />}
          {/* History items would go here */}
        </div>
      </div>
    </div>
  );
}
