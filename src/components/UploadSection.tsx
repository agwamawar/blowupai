
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Plus, Bot, Send, Youtube, Instagram, TikTok, Facebook } from "lucide-react";
import { PlatformSelector } from "./PlatformSelector";
import { ContentTypeSelector } from "./ContentTypeSelector";

export function UploadSection() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("tiktok");
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["entertainment"]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Handler for file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  
  // Handler for content type selection
  const handleTypeSelect = (types: string[]) => {
    setSelectedTypes(types);
  };
  
  // Handler for platform selection
  const handlePlatformChange = (platform: string) => {
    setSelectedPlatform(platform);
  };
  
  return (
    <div className="w-full">
      <Card className="shadow-lg border border-muted/40 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/30 dark:to-gray-900/30">
            <h2 className="text-xl font-medium mb-4">Upload Your Video</h2>
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-muted/70 rounded-lg p-8 text-center hover:bg-muted/5 transition-colors cursor-pointer">
              <input 
                type="file" 
                id="video-upload" 
                className="hidden" 
                accept="video/*" 
                multiple 
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload" className="cursor-pointer flex flex-col items-center">
                <Upload className="h-10 w-10 text-muted-foreground mb-3" />
                <p className="font-medium">Drag & drop or click to upload</p>
                <p className="text-sm text-muted-foreground mt-1">MP4, WebM, MOV (max. 1GB)</p>
              </label>
            </div>
            
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
              <div className="mt-4 space-y-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center p-2 bg-white dark:bg-black/20 rounded">
                    <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center rounded mr-3">
                      <TikTok className="h-5 w-5 text-purple-600 dark:text-purple-400" />
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
          <div className="p-6 border-t bg-muted/10">
            <div className="space-y-6">
              <div className="flex flex-wrap gap-4">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  <span>Add Slot</span>
                </Button>
                
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Bot className="h-4 w-4" />
                  <span>AI Analysis</span>
                </Button>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Platform</h3>
                <PlatformSelector 
                  selected={selectedPlatform} 
                  onSelect={handlePlatformChange} 
                />
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-3">Content Type</h3>
                <ContentTypeSelector 
                  selected={selectedTypes} 
                  onSelect={handleTypeSelect} 
                />
              </div>
              
              <div className="pt-4 border-t">
                <Button className="w-full justify-between group">
                  <span>Analyze Video</span>
                  <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
