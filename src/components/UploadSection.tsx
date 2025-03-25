import { useState, useCallback } from 'react';
import { VideoUpload } from './VideoUpload';
import { Card } from '@/components/ui/card';

export function UploadSection() {
  const [selectedVideo, setSelectedVideo] = useState<File | null>(null);

  const handleVideoSelect = useCallback((file: File) => {
    setSelectedVideo(file);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md p-6">
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-center">Upload Your Video</h2>
          <VideoUpload onVideoSelect={handleVideoSelect} />
          {selectedVideo && (
            <p className="text-sm text-muted-foreground text-center">
              Selected: {selectedVideo.name}
            </p>
          )}
        </div>
      </Card>
    </div>
  );
}