
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="bg-background/95 border-t py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="space-y-2">
              <a href="#" className="block text-muted-foreground hover:text-primary">Privacy Policy</a>
              <a href="#" className="block text-muted-foreground hover:text-primary">Terms of Use</a>
              <a href="#" className="block text-muted-foreground hover:text-primary">Help Center</a>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <div className="flex gap-2">
              <Input placeholder="Enter your email" />
              <Button>Subscribe</Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'tiktok', 'youtube'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-muted-foreground hover:text-primary"
                >
                  <img
                    src={`/${platform}.svg`}
                    alt={platform}
                    className="w-6 h-6 opacity-75 hover:opacity-100 transition-opacity"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Add the analysis data text at the bottom of the footer */}
      <div className="text-center pb-4 mt-6">
        <p className="text-xs text-muted-foreground opacity-70">
          Analysis is based on data from current trending data.
        </p>
      </div>
    </footer>
  );
}
