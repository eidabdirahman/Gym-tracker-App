import { Facebook, Instagram,  MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-black border-t mt-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-6 text-yellow-700 dark:text-yellow-300 text-sm">
        {/* Top: Links and Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Navigation Links */}
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            
            <Link to="/about" className="hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="hover:underline">
              Contact
            </Link>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/Lionsgatesports"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-yellow-500"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-yellow-500"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://wa.me/252612345678"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="hover:text-yellow-500"
            >
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="text-center border-t border-yellow-300 dark:border-yellow-800 pt-4">
          © {new Date().getFullYear()} Lions Gate Gym. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
