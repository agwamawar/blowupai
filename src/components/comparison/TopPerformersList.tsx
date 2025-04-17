
import { ExternalLink } from "lucide-react";
import { useVideoClick } from "@/hooks/useVideoClick";

interface TopPerformer {
  title: string;
  technique: string;
  views: string;
  engagement: string;
  videoUrl: string;
}

interface TopPerformersListProps {
  performers: TopPerformer[];
}

export function TopPerformersList({ performers }: TopPerformersListProps) {
  const handleVideoClick = useVideoClick();

  return (
    <div className="space-y-3">
      {performers.map((item, idx) => (
        <div 
          key={idx} 
          className="flex justify-between items-start p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
          onClick={() => handleVideoClick(item.videoUrl, item.title)}
        >
          <div className="space-y-1">
            <h5 className="font-medium text-gray-800 text-sm flex items-center">
              {item.title}
              <ExternalLink className="h-3 w-3 ml-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </h5>
            <p className="text-xs text-gray-600">{item.technique}</p>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-primary">{item.views} views</p>
            <p className="text-xs text-green-600">{item.engagement} engagement</p>
          </div>
        </div>
      ))}
    </div>
  );
}
