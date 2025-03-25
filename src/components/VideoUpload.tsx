import { ChangeEvent, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Upload } from 'lucide-react';

interface VideoUploadProps {
  onVideoSelect: (file: File) => void;
}

export function VideoUpload({ onVideoSelect }: VideoUploadProps) {
  const handleFileChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoSelect(file);
    }
  }, [onVideoSelect]);

  return (
    <div className="flex flex-col items-center gap-4">
      <Input
        type="file"
        accept="video/*"
        onChange={handleFileChange}
        className="hidden"
        id="video-upload"
      />
      <label htmlFor="video-upload">
        <Button variant="outline" className="w-full cursor-pointer" asChild>
          <div>
            <Upload className="h-4 w-4 mr-2" />
            Upload Video
          </div>
        </Button>
      </label>
    </div>
  );
}