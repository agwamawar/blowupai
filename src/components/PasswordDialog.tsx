
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Enter Beta Access Password</DialogTitle>
          <DialogDescription>
            This tool is currently in private beta. Please enter the password to continue.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <Input 
            type="password" 
            placeholder="Beta password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={passwordError ? "border-red-500" : ""}
          />
          {passwordError && (
            <p className="text-sm text-red-500">
              Incorrect password. Please try again or contact support.
            </p>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} className="w-full sm:w-auto">
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
