
import { useState } from "react";
import {
  PlusCircle,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AppSidebar() {
  // Remove the expanded state and toggle function
  return (
    <div 
      className={cn(
        "h-screen fixed top-0 left-0 z-40 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 w-64"
      )}
      data-sidebar="true"
    >
      <div className="flex flex-col h-full p-4">
        {/* Remove the collapse toggle button */}

        <div className="flex items-center mb-8 mt-2">
          {/* Empty div for spacing */}
          <div className="h-8"></div>
        </div>

        {/* New Video Analysis button */}
        <Button 
          variant="outline" 
          className="mb-6 justify-start px-3"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          <span>New Video Analysis</span>
        </Button>

        {/* History section */}
        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">History</h3>
          {/* History items would go here */}
        </div>
      </div>
    </div>
  );
}
