
import { Check, ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const platforms = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: "/tiktok.svg",
    color: "#000000", // TikTok primary black
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "/youtube.svg",
    color: "#000000", // Dark version
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/instagram.svg",
    color: "#000000", // Dark version
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/facebook.svg",
    color: "#000000", // Dark version
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "/snapchat.svg",
    color: "#000000", // Dark version
  },
];

interface PlatformSelectorProps {
  selected: string;
  onSelect: (platform: string) => void;
}

export function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  const selectedPlatform = platforms.find(p => p.id === selected) || platforms[0];

  return (
    <>
      {/* Mobile dropdown version */}
      <div className="sm:hidden w-full">
        <Select value={selected} onValueChange={onSelect}>
          <SelectTrigger className="w-full bg-white/10 border border-input">
            <div className="flex items-center gap-2">
              <div className="h-6 w-6 flex items-center justify-center">
                <img 
                  src={selectedPlatform.icon} 
                  alt={selectedPlatform.name} 
                  className="h-6 w-6 object-contain"
                />
              </div>
              <SelectValue>{selectedPlatform.name}</SelectValue>
            </div>
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 flex items-center justify-center">
                    <img
                      src={platform.icon}
                      alt={platform.name}
                      className="h-5 w-5 object-contain"
                    />
                  </div>
                  <span>{platform.name}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop grid version */}
      <div className="hidden sm:grid grid-cols-5 gap-4">
        {platforms.map((platform) => (
          <button
            key={platform.id}
            onClick={() => onSelect(platform.id)}
            className={`relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-300 ${
              selected === platform.id
                ? "bg-primary text-white"
                : "bg-white/5 hover:bg-white/10"
            }`}
          >
            {selected === platform.id && (
              <div className="absolute right-2 top-2">
                <Check className="h-4 w-4" />
              </div>
            )}
            <div className="h-8 w-8 flex items-center justify-center">
              <img
                src={platform.icon}
                alt={platform.name}
                className="h-8 w-8 object-contain"
                style={{ filter: "none" }}
              />
            </div>
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
