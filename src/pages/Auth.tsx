
import { Auth } from "@/components/Auth";
import { Navbar } from "@/components/Navbar";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <Navbar />
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-md mx-auto">
          <Auth />
        </div>
      </div>
      
      {/* Footer text */}
      <div className="text-center pb-4">
        <p className="text-xs text-muted-foreground opacity-70">
          Analysis is based on data from current trending data.
        </p>
      </div>
    </div>
  );
}
