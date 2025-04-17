
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Bot, Send, Facebook, Instagram, Linkedin, Youtube } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ThumbnailGenerator } from "./video/ThumbnailGenerator";
import { useToast } from "@/hooks/use-toast";
import { useVideoUpload } from "@/hooks/useVideoUpload";

const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: null }, // No TikTok icon in lucide
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
];

export function UploadSection() {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>("Quick Analysis");
  const [selectedPlatform, setSelectedPlatform] = useState<string>("facebook");
  const { toast } = useToast();
  
  // Use the custom hook for video upload handling to avoid glitches
  const {
    file,
    preview,
    uploadProgress,
    isValidating,
    handleDrop,
    removeFile,
  } = useVideoUpload({
    onUpload: (videoFile) => {
      console.log("Video uploaded successfully:", videoFile.name);
    },
    onMetadataExtracted: (metadata) => {
      console.log("Video metadata extracted:", metadata);
    }
  });
  
  // Handler for file input change
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleDrop([e.target.files[0]]);
    }
  };
  
  // Handler for analysis type selection
  const handleAnalysisTypeChange = (value: string) => {
    setSelectedAnalysisType(value);
  };
  
  // Handler for platform selection
  const handlePlatformChange = (value: string) => {
    setSelectedPlatform(value);
  };
  
  // Get current platform
  const currentPlatform = socialPlatforms.find(p => p.id === selectedPlatform) || socialPlatforms[0];
  const PlatformIcon = currentPlatform.icon;
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border border-muted/40 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/30 dark:to-gray-900/30">
            <div className="flex items-center mb-4">
              {/* Left side: thumbnail and file name */}
              {preview && file && (
                <div className="flex items-center mr-4">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 mr-3">
                    <img 
                      src={preview} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover" 
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
            </div>
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-muted/70 rounded-lg h-10 flex items-center justify-center">
              <input 
                type="file" 
                id="video-upload" 
                className="hidden" 
                accept="video/*" 
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload" className="cursor-pointer flex items-center">
                <p className="font-medium">Drag & drop or click to upload</p>
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
          
          {/* Bottom Controls */}
          <div className="p-4 border-t flex items-center justify-between bg-white dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon" className="h-9 w-9">
                <Plus className="h-4 w-4" />
              </Button>
              
              <Select
                value={selectedAnalysisType}
                onValueChange={handleAnalysisTypeChange}
              >
                <SelectTrigger className="w-[180px] flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <SelectValue placeholder="Analysis Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Quick Analysis">Quick Analysis</SelectItem>
                  <SelectItem value="Standard Analysis">Standard Analysis</SelectItem>
                  <SelectItem value="Deep Analysis">Deep Analysis</SelectItem>
                </SelectContent>
              </Select>
              
              <Select
                value={selectedPlatform}
                onValueChange={handlePlatformChange}
              >
                <SelectTrigger className="w-[180px] flex items-center gap-2">
                  {PlatformIcon ? <PlatformIcon className="h-4 w-4" /> : 
                    <img src={`/${selectedPlatform}.svg`} alt={currentPlatform.name} className="h-4 w-4" />
                  }
                  <SelectValue placeholder="Platform" />
                </SelectTrigger>
                <SelectContent>
                  {socialPlatforms.map(platform => (
                    <SelectItem key={platform.id} value={platform.id}>
                      <div className="flex items-center gap-2">
                        {platform.icon ? 
                          <platform.icon className="h-4 w-4" /> : 
                          <img src={`/${platform.id}.svg`} alt={platform.name} className="h-4 w-4" />
                        }
                        <span>{platform.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button size="sm" className="flex items-center gap-2 w-auto">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
