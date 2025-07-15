import React from "react";
import { useToast } from "@/hooks/use-toast";
import { CircleCheck, Loader2, X } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { AnalysisSteps } from "./AnalysisSteps";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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
    <div className="p-4 sm:p-6">
      {preview && file && (
        <>
          <div className="flex items-center mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded overflow-hidden flex-shrink-0 mr-3 bg-gray-200 relative">
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
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{file?.name}</p>
              <p className="text-xs text-muted-foreground">
                {Math.round(file?.size / 1024 / 1024 * 10) / 10} MB
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

      <div className="border-2 border-dashed border-gray-300 rounded-lg h-12 sm:h-14 flex items-center justify-center relative bg-gradient-to-r from-purple-100 via-blue-100 to-purple-100 hover:from-purple-200 hover:via-blue-200 hover:to-purple-200 transition-all duration-200">
        <input 
          type="file" 
          id="video-upload" 
          className="hidden" 
          accept="video/*" 
          onChange={handleFileUpload}
        />
        <label htmlFor="video-upload" className="cursor-pointer flex items-center w-full h-full justify-center px-4">
          {!file && (
            <p className="font-medium text-center text-sm sm:text-base text-black">Let's See Your Content</p>
          )}
        </label>
      </div>
    </div>
  );
}
