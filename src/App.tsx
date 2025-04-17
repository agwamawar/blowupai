
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AppSidebar } from "@/components/AppSidebar";

function App() {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-background to-muted/30">
      {/* Fixed position sidebar */}
      <AppSidebar />
      
      {/* Main content area with fixed width and position */}
      <div className="flex-1 ml-16"> {/* Fixed 64px (or 4rem) margin for the collapsed sidebar */}
        <div className="container mx-auto px-4 py-8 flex-1">
          <div className="max-w-3xl mx-auto">
            <Header />
            
            <div className="py-8">
              <UploadSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
