
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoFileInfo } from "./VideoFileInfo";

interface VideoPreviewContainerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  preview: string;
  file: File;
  uploadProgress: number;
  onRemove: (e: React.MouseEvent) => void;
}

export function VideoPreviewContainer({
  videoRef,
  preview,
  file,
  uploadProgress,
  onRemove
}: VideoPreviewContainerProps) {
  return (
    <div className="relative w-full max-w-full">
      <div className="relative w-full h-full max-h-[300px]">
        <video
          ref={videoRef}
          src={preview}
          className="rounded-lg shadow-lg w-full h-full object-contain bg-black/5"
          controls
        />
        <Button
          variant="destructive"
          size="icon"
          className="absolute -right-2 -top-2"
          onClick={onRemove}
        >
          <X className="h-4 w-4" />
        </Button>
        {uploadProgress < 100 && (
          <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300">
            <span className="text-white text-2xl font-bold">
              {Math.round(uploadProgress)}%
            </span>
          </div>
        )}
      </div>
      {file && (file as any).metadata && uploadProgress >= 100 && (
        <VideoFileInfo 
          file={file} 
          metadata={(file as any).metadata}
        />
      )}
    </div>
  );
}
