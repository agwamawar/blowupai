
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

function App() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex bg-gradient-to-b from-background to-muted/30 w-full">
        {/* Sidebar */}
        <AppSidebar />
        
        {/* Main content area with fixed position */}
        <div className="flex-1 ml-64"> {/* Fixed width for the expanded sidebar */}
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
    </SidebarProvider>
  );
}

export default App;
