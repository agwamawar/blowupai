
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface VideoUploadProps {
  onUpload: (file: File) => void;
}

export function VideoUpload({ onUpload }: VideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile(file);
      setUploadProgress(0);
      
      // Simulate upload progress
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      const url = URL.createObjectURL(file);
      setPreview(url);
      onUpload(file);
    }
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1
  });

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
  };

  return (
    <div className="w-full h-full">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 h-full transition-all duration-300 ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full h-full flex flex-col gap-4">
            <div className="relative w-full" style={{ height: "250px" }}>
              <video
                src={preview}
                className="rounded-lg shadow-lg w-full h-full object-contain bg-black/5"
                controls
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute -right-2 -top-2"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {uploadProgress < 100 && (
              <div className="w-full space-y-2">
                <Progress value={uploadProgress} />
                <p className="text-xs text-center text-muted-foreground">
                  Uploading... {uploadProgress}%
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <div className="text-center">
              <p className="text-sm font-medium">
                Drop your video here or click to upload
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Supports MP4, MOV, and AVI
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
