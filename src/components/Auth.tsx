import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { auth, db, storage } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";


export function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        navigate('/');
      } else {
        // Handle account creation (not implemented in this example)
        console.log("Account creation not implemented yet.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle authentication errors (e.g., display an error message)
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Card className="w-full max-w-md overflow-hidden border-primary/10 shadow-lg">
        <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4">
          <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-primary-gradient">
            {isLogin ? "Welcome Back" : "Get Started with BlowUp AI"}
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                className="pl-10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                className="pl-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-br from-[#9c5c64] to-black hover:opacity-90 text-white"
          >
            {isLogin ? "Sign In" : "Create Account"} 
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-primary hover:underline text-sm"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin 
                ? "Don't have an account? Sign up" 
                : "Already have an account? Sign in"}
            </button>
          </div>
        </form>

        <div className="px-6 pb-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">OR</span>
            </div>
          </div>

          <div className="mt-6">
            <Button 
              variant="outline" 
              className="w-full border-primary/20 hover:bg-primary/5"
            >
              <User className="mr-2 h-4 w-4" />
              Continue with Google
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}