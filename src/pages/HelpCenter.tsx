
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InfoNavbar } from "@/components/InfoNavbar";
import { Footer } from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Search, MessageCircle, Mail, Phone, Users, Book, AlertCircle, Shield } from "lucide-react";
import { HelpCenterSearchBar } from "@/components/help/HelpCenterSearchBar";
import { HelpCenterCategories } from "@/components/help/HelpCenterCategories";
import { HelpCenterFAQ } from "@/components/help/HelpCenterFAQ";
import { HelpCenterContact } from "@/components/help/HelpCenterContact";
import { HelpCenterCommunity } from "@/components/help/HelpCenterCommunity";
import { HelpCenterTutorials } from "@/components/help/HelpCenterTutorials";
import { HelpCenterStatus } from "@/components/help/HelpCenterStatus";
import { HelpCenterPolicies } from "@/components/help/HelpCenterPolicies";

export default function HelpCenter() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-black relative overflow-hidden">
        {/* Navbar */}
        <InfoNavbar />

        {/* Background gradient effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-blue-900/20 via-[#8d4c55]/30 to-transparent opacity-70"></div>
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#8d4c55]/15 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>
        </div>

        {/* Hero Section */}
        <div className="relative z-10 pt-32 pb-16 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-light text-white mb-6 tracking-tight">
              Help Center
            </h1>
            <p className="text-xl text-gray-300 mb-12">
              Find answers to your questions and get the help you need
            </p>

            {/* Search Bar */}
            <HelpCenterSearchBar />
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 px-6 pb-20">
          <div className="max-w-6xl mx-auto space-y-16">
            {/* Categories */}
            <HelpCenterCategories />

            {/* FAQ Section */}
            <HelpCenterFAQ />

            {/* Contact Options */}
            <HelpCenterContact />

            {/* Community Forum */}
            <HelpCenterCommunity />

            {/* Tutorials */}
            <HelpCenterTutorials />

            {/* Status Page */}
            <HelpCenterStatus />

            {/* Policies */}
            <HelpCenterPolicies />
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </TooltipProvider>
  );
}
