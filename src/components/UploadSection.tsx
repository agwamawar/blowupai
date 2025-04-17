
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Bot, Send } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function UploadSection() {
  const [selectedAnalysisType, setSelectedAnalysisType] = useState<string>("Quick Analysis");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  
  // Handler for file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setUploadedFiles([...uploadedFiles, ...newFiles]);
    }
  };
  
  // Handler for analysis type selection
  const handleAnalysisTypeChange = (value: string) => {
    setSelectedAnalysisType(value);
  };
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow-lg border border-muted/40 overflow-hidden">
        <CardContent className="p-0">
          <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800/30 dark:to-gray-900/30">
            <h2 className="text-xl font-medium mb-4 text-left">Upload Your Video</h2>
            
            {/* File Upload Area */}
            <div className="border-2 border-dashed border-muted/70 rounded-lg p-4 text-left hover:bg-muted/5 transition-colors cursor-pointer h-10 flex items-center">
              <input 
                type="file" 
                id="video-upload" 
                className="hidden" 
                accept="video/*" 
                multiple 
                onChange={handleFileUpload}
              />
              <label htmlFor="video-upload" className="cursor-pointer flex items-center w-full">
                <p className="font-medium">Drag & drop or click to upload</p>
              </label>
            </div>
            
            {/* Uploaded Files List */}
            {uploadedFiles.length > 0 && (
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
