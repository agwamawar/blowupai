
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
      <SidebarHeader>
        <Button
          variant="ghost"
          className="rounded-full p-2 hover:bg-primary/10 w-full justify-center"
        >
          <img 
            src="/lovable-uploads/bf61151c-dbf9-4cf5-a035-287f39d770b3.png" 
            alt="BlowUp AI" 
            className="w-auto h-8 object-contain" 
          />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Video Analysis</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenuButton 
              variant="outline" 
              className="mb-6 justify-start px-3 w-full"
            >
              <PlusCircle className="h-5 w-5 mr-2" />
              <span>New Video Analysis</span>
            </SidebarMenuButton>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-2">
        <Button 
          variant="outline" 
          className="w-full justify-center hover:text-primary hover:bg-white/30 px-2 transition-all"
        >
          <User size={20} />
          <span className="ml-2">Sign Up</span>
        </Button>
      </div>
    </Sidebar>
  );
}
