
import * as React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ResultsPage from "@/pages/ResultsPage";
import AuthPage from "@/pages/Auth";
import TermsAndConditions from "@/pages/TermsAndConditions";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import Info from "@/pages/Info";

function MainApp() {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-b from-background to-muted/30">
        <AppSidebar />
        
        <div className="flex-1 ml-4 flex flex-col">
          {/* Hero Section */}
          <div className="flex justify-center items-center flex-1">
            <div className="container max-w-3xl mx-auto px-4 py-8">
              <div className="mx-auto">
                <Header />
                
                <div className="py-8">
                  <UploadSection />
                </div>

                <div className="mt-4">
                  <p className="text-center text-sm text-muted-foreground">
                    By using BlowUp AI, you agree to our{" "}
                    <Link to="/terms" className="text-primary hover:underline">
                      Terms
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy" className="text-primary hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI for Content Section */}
          <section className="bg-black text-white py-20 px-6 md:px-12">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">AI for Content</h2>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                BlowUp uses AI to instantly surface what your audience wants — then creates viral content tailored to their interests. 
                Whether you're managing Facebook pages, Twitter feeds, or content across platforms, our AI reads the room so you don't have to. 
                Ask anything, and BlowUp turns audience signals into scroll-stopping posts.
              </p>
            </div>
          </section>
        </div>
      </div>
    </SidebarProvider>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/info" element={<Info />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/results" element={<ResultsPage />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
