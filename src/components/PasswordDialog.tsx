
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface PasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPasswordSubmit: (password: string) => void;
  passwordError: boolean;
}

export function PasswordDialog({ 
  open, 
  onOpenChange, 
  onPasswordSubmit, 
  passwordError 
}: PasswordDialogProps) {
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    onPasswordSubmit(password);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[320px] w-[85%] mx-auto">
        <DialogHeader>
          <DialogTitle>Beta Access Required</DialogTitle>
          <DialogDescription>
            This tool is currently in beta. Only approved beta users have access to the analysis features.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? "border-red-500" : ""}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmit();
              }
            }}
          />
          {passwordError && (
            <p className="text-red-500 text-sm">Incorrect password. Beta access only.</p>
          )}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
