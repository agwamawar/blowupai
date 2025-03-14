
import { Hash } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface TrendingHashtagsProps {
  hashtags: Array<{ tag: string; growth: string; volume: string }>;
}

export function TrendingHashtags({ hashtags }: TrendingHashtagsProps) {
  return (
    <div>
      <h4 className="text-gray-700 mb-2 flex items-center font-medium">
        <Hash className="h-4 w-4 mr-1" /> 
        Hot Hashtags To Use
      </h4>
      <div className="flex flex-wrap gap-2">
        {hashtags.slice(0, 5).map((tag, idx) => (
          <Badge 
            key={idx} 
            variant="outline" 
            className="bg-primary/5 hover:bg-primary/10 border-primary/20 flex items-center gap-1.5 py-1"
          >
            <span className="text-primary">{tag.tag}</span>
            <span className="text-xs bg-primary/10 rounded-full px-1.5 py-0.5 text-primary/80">{tag.growth}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
