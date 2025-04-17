
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

  const handleSubmit = () => {
    if (!file) {
      toast({
        title: "No video selected",
        description: "Please upload a video first",
        variant: "destructive",
      });
      return;
    }

    // Generate mock analysis data
    const mockAnalysisData = {
      engagement_score: 87,
      virality_score: 78,
      video_metadata: {
        title: file.name,
        duration: "1:45",
        platform: platformName
      },
      content_analysis: {
        main_themes: ["Engagement", "Entertainment", "Education"],
        objects: ["Person", "Product", "Background"],
        scene_transitions: "Smooth",
        text_detected: ["Title", "CTA"]
      },
      engagement_prediction: {
        best_segments: [
          { timestamp: "0:15", reason: "Strong hook with clear value proposition" },
          { timestamp: "0:45", reason: "Visual pattern interrupt with key information" },
          { timestamp: "1:20", reason: "Emotional peak with clear call to action" }
        ]
      },
      trend_analysis: {
        opportunities: [
          "Incorporate trending hashtag #CreatorTips",
          "Use popular audio clip for increased reach",
          "Follow similar editing style to trending videos"
        ]
      },
      trending_hashtags: ["#VideoMarketing", "#ContentCreator", "#GrowthHacks"],
      video_url: URL.createObjectURL(file)
    };

    // Navigate to results page with analysis data
    navigate('/results', { 
      state: { analysisData: mockAnalysisData } 
    });
  };

  // Update to use document event listener for Enter key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && file) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [file]);

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
        onClick={handleSubmit}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
