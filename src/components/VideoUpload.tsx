import { useCallback, useState, useRef, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { validateVideo, estimateFrameRate } from "@/lib/videoUtils";

interface VideoUploadProps {
  onUpload: (file: File) => void;
  onDurationDetected?: (duration: number) => void;
  onMetadataExtracted?: (metadata: {
    duration: number;
    resolution: string;
    frameRate?: number;
    fileSize: number;
    format: string;
  }) => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export function VideoUpload({ 
  onUpload, 
  onDurationDetected, 
  onMetadataExtracted,
  videoRef 
}: VideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  
  const actualVideoRef = videoRef || internalVideoRef;

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      console.log("File received:", file.name, file.type, file.size);
      
      setIsValidating(true);
      
      const validationResult = await validateVideo(file);
      setIsValidating(false);
      
      if (!validationResult.isValid) {
        toast({
          title: "Invalid video",
          description: validationResult.message,
          variant: "destructive",
        });
        return;
      }
      
      setFile(file);
      
      if (onDurationDetected && validationResult.metadata?.duration) {
        onDurationDetected(validationResult.metadata.duration);
      }
      
      setUploadProgress(0);
      
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 10;
          
          if (newProgress >= 100) {
            clearInterval(interval);
            
            onUpload(file);
            return 100;
          }
          return newProgress;
        });
      }, 100);

      const url = URL.createObjectURL(file);
      setPreview(url);
      
      if (validationResult.metadata) {
        (file as any).metadata = validationResult.metadata;
      }
    }
  }, [onUpload, toast, onDurationDetected]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024
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

  useEffect(() => {
    if (actualVideoRef.current && preview) {
      const videoElement = actualVideoRef.current;
      
      const handleLoadedMetadata = async () => {
        if (!file) return;
        
        const metadata = {
          duration: videoElement.duration,
          resolution: `${videoElement.videoWidth}x${videoElement.videoHeight}`,
          fileSize: file.size,
          format: file.type,
          frameRate: undefined as number | undefined
        };
        
        try {
          const frameRate = await estimateFrameRate(videoElement);
          metadata.frameRate = frameRate;
        } catch (error) {
          console.error("Error estimating frame rate:", error);
        }
        
        (file as any).metadata = metadata;
        
        if (onMetadataExtracted) {
          onMetadataExtracted(metadata);
        }
        
        if (onDurationDetected && metadata.duration) {
          onDurationDetected(metadata.duration);
        }
        
        console.log(`Video loaded with resolution: ${metadata.resolution}, duration: ${metadata.duration}s`);
      };
      
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
      
      return () => {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      };
    }
  }, [preview, file, onDurationDetected, onMetadataExtracted, actualVideoRef]);

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
            {file && (file as any).metadata && uploadProgress >= 100 && (
              <div className="mt-2 text-sm text-gray-600">
                <p><span className="font-medium">Format:</span> {file.type}</p>
                <p><span className="font-medium">Duration:</span> {(file as any).metadata.duration.toFixed(1)}s</p>
                <p><span className="font-medium">Resolution:</span> {(file as any).metadata.resolution}</p>
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
                Supports MP4, MOV, AVI and WebM (1-300 seconds)
              </p>
              {isValidating && (
                <p className="mt-2 text-xs text-primary animate-pulse">
                  Validating video...
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
