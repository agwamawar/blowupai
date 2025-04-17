
import React from "react";
import { Header } from "@/components/Header";
import { UploadSection } from "@/components/UploadSection";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "@/pages/Auth";
import IndexPage from "@/pages/Index"; // Updated import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} /> {/* Updated route */}
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
