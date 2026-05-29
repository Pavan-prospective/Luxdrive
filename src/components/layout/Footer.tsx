import Link from "next/link";
import { Mail, Globe, MessageCircle, Share2 } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary/50 border-t border-border py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        {/* Brand & Socials */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">L</span>
            </div>
            <span className="text-xl font-display font-black tracking-tight text-primary">LuxeDrive</span>
          </Link>
          <div className="flex items-center gap-4 text-muted">
            <Link href="#" className="hover:text-accent transition-colors"><Globe className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><MessageCircle className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-accent transition-colors"><Share2 className="w-4 h-4" /></Link>
          </div>
        </div>

        {/* Minimal Links */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-medium text-muted">
          <Link href="/buy-cars" className="hover:text-primary transition-colors">Buy</Link>
          <Link href="/sell-car" className="hover:text-primary transition-colors">Sell</Link>
          <Link href="#" className="hover:text-primary transition-colors">About</Link>
          <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
        </div>

        {/* Contact & Copyright */}
        <div className="flex flex-col items-center md:items-end gap-2 text-xs font-medium text-muted/60">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><Mail className="w-3 h-3" /> concierge@luxedrive.com</span>
          </div>
          <p>© {new Date().getFullYear()} LuxeDrive Automotive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
