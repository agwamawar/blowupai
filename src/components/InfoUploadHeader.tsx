
import React from "react";

interface InfoUploadHeaderProps {
  preview: string | null;
  file: File | null;
}

export function InfoUploadHeader({ preview, file }: InfoUploadHeaderProps) {
  if (!preview || !file) return null;

  return (
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 mr-4 bg-[#2c2c2c] relative">
        <img 
          src={preview} 
          alt="Video thumbnail" 
          className="w-full h-full object-cover" 
          onError={(e) => {
            (e.target as HTMLImageElement).src = "/placeholder.svg";
          }}
        />
      </div>
      <div className="truncate max-w-[200px]">
        <p className="text-base font-medium truncate text-[#f5f5f5]">{file.name}</p>
        <p className="text-sm text-[#cfcfcf]">
          {Math.round(file.size / 1024 / 1024 * 10) / 10} MB
        </p>
      </div>
    </div>
  );
}
