import React, { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { getVideoUrl } from '@/services/videoAnalysisService';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
  onUrlGenerated: (url: string) => void;
  disabled?: boolean;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({ onVideoSelect, onUrlGenerated, disabled }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      onVideoSelect(file);
      const videoUrl = await getVideoUrl(file);
      onUrlGenerated(videoUrl);
    } catch (error) {
      console.error('Error processing video:', error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="video/*"
        className="hidden"
        disabled={disabled}
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={disabled}
        variant="outline"
        className="w-full max-w-md"
      >
        Select Video
      </Button>
    </div>
  );
};