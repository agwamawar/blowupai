
import { Upload } from "lucide-react";

interface DropzoneUIProps {
  isDragActive: boolean;
  isValidating: boolean;
}

export function DropzoneUI({ isDragActive, isValidating }: DropzoneUIProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="rounded-full bg-primary/10 p-4">
        <Upload className="h-6 w-6 text-primary" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium">
          Drop your video here or click to upload
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supports MP4, MOV, AVI and WebM (1-300 seconds)
        </p>
        {isValidating && (
          <p className="mt-2 text-xs text-primary animate-pulse">
            Validating video...
          </p>
        )}
      </div>
    </div>
  );
}
