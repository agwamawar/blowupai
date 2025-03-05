
import { useCallback, useState, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onUpload: (file: File) => void;
}

export function VideoUpload({ onUpload }: VideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);

  const checkVideoDuration = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        window.URL.revokeObjectURL(video.src);
        const duration = video.duration;
        if (duration > 60) {
          toast({
            title: "Video too long",
            description: "Please upload a video that is less than 1 minute long.",
            variant: "destructive",
          });
          resolve(false);
        } else {
          resolve(true);
        }
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const isValidDuration = await checkVideoDuration(file);
      
      if (!isValidDuration) {
        return;
      }
      
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
  }, [onUpload, toast]);

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
          <div className="relative w-full h-[300px]">
            <div className="relative w-full h-full">
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
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
              {uploadProgress < 100 && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300">
                  <span className="text-white text-2xl font-bold">
                    {uploadProgress}%
                  </span>
                </div>
              )}
            </div>
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
                Supports MP4, MOV, and AVI (max 1 minute)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
