
import { Check } from "lucide-react";

const platforms = [
  {
    id: "tiktok",
    name: "TikTok",
    icon: "/tiktok.svg",
  },
  {
    id: "youtube",
    name: "YouTube",
    icon: "/youtube.svg",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "/instagram.svg",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/facebook.svg",
  },
  {
    id: "snapchat",
    name: "Snapchat",
    icon: "/snapchat.svg",
  },
];

interface PlatformSelectorProps {
  selected: string;
  onSelect: (platform: string) => void;
}

export function PlatformSelector({ selected, onSelect }: PlatformSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
      {platforms.map((platform) => (
        <button
          key={platform.id}
          onClick={() => onSelect(platform.id)}
          className={`relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-300 ${
            selected === platform.id
              ? platform.id === "facebook" ? "bg-[#1877F2] text-white" 
              : platform.id === "instagram" ? "bg-[#E4405F] text-white"
              : platform.id === "tiktok" ? "bg-black text-white"
              : platform.id === "youtube" ? "bg-[#FF0000] text-white"
              : platform.id === "snapchat" ? "bg-[#FFFC00] text-black"
              : "bg-primary text-white"
              : "bg-white/5 hover:bg-white/10"
          }`}
        >
          {selected === platform.id && (
            <div className="absolute right-2 top-2">
              <Check className="h-4 w-4" />
            </div>
          )}
          <img
            src={platform.icon}
            alt={platform.name}
            className="h-8 w-8 object-contain"
          />
          <span className="text-sm font-medium">{platform.name}</span>
        </button>
      ))}
    </div>
  );
}
