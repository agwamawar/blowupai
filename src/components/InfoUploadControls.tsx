
import React from "react";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface InfoUploadControlsProps {
  selectedPlatform: string;
  handlePlatformChange: (value: string) => void;
  handleSendClick: () => void;
}

const socialPlatforms = [
  { id: "facebook", name: "Facebook" },
  { id: "instagram", name: "Instagram" },
  { id: "tiktok", name: "TikTok" },
  { id: "linkedin", name: "LinkedIn" },
  { id: "youtube", name: "YouTube" },
];

export function InfoUploadControls({
  selectedPlatform,
  handlePlatformChange,
  handleSendClick
}: InfoUploadControlsProps) {
  return (
    <div className="p-4 border-t border-[#2a2a2a] bg-[#121212]/50 flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
        <Select
          value={selectedPlatform}
          onValueChange={handlePlatformChange}
        >
          <SelectTrigger className="w-[180px] bg-[#1a1a1a] border-[#2a2a2a] text-white">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-[#1a1a1a] border-[#2a2a2a]">
            {socialPlatforms.map(platform => (
              <SelectItem key={platform.id} value={platform.id} className="text-white hover:bg-[#2a2a2a]">
                {platform.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        size="sm" 
        className="flex items-center gap-2 bg-transparent border border-white/30 text-white hover:bg-white/10 hover:border-white/50 transition-all duration-300"
        onClick={handleSendClick}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
