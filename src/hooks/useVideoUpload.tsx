
import { useState, useCallback, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { validateVideo, estimateFrameRate } from "@/lib/videoUtils";

interface VideoMetadata {
  duration: number;
  resolution: string;
  frameRate?: number;
  fileSize: number;
  format: string;
}

interface UseVideoUploadProps {
  onUpload: (file: File) => void;
  onDurationDetected?: (duration: number) => void;
  onMetadataExtracted?: (metadata: VideoMetadata) => void;
  videoRef?: React.RefObject<HTMLVideoElement>;
}

export function useVideoUpload({
  onUpload,
  onDurationDetected,
  onMetadataExtracted,
  videoRef: externalVideoRef
}: UseVideoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();
  const internalVideoRef = useRef<HTMLVideoElement>(null);
  
  const actualVideoRef = externalVideoRef || internalVideoRef;

  const handleDrop = useCallback(async (acceptedFiles: File[]) => {
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

  const removeFile = useCallback(() => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setFile(null);
    setPreview(null);
    if (onDurationDetected) {
      onDurationDetected(0);
    }
  }, [preview, onDurationDetected]);

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

  return {
    preview,
    file,
    uploadProgress,
    isValidating,
    actualVideoRef,
    handleDrop,
    removeFile
  };
}
