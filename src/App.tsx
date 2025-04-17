
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AppSidebar } from "@/components/AppSidebar";

function App() {
  return (
    <div className="min-h-screen flex bg-gradient-to-b from-background to-muted/30">
      <AppSidebar />
      
      <div className="flex-1 ml-16 md:ml-16 lg:ml-16 transition-all duration-300">
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
