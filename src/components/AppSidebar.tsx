
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenuButton
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Plus, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function AppSidebar() {
  const navigate = useNavigate();

  const handleSignUp = () => {
    navigate('/auth');
  };

  return (
    <Sidebar>
      <SidebarHeader className="px-4 py-4">
        <div className="flex items-center space-x-2">
          <img 
            src="/lovable-uploads/44961b06-b5c8-45ac-9c43-aaaef846ff6c.png" 
            alt="BlowUp AI" 
            className="h-8 w-8 object-contain"
          />
          <span className="font-bold text-lg text-[#555555] tracking-tight">BlowUp AI</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenuButton 
              variant="default" 
              className="mb-2 justify-start px-3 w-full"
            >
              <div className="flex items-center justify-center bg-[#9D5C63] rounded-full h-6 w-6 mr-2 transition-transform duration-200 hover:scale-110">
                <Plus className="h-4 w-4 text-white" />
              </div>
              <span className="text-black hover:text-primary">New Video Analysis</span>
            </SidebarMenuButton>
            <p className="text-xs text-muted-foreground ml-4 mb-4">History</p>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <div className="mt-auto p-2">
        <Button 
          variant="outline" 
          className="w-full justify-start hover:text-primary px-4 transition-all"
          onClick={handleSignUp}
        >
          <User size={20} className="text-black hover:text-primary" />
          <span className="ml-2 text-black hover:text-primary">Sign Up</span>
        </Button>
      </div>
    </Sidebar>
  );
}
