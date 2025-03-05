
import { Clock, Calendar, Monitor, Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoMetadataProps {
  title: string;
  duration: string;
  resolution: string;
  uploadTime: string;
  platform?: string;
  category?: string;
}

export function VideoMetadata({ 
  title, 
  duration, 
  resolution, 
  uploadTime,
  platform = "TikTok",
  category = "Entertainment"
}: VideoMetadataProps) {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-start gap-2">
            <Clock className="h-4 w-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-400">Duration</p>
              <p className="text-sm text-white">{duration}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Calendar className="h-4 w-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-400">Uploaded</p>
              <p className="text-sm text-white">{uploadTime}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Monitor className="h-4 w-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-400">Resolution</p>
              <p className="text-sm text-white">{resolution}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2">
            <Layout className="h-4 w-4 text-slate-400 mt-0.5" />
            <div>
              <p className="text-xs text-slate-400">Platform</p>
              <p className="text-sm text-white">{platform}</p>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-700">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400">Category</span>
            <span className="text-xs px-2 py-1 bg-slate-700 rounded-full text-slate-300">
              {category}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
