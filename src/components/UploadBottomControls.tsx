
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Bot, Send } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

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
  file?: File | null;
}

export function UploadBottomControls({
  selectedAnalysisType,
  handleAnalysisTypeChange,
  selectedPlatform,
  handlePlatformChange,
  platformIcon,
  platformName,
  socialPlatforms,
  file
}: UploadBottomControlsProps) {
  const PlatformIcon = platformIcon;
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendClick = () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    console.log("Navigating to results with file:", file.name);

    // Create mock analysis data for demonstration
    const mockAnalysisData = {
      video_url: URL.createObjectURL(file),
      engagement_score: 78,
      virality_score: 83,
      trend_score: 75,
      content_analysis: {
        main_themes: ["Lifestyle", "Entertainment", "Tutorial"],
        objects: ["Person", "Product", "Room"],
        scene_transitions: "Multiple scenes detected",
        text_detected: ["Sale", "New", "Click now"]
      },
      engagement_prediction: {
        best_segments: [
          { timestamp: "00:05", reason: "Strong hook that captures attention" },
          { timestamp: "00:22", reason: "Interesting revelation that keeps viewers engaged" }
        ]
      },
      trend_analysis: {
        hashtags: ["#tutorial", "#howto", "#tips"],
        opportunities: [
          "Incorporate trending audio #summervibes",
          "Use popular transition effects",
          "Add relevant hashtags like #tutorial and #howto"
        ]
      },
      follower_count: 25000,
      video_metadata: {
        duration: file.size > 0 ? Math.floor(Math.random() * 60) + 30 + "s" : "0s",
        platform: selectedPlatform,
        title: file.name
      }
    };

    // Show success toast first
    toast({
      title: "Analysis complete",
      description: "Your video analysis is ready to explore",
    });

    // Delay navigation slightly to allow toast to show
    setTimeout(() => {
      // Navigate to the results page with the analysis data
      navigate('/results', { state: { analysisData: mockAnalysisData } });
    }, 300);
  };

  // Add keydown event handler for Enter key
  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter') {
        handleSendClick();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [file, selectedPlatform]); // Add dependencies

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
        onClick={handleSendClick}
      >
        <Send className="h-4 w-4" />
        Send
      </Button>
    </div>
  );
}
