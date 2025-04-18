import React from "react";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck, Loader2, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnalysisSteps } from "./AnalysisSteps";

interface FileUploadAreaProps {
  preview: string | null;
  file: File | null;
  uploadProgress: number;
  isValidating: boolean;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile?: () => void;
  analysisStarted?: boolean;
  currentStep?: number;
  isComplete?: boolean;
}

export function FileUploadArea({
  preview,
  file,
  uploadProgress,
  isValidating,
  handleFileUpload,
  removeFile,
  analysisStarted = false,
  currentStep = 0,
  isComplete = false
}: FileUploadAreaProps) {
  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (removeFile) {
      removeFile();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/30 dark:to-gray-900/30">
      {preview && file && (
        <>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 mr-3 bg-gray-200 relative">
              <img 
                src={preview} 
                alt="Video thumbnail" 
                className="w-full h-full object-cover" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/placeholder.svg";
                }}
              />
              
              <button
                onClick={handleCancel}
                className="absolute -top-1 -right-1 h-5 w-5 bg-white rounded-full shadow flex items-center justify-center hover:bg-red-100 transition-colors duration-200 border border-gray-200 z-10"
                aria-label="Remove file"
              >
                <X className="h-3 w-3 text-gray-500" />
              </button>
              
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="relative h-6 w-6">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                    <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white">
                      {Math.round(uploadProgress)}%
                    </span>
                  </div>
                </div>
              )}
              
              {uploadProgress === 100 && isValidating && (
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                </div>
              )}
              
              {uploadProgress === 100 && !isValidating && (
                <div className="absolute inset-0 bg-green-500/30 flex items-center justify-center">
                  <CircleCheck className="h-5 w-5 text-white" />
                </div>
              )}
            </div>
            <div className="truncate max-w-[180px]">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round(file.size / 1024 / 1024 * 10) / 10} MB
              </p>
            </div>
          </div>
          
          {analysisStarted && (
            <AnalysisSteps
              currentStep={currentStep}
              isComplete={isComplete}
            />
          )}
        </>
      )}
      
      <div className="border-2 border-dashed border-muted/70 rounded-lg h-10 flex items-center justify-center relative">
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
    </div>
  );
}
