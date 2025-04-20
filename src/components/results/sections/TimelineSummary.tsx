
import { useState } from "react";
import { Clock3, GitCommit } from "lucide-react"; // Changed 'Timeline' to more appropriate icons
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TimelinePoint {
  label: string;
  description: string;
  timestamp: string;
}

interface TimelineSummaryProps {
  timelinePoints: TimelinePoint[];
}

export function TimelineSummary({ 
  timelinePoints = [
    { label: "Hook", description: "Surprise mall approach with scissors", timestamp: "0:00" },
    { label: "Tension", description: "Dad's angry reaction, ready to fight", timestamp: "0:03" },
    { label: "Resolution", description: "Explanation calms situation", timestamp: "0:07" },
    { label: "Transition", description: "Mall to barbershop scene change", timestamp: "0:08" },
    { label: "Transformation", description: "Professional haircut sequence", timestamp: "0:16" },
    { label: "Reveal", description: "Before/after comparison with caption", timestamp: "0:23" }
  ]
}: TimelineSummaryProps) {
  const [hoveredPoint, setHoveredPoint] = useState<string | null>(null);

  return (
    <div className="p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/30">
      <div className="flex items-center gap-2 mb-3">
        <GitCommit className="h-4 w-4 text-primary/70" /> {/* Changed icon to GitCommit which is visually similar to timeline */}
        <h3 className="text-sm font-medium text-gray-500">Story Timeline</h3>
      </div>
      
      <div className="flex items-center justify-between gap-2 px-2">
        <TooltipProvider>
          {timelinePoints.map((point, index) => (
            <div key={point.label} className="flex flex-col items-center">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="group relative"
                    onMouseEnter={() => setHoveredPoint(point.label)}
                    onMouseLeave={() => setHoveredPoint(null)}
                  >
                    <div className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      hoveredPoint === point.label 
                        ? "bg-primary scale-125" 
                        : "bg-primary/40"
                    }`} 
                    />
                    {index < timelinePoints.length - 1 && (
                      <div className="absolute top-1.5 left-3 w-[calc(100%+1rem)] h-[1px] bg-primary/20" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <div className="text-xs">
                    <p className="font-medium">{point.label}</p>
                    <p className="text-gray-400">{point.description}</p>
                    <p className="text-primary/70 mt-1">{point.timestamp}</p>
                  </div>
                </TooltipContent>
              </Tooltip>
              <span className="text-xs text-gray-500 mt-2">{point.label}</span>
            </div>
          ))}
        </TooltipProvider>
      </div>
    </div>
  );
}
