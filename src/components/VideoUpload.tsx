
import { useDropzone } from "react-dropzone";
import { useVideoUpload } from "@/hooks/useVideoUpload";
import { DropzoneUI } from "./video/DropzoneUI";
import { VideoPreviewContainer } from "./video/VideoPreviewContainer";

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
  const {
    preview,
    file,
    uploadProgress,
    isValidating,
    actualVideoRef,
    handleDrop,
    removeFile
  } = useVideoUpload({
    onUpload,
    onDurationDetected,
    onMetadataExtracted,
    videoRef
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 1,
    maxSize: 100 * 1024 * 1024
  });

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeFile();
  };

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
          <VideoPreviewContainer
            videoRef={actualVideoRef}
            preview={preview}
            file={file!}
            uploadProgress={uploadProgress}
            onRemove={handleRemoveFile}
          />
        ) : (
          <DropzoneUI 
            isDragActive={isDragActive} 
            isValidating={isValidating}
          />
        )}
      </div>
    </div>
  );
}
