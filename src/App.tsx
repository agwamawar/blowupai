
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { AppSidebar } from "@/components/AppSidebar";
import { useState, useEffect } from "react";

function App() {
  const [sidebarWidth, setSidebarWidth] = useState("64px");
  
  // Monitor sidebar expansion state
  useEffect(() => {
    const handleResize = () => {
      const sidebar = document.querySelector('[data-sidebar="true"]');
      if (sidebar) {
        const width = window.getComputedStyle(sidebar).width;
        setSidebarWidth(width);
      }
    };
    
    // Initial check
    handleResize();
    
    // Set up mutation observer to detect sidebar width changes
    const observer = new MutationObserver(handleResize);
    const sidebar = document.querySelector('[data-sidebar="true"]');
    if (sidebar) {
      observer.observe(sidebar, { attributes: true });
    }
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex bg-gradient-to-b from-background to-muted/30">
      <AppSidebar />
      
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
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
