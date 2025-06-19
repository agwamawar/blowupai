
import React from "react";
import { Button } from "@/components/ui/button";
import { Facebook, Instagram, Linkedin, Youtube, Send, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: null },
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
];

interface InfoUploadControlsProps {
  selectedPlatform: string;
  handlePlatformChange: (value: string) => void;
  handleSendClick: () => void;
}

export function InfoUploadControls({ 
  selectedPlatform, 
  handlePlatformChange, 
  handleSendClick 
}: InfoUploadControlsProps) {
  const currentPlatform = socialPlatforms.find(p => p.id === selectedPlatform) || socialPlatforms[0];
  const PlatformIcon = currentPlatform.icon;

  return (
    <div className="p-4 border-t border-[#2a2a2a] flex items-center justify-between bg-[#121212]/70">
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 border-[#2a2a2a] text-[#e0e0e0] hover:bg-[#3a3a3a] bg-[#2c2c2c] hover:text-[#ffffff] transition-all duration-200"
        >
          <Plus className="h-4 w-4" />
        </Button>
        
        <Select
          value={selectedPlatform}
          onValueChange={handlePlatformChange}
        >
          <SelectTrigger className="w-[160px] flex items-center gap-2 border-[#2a2a2a] text-[#e0e0e0] bg-[#2c2c2c] hover:bg-[#3a3a3a] transition-colors h-8 text-sm">
            {PlatformIcon ? <PlatformIcon className="h-4 w-4 text-white" /> : 
              <img src={`/${selectedPlatform}.svg`} alt={currentPlatform.name} className="h-4 w-4 filter brightness-0 invert" />
            }
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent className="bg-[#2c2c2c] border-[#2a2a2a]">
            {socialPlatforms.map(platform => (
              <SelectItem key={platform.id} value={platform.id} className="text-[#e0e0e0] hover:bg-[#3a3a3a] focus:bg-[#3a3a3a]">
                <span>{platform.name}</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <Button 
        size="sm" 
        className="flex items-center gap-2 w-auto bg-gradient-to-r from-[#4f1b8d] to-[#6c2bd9] hover:from-[#5a1f9e] hover:to-[#7a30e8] text-white border-0 hover:shadow-[0px_0px_8px_rgba(79,70,229,0.4)] transition-all duration-300 group h-8 px-3 text-sm"
        onClick={handleSendClick}
      >
        <Send className="h-4 w-4 group-hover:translate-x-0.5 transition-transform duration-200" />
      </Button>
    </div>
  );
}
