
import { Clock, Monitor, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoMetadataProps {
  title: string;
  duration?: string;
  resolution?: string;
  platform?: string;
  category?: string;
}

export function VideoMetadata({ 
  title, 
  duration,
  resolution,
  platform,
  category = "Entertainment"
}: VideoMetadataProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardContent className="pt-4 sm:pt-6">
        {(duration || resolution || platform || category) && (
          <div className="grid grid-cols-2 gap-3 sm:gap-4 mb-4">
            {duration && (
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-primary/70 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Duration</p>
                  <p className="text-xs sm:text-sm text-gray-800">{duration}</p>
                </div>
              </div>
            )}
            
            {category && (
              <div className="flex items-start gap-2">
                <Layout className="h-4 w-4 text-primary/70 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Category</p>
                  <p className="text-xs sm:text-sm text-gray-800">{category}</p>
                </div>
              </div>
            )}
            
            {resolution && (
              <div className="flex items-start gap-2">
                <Monitor className="h-4 w-4 text-primary/70 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Resolution</p>
                  <p className="text-xs sm:text-sm text-gray-800">{resolution}</p>
                </div>
              </div>
            )}
            
            {platform && (
              <div className="flex items-start gap-2">
                <Layout className="h-4 w-4 text-primary/70 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500">Platform</p>
                  <p className="text-xs sm:text-sm text-gray-800">{platform}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
