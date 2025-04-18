
import { Clock, Instagram, Film, Users, Layout } from "lucide-react";

interface KeyMetadataHighlightsProps {
  duration: string;
  platform: string;
  format: string;
  contentType: string;
  targetAudience: string[];
}

export function KeyMetadataHighlights({
  duration = "1:20",
  platform = "Instagram Reels",
  format = "Portrait",
  contentType = "Lifestyle Skit",
  targetAudience = ["Parents", "Comedy Fans"]
}: KeyMetadataHighlightsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 rounded-lg bg-white/50 backdrop-blur-sm border border-gray-200/30">
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 text-primary/70 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Duration</p>
          <p className="text-sm font-medium">{duration}</p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Instagram className="h-4 w-4 text-primary/70 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Platform</p>
          <p className="text-sm font-medium">{platform}</p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Film className="h-4 w-4 text-primary/70 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Format</p>
          <p className="text-sm font-medium">{format}</p>
        </div>
      </div>

      <div className="flex items-start gap-2">
        <Layout className="h-4 w-4 text-primary/70 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Content Type</p>
          <p className="text-sm font-medium">{contentType}</p>
        </div>
      </div>

      <div className="flex items-start gap-2 col-span-2 md:col-span-1">
        <Users className="h-4 w-4 text-primary/70 mt-1" />
        <div>
          <p className="text-xs text-gray-500">Target Audience</p>
          <p className="text-sm font-medium">{targetAudience.join(", ")}</p>
        </div>
      </div>
    </div>
  );
}
