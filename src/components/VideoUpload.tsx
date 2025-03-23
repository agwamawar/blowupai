import React, { useState, useEffect, useCallback } from 'react';
import { Upload } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";
import { preprocessVideo } from '@/utils/videoPreprocessing';

interface VideoUploadProps {
  onVideoSelected: (file: File) => void;
  isProcessing: boolean;
}

export function VideoUpload({ onVideoSelected, isProcessing }: VideoUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const { toast } = useToast();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = Array.from(e.dataTransfer.files);
    const videoFile = files.find(file => file.type.startsWith('video/'));

    if (videoFile) {
      try {
        const processedVideo = await preprocessVideo(videoFile);
        onVideoSelected(processedVideo);
      } catch (error) {
        toast({
          title: "Error processing video",
          description: "Please try again with a different video file.",
          variant: "destructive",
        });
      }
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a video file.",
        variant: "destructive",
      });
    }
  }, [onVideoSelected, toast]);

  const handleChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      try {
        const processedVideo = await preprocessVideo(e.target.files[0]);
        onVideoSelected(processedVideo);
      } catch (error) {
        toast({
          title: "Error processing video",
          description: "Please try again with a different video file.",
          variant: "destructive",
        });
      }
    }
  }, [onVideoSelected, toast]);

  const onButtonClick = () => {
    inputRef.current?.click();
  };

  return (
    <form
      className={`relative flex justify-center items-center w-full min-h-[300px] max-w-3xl mx-auto 
        border-2 border-dashed rounded-lg transition-all
        ${dragActive ? 'border-primary bg-primary/10' : 'border-gray-300 bg-gray-50'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={onButtonClick}
    >
      <input
        ref={inputRef}
        type="file"
        className="hidden"
        accept="video/*"
        onChange={handleChange}
        disabled={isProcessing}
      />

      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <Upload className="w-10 h-10 mb-3 text-gray-400" />
        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          <span className="font-semibold">Click to upload</span> or drag and drop
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Upload your video to analyze (MP4, MOV, or WebM)
        </p>
      </div>
    </form>
  );
}