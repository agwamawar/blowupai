
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

const socialPlatforms = [
  { id: "facebook", name: "Facebook", icon: Facebook },
  { id: "instagram", name: "Instagram", icon: Instagram },
  { id: "tiktok", name: "TikTok", icon: null }, // No TikTok icon in lucide
  { id: "linkedin", name: "LinkedIn", icon: Linkedin },
  { id: "youtube", name: "YouTube", icon: Youtube },
];

export function UploadSection() {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>("Quick Analysis");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [selectedPlatform, setSelectedPlatform] = useState<string>("facebook");
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(null);
  const [videoObjectURL, setVideoObjectURL] = useState<string | null>(null);
  
  // Handler for file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
      
      // Create object URL for the video thumbnail generation
      if (file.type.startsWith('video/')) {
        const objectUrl = URL.createObjectURL(file);
        setVideoObjectURL(objectUrl);
      }
    }
  };
  
  // Handler for thumbnail generation
  const handleThumbnailGenerated = (url: string | null) => {
    setThumbnailUrl(url);
  };
  
  // Clean up object URLs when component unmounts
  React.useEffect(() => {
    return () => {
      if (videoObjectURL) {
        URL.revokeObjectURL(videoObjectURL);
      }
    };
  }, [videoObjectURL]);
  
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
              {thumbnailUrl && uploadedFiles.length > 0 && (
                <div className="flex items-center mr-4">
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 mr-3">
                    <img 
                      src={thumbnailUrl} 
                      alt="Video thumbnail" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <div className="truncate max-w-[180px]">
                    <p className="text-sm font-medium truncate">{uploadedFiles[uploadedFiles.length - 1].name}</p>
                    <p className="text-xs text-muted-foreground">
                      {Math.round(uploadedFiles[uploadedFiles.length - 1].size / 1024 / 1024 * 10) / 10} MB
                    </p>
                  </div>
                </div>
              )}
            </div>
            
            {/* Video object for thumbnail generation */}
            {videoObjectURL && (
              <ThumbnailGenerator
                videoUrl={videoObjectURL}
                onThumbnailGenerated={handleThumbnailGenerated}
              />
            )}
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-muted/70 rounded-lg h-10 flex items-center justify-center">
              <input 
                type="file" 
                id="video-upload" 
                className="hidden" 
                accept="video/*" 
                multiple 
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload" className="cursor-pointer flex items-center">
                <p className="font-medium">Drag & drop or click to upload</p>
              </label>
            </div>
            
            {/* Hide the uploaded files list if we're showing the thumbnail */}
            {uploadedFiles.length > 0 && !thumbnailUrl && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center p-2 bg-white dark:bg-black/20 rounded">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-600 dark:text-purple-400">
                        <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"></rect>
                        <line x1="7" y1="2" x2="7" y2="22"></line>
                        <line x1="17" y1="2" x2="17" y2="22"></line>
                        <line x1="2" y1="12" x2="22" y2="12"></line>
                        <line x1="2" y1="7" x2="7" y2="7"></line>
                        <line x1="2" y1="17" x2="7" y2="17"></line>
                        <line x1="17" y1="17" x2="22" y2="17"></line>
                        <line x1="17" y1="7" x2="22" y2="7"></line>
                      </svg>
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-medium truncate">{file.name}</p>
                      <p className="text-xs text-muted-foreground">{Math.round(file.size / 1024 / 1024 * 10) / 10} MB</p>
                    </div>
                  </div>
                ))}
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
