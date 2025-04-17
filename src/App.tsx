
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/Auth";

function MainApp() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-muted/30">
        <AppSidebar />
        
        <div className="flex-1 ml-4 flex justify-center items-center">
          <div className="container max-w-3xl mx-auto px-4 py-8">
            <div className="mx-auto">
              <Header />
              
              <div className="py-8">
                <UploadSection />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer text */}
      <div className="text-center pb-4">
        <p className="text-xs text-muted-foreground opacity-70">
          Analysis is based on data from current trending data.
        </p>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
