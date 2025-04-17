
import { useState } from "react";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { UploadSection } from "@/components/UploadSection";

export default function IndexPage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className={`shrink-0 border-r transition-all duration-300 ${
        isSidebarOpen ? "w-64" : "w-0"
      }`}>
        {isSidebarOpen && <AppSidebar />}
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-4">
          <div className="flex items-center justify-between mb-6">
            <Button variant="ghost" size="sm" onClick={toggleSidebar}>
              <ChevronLeft className={`h-5 w-5 transition-transform ${
                isSidebarOpen ? "rotate-0" : "rotate-180"
              }`} />
            </Button>
            <h1 className="text-2xl font-bold">BlowUp AI</h1>
            <div className="w-10"></div> {/* Spacer for balance */}
          </div>
          
          <Separator className="mb-6" />
          
          <div className="max-w-3xl mx-auto py-8">
            <h2 className="text-center text-2xl font-bold mb-6">Analyze Your Video</h2>
            <p className="text-center text-gray-500 mb-8">
              Upload your video and get AI-powered insights to increase your engagement and virality.
            </p>
            <UploadSection />
          </div>
        </div>
      </div>
    </div>
  );
}
