
import {
  PlusCircle,
  History,
  LogIn
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  return (
    <Sidebar variant="sidebar" collapsible="none" className="w-64">
      <SidebarHeader>
        {/* Logo at the top */}
        <div className="flex justify-center items-center h-24 mt-2">
          <div className="font-bold text-2xl text-primary tracking-tight">
            BlowUp<span className="text-black">AI</span>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          {/* New Video Analysis button */}
          <Button 
            variant="outline" 
            className="mb-6 w-full justify-start px-3"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            <span>New Video Analysis</span>
          </Button>
        </SidebarGroup>
        
        <SidebarGroup>
          <SidebarGroupLabel>History</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* History items would go here */}
              {/* For now this is empty, but would be populated with history items */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 mt-auto">
        {/* Sign Up button at the bottom */}
        <Button 
          variant="default" 
          className="w-full justify-center"
        >
          <LogIn className="h-5 w-5 mr-2" />
          <span>Sign Up</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
