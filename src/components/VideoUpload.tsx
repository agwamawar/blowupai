
import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

interface VideoUploadProps {
  onUpload: (file: File) => void;
  onDurationDetected?: (duration: number) => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export function VideoUpload({ onUpload, onDurationDetected, videoRef }: VideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { toast } = useToast();
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  
  // Use either provided ref or internal ref
  const actualVideoRef = videoRef || internalVideoRef;

  const checkVideoDuration = (file: File): Promise<boolean> => {
    return new Promise((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      
      video.onloadedmetadata = () => {
        const duration = video.duration;
        
        // Pass the duration to parent component if callback provided
        if (onDurationDetected) {
          onDurationDetected(duration);
        }
        
        // Add duration to file object for easier access later
        if (file) {
          (file as any).duration = duration;
        }
        
        window.URL.revokeObjectURL(video.src);
        
        if (duration > 60) {
          toast({
            title: "Video too long",
            description: "Please upload a video that is less than 1 minute long.",
            variant: "destructive",
          });
          resolve(false);
        } else if (duration < 1) {
          toast({
            title: "Video too short",
            description: "The video must be at least 1 second long.",
            variant: "destructive",
          });
          resolve(false);
        } else {
          resolve(true);
        }
      };
      
      // Handle errors in video loading
      video.onerror = () => {
        console.error("Error loading video for duration check");
        toast({
          title: "Video format error",
          description: "The video format is not supported. Please try a different video.",
          variant: "destructive",
        });
        resolve(false);
      };
      
      video.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log("File received:", file.name, file.type, file.size);
      
      // Check file format first
      if (!file.type.startsWith('video/')) {
        toast({
          title: "Invalid file type",
          description: "Please upload a video file in MP4, MOV, or AVI format.",
          variant: "destructive",
        });
        return;
      }
      
      const isValidDuration = await checkVideoDuration(file);
      
      if (!isValidDuration) {
        return;
      }
      
      setFile(file);
      
      // Fast upload simulation with just progress percentage
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10; // Faster upload simulation
          
          if (newProgress >= 100) {
            clearInterval(interval);
            
            // Once "upload" is complete, pass the file to parent
            onUpload(file);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  }, [onUpload, toast, onDurationDetected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024 // 100MB max size
  });

  const removeFile = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    if (onDurationDetected) {
      onDurationDetected(0);
    }
  };

  // Update video metadata when it's loaded in the player
  useEffect(() => {
    if (actualVideoRef.current && preview) {
      const videoElement = actualVideoRef.current;
      
      const handleLoadedMetadata = () => {
        if (onDurationDetected && videoElement.duration) {
          onDurationDetected(videoElement.duration);
          // Update file object with duration
          if (file) {
            (file as any).duration = videoElement.duration;
          }
          console.log(`Video loaded with resolution: ${videoElement.videoWidth}x${videoElement.videoHeight}`);
        }
      };
      
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [preview, file, onDurationDetected, actualVideoRef]);

  return (
    <div className="w-full h-full">
      <div
        {...getRootProps()}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 sm:p-6 h-full transition-all duration-300 ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary"
        }`}
      >
        <input {...getInputProps()} />
        {preview ? (
          <div className="relative w-full max-w-full">
            <div className="relative w-full h-full max-h-[300px]">
              <video
                ref={actualVideoRef}
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
                <div className="absolute inset-0 flex flex-col gap-4 items-center justify-center bg-black/50 rounded-lg transition-opacity duration-300">
                  <span className="text-white text-2xl font-bold">
                    {Math.round(uploadProgress)}%
                  </span>
                </div>
              )}
            </div>
            {file && uploadProgress >= 100 && (
              <div className="mt-2 text-sm text-gray-600">
                <p><span className="font-medium">Format:</span> {file.type}</p>
                <p><span className="font-medium">Duration:</span> {(file as any).duration?.toFixed(1)}s</p>
                <p><span className="font-medium">Size:</span> {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
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
                Supports MP4, MOV, and AVI (1-60 seconds)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
