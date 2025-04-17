
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PlusCircle, User } from "lucide-react";

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/44961b06-b5c8-45ac-9c43-aaaef846ff6c.png" 
            alt="BlowUp AI Logo" 
            className="h-10 w-10 object-contain"
          />
          <span className="font-bold text-lg text-black tracking-tight">BlowUp AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="bg-clip-text text-transparent bg-primary-gradient">Video Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton 
              variant="outline" 
              className="mb-6 justify-start px-3 w-full group"
            >
              <PlusCircle className="h-5 w-5 mr-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-primary-gradient text-primary" />
              <span className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-primary-gradient text-primary">New Video Analysis</span>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-2">
        <Button 
          variant="outline" 
          className="w-full justify-center hover:text-transparent hover:bg-white/30 px-2 transition-all group"
        >
          <User size={20} className="group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-primary-gradient text-primary" />
          <span className="ml-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-primary-gradient text-primary">Sign Up</span>
        </Button>
      </div>
    </Sidebar>
  );
}
