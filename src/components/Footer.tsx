
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-4 text-white">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/privacy" className="block text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="block text-gray-400 hover:text-white transition-colors">Terms of Use</Link>
              <Link to="/help" className="block text-gray-400 hover:text-white transition-colors">Help Center</Link>
            </div>
          </div>
          <div className="md:col-span-2">
            <h3 className="font-semibold mb-4 text-white">Newsletter</h3>
            <div className="flex gap-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-gray-900/50 border-gray-700 text-white placeholder:text-gray-400"
              />
              <Button className="bg-[#8d4c55] hover:bg-[#8d4c55]/80">Subscribe</Button>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4 text-white">Follow Us</h3>
            <div className="flex gap-4">
              {['facebook', 'instagram', 'tiktok', 'youtube'].map((platform) => (
                <a
                  key={platform}
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <img
                    src={`/${platform}.svg`}
                    alt={platform}
                    className="w-6 h-6 opacity-75 hover:opacity-100 transition-opacity filter invert"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
