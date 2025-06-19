
import React from "react";

interface InfoUploadPromptProps {
  file: File | null;
  handleFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function InfoUploadPrompt({ file, handleFileUpload }: InfoUploadPromptProps) {
  return (
    <div className="rounded-xl h-6 flex items-center justify-center relative">
      <input 
        type="file" 
        id="video-upload-info" 
        className="hidden" 
        accept="video/*" 
        onChange={handleFileUpload}
      />
      <label htmlFor="video-upload-info" className="cursor-pointer flex items-center w-full h-full justify-center">
        {!file && (
          <p className="font-medium text-xl text-[#e5e5e5] group-hover:text-[#f5f5f5] transition-colors">What do you want to know?</p>
        )}
      </label>
    </div>
  );
}
