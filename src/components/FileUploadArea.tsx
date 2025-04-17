
import React from "react";
import { useToast } from "@/hooks/use-toast";

interface FileUploadAreaProps {
  preview: string | null;
  file: File | null;
  uploadProgress: number;
  isValidating: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function FileUploadArea({
  preview,
  file,
  uploadProgress,
  isValidating,
  handleFileUpload
}: FileUploadAreaProps) {
  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/30 dark:to-gray-900/30">
      {/* Left side: thumbnail and file name */}
      {preview && file && (
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 mr-3 bg-gray-200">
            <img 
              src={preview} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover" 
              onError={(e) => {
                // Fallback if image fails to load
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>
          <div className="truncate max-w-[180px]">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {Math.round(file.size / 1024 / 1024 * 10) / 10} MB
            </p>
          </div>
        </div>
      )}
      
      {/* File Upload Area */}
      <div className="border-2 border-dashed border-muted/70 rounded-lg h-10 flex items-center justify-center">
        <input 
          type="file" 
          id="video-upload" 
          className="hidden" 
          accept="video/*" 
          onChange={handleFileUpload}
        />
        <label htmlFor="video-upload" className="cursor-pointer flex items-center w-full h-full justify-center">
          {!file && (
            <p className="font-medium">Drag & drop or click to upload</p>
          )}
        </label>
      </div>
      
      {/* Display upload progress if uploading */}
      {uploadProgress > 0 && uploadProgress < 100 && (
        <div className="mt-3">
          <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
          <p className="text-xs text-center mt-1 text-muted-foreground">
            {isValidating ? 'Validating video...' : `Uploading: ${uploadProgress}%`}
          </p>
        </div>
      )}
    </div>
  );
}
