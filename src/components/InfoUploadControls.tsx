
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
    <div className="p-4 sm:p-6 border-t border-[#2a2a2a] bg-[#121212]/70">
      {/* Mobile layout - stack vertically */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <div className="hidden sm:block">
            <Button 
              variant="outline" 
              size="icon" 
              className="h-10 w-10 border-[#2a2a2a] text-[#e0e0e0] hover:bg-[#3a3a3a] bg-[#2c2c2c] hover:text-[#ffffff] transition-all duration-200"
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
          
          <Select
            value={selectedPlatform}
            onValueChange={handlePlatformChange}
          >
            <SelectTrigger className="w-full sm:w-[180px] md:w-[200px] flex items-center gap-3 border-[#2a2a2a] text-[#e0e0e0] bg-[#2c2c2c] hover:bg-[#3a3a3a] transition-colors h-10">
              {PlatformIcon ? <PlatformIcon className="h-5 w-5 text-white flex-shrink-0" /> : 
                <img src={`/${selectedPlatform}.svg`} alt={currentPlatform.name} className="h-5 w-5 filter brightness-0 invert flex-shrink-0" />
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
          className="flex items-center justify-center gap-3 w-full sm:w-auto bg-gradient-to-r from-[#4f1b8d] to-[#6c2bd9] hover:from-[#5a1f9e] hover:to-[#7a30e8] text-white border-0 hover:shadow-[0px_0px_8px_rgba(79,70,229,0.4)] transition-all duration-300 group h-10 px-4"
          onClick={handleSendClick}
        >
          <Send className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-200" />
          <span className="sm:hidden">Start Analysis</span>
        </Button>
      </div>
    </div>
  );
}
