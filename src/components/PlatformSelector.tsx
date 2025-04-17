
import { Check } from "lucide-react";
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
  },
  {
    id: "youtube",
    name: "YouTube",
  },
  {
    id: "instagram",
    name: "Instagram",
  },
  {
    id: "facebook",
    name: "Facebook",
  },
  {
    id: "snapchat",
    name: "Snapchat",
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
            <SelectValue>{selectedPlatform.name}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform.id} value={platform.id}>
                <span>{platform.name}</span>
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
            <span className="text-sm font-medium">{platform.name}</span>
          </button>
        ))}
      </div>
    </>
  );
}
