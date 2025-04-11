
import React from "react";
import { Header } from "@/components/Header";
import { Features } from "@/components/Features";
import { UploadSection } from "@/components/UploadSection";
import { SlotCounter } from "@/components/SlotCounter";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-end mb-4">
            <SlotCounter />
          </div>
          
          <Header />
          
          <div className="py-12">
            <Features />
          </div>
          
          <div className="py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Upload Your Video</h2>
            <UploadSection />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;
