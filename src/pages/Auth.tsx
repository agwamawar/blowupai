
import { Auth } from "@/components/Auth";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Auth />
        </div>
      </div>
      
      {/* Removing the duplicate footer text */}
    </div>
  );
}
