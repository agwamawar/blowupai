
import { Layout } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface VideoMetadataProps {
  title: string;
  duration?: string;
  resolution?: string;
  uploadTime?: string;
  platform?: string;
  category?: string;
}

export function VideoMetadata({ 
  title, 
  category = "Entertainment"
}: VideoMetadataProps) {
  return (
    <Card className="bg-white/80 backdrop-blur-md border border-white/20 shadow-md">
      <CardContent className="pt-6">
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">Category</span>
            <span className="text-xs px-2 py-1 bg-primary/10 rounded-full text-primary">
              {category}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
