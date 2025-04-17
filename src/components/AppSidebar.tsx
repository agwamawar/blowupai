
import {
  PlusCircle,
  History,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
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
        {/* Empty header for spacing */}
        <div className="h-8 mt-2"></div>
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
    </Sidebar>
  );
}
