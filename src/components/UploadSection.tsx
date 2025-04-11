
import { useState } from "react";
import { ContentTypeSelector } from "./ContentTypeSelector";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload } from "lucide-react";

export function UploadSection() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>(["entertainment"]);
  
  // Simplified handler with correct typing
  const handleTypeSelect = (types: string[]) => {
    setSelectedTypes(types);
  };
  
  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium mb-2">Content Type</h3>
            <ContentTypeSelector 
              selected={selectedTypes} 
              onSelect={handleTypeSelect} 
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center pt-4">
            <div className="text-sm text-muted-foreground">
              Select a video to analyze its viral potential
            </div>
            
            <Button className="w-full sm:w-auto">
              <Upload className="h-4 w-4 mr-2" />
              Upload Video
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
