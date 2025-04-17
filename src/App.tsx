
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-3xl mx-auto">
          <Header />
          
          <div className="py-12">
            <UploadSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
