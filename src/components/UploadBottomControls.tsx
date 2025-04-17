
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface UploadBottomControlsProps {
  selectedAnalysisType: string;
  handleAnalysisTypeChange: (value: string) => void;
  selectedPlatform: string;
  handlePlatformChange: (value: string) => void;
  platformIcon: React.ComponentType<any> | null;
  platformName: string;
  socialPlatforms: Array<{
    id: string;
    name: string;
    icon: React.ComponentType<any> | null;
  }>;
  onAnalyze?: () => void;
}

export function UploadBottomControls({
  selectedAnalysisType,
  handleAnalysisTypeChange,
  selectedPlatform,
  handlePlatformChange,
  platformIcon,
  platformName,
  socialPlatforms,
  onAnalyze
}: UploadBottomControlsProps) {
  const PlatformIcon = platformIcon;

  return (
    <div className="p-4 border-t flex items-center justify-between bg-white dark:bg-gray-900">
      <div className="flex items-center gap-3">
        <Button variant="outline" size="icon" className="h-9 w-9">
          <Plus className="h-4 w-4" />
        </Button>
        
        <Select
          value={selectedAnalysisType}
          onValueChange={handleAnalysisTypeChange}
        >
          <SelectTrigger className="w-[180px] flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <SelectValue placeholder="Analysis Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Quick Analysis">Quick Analysis</SelectItem>
            <SelectItem value="Standard Analysis">Standard Analysis</SelectItem>
            <SelectItem value="Deep Analysis">Deep Analysis</SelectItem>
          </SelectContent>
        </Select>
        
        <Select
          value={selectedPlatform}
          onValueChange={handlePlatformChange}
        >
          <SelectTrigger className="w-[180px] flex items-center gap-2">
            {PlatformIcon ? <PlatformIcon className="h-4 w-4" /> : 
              <img src={`/${selectedPlatform}.svg`} alt={platformName} className="h-4 w-4" />
            }
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            {socialPlatforms.map(platform => (
              <SelectItem key={platform.id} value={platform.id}>
                <div className="flex items-center gap-2">
                  {platform.icon ? 
                    <platform.icon className="h-4 w-4" /> : 
                    <img src={`/${platform.id}.svg`} alt={platform.name} className="h-4 w-4" />
                  }
                  <span>{platform.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        size="sm" 
        className="flex items-center gap-2 w-auto"
        onClick={onAnalyze}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
