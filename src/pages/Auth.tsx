
import { Auth } from "@/components/Auth";

export default function AuthPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/95">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          <Auth />
        </div>
      </div>
    </div>
  );
}
