import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";

const Header = () => {
  const user = useUserStore((state) => state.user);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="border-b shadow-sm bg-white dark:bg-gray-900 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/"
          className="text-lg font-bold tracking-tight text-black dark:text-white"
        >
          GymTracker
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-4">
          <Link to="/contact">
            <Button variant="ghost">Contacts</Button>
          </Link>
          <Link to="/about">
            <Button variant="ghost">About Us</Button>
          </Link>
          {user ? (
            <Link to="/dashboard">
              <Button variant="outline">Dashboard</Button>
            </Link>
          ) : (
            <Link to="/signin">
              <Button variant="outline">Login</Button>
            </Link>
          )}
          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-gray-900 border-t">
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              Contacts
            </Button>
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">
              About Us
            </Button>
          </Link>
          {user ? (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Dashboard
              </Button>
            </Link>
          ) : (
            <Link to="/signin" onClick={() => setMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-start">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
