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
    <header className="bg-white dark:bg-black border-b shadow-sm fixed top-0 w-full z-50 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-yellow-500 tracking-tight">
          Lions Gate Gym
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/about">
            <Button variant="ghost" className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
              About Us
            </Button>
          </Link>
          <Link to="/contact">
            <Button variant="ghost" className="text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
              Contacts
            </Button>
          </Link>

          {/* Desktop Login/Dashboard */}
          <div className="relative group">
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
                  Dashboard
                </Button>
              </Link>
            ) : (
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Link to="/signin">
                  <Button className="bg-yellow-400 text-black hover:bg-yellow-300">
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <ThemeToggle />
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X className="w-6 h-6 text-yellow-500" /> : <Menu className="w-6 h-6 text-yellow-500" />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white dark:bg-black border-t group">
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
              About Us
            </Button>
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            <Button variant="ghost" className="w-full justify-start text-yellow-600 dark:text-yellow-400 hover:text-yellow-700 dark:hover:text-yellow-300">
              Contacts
            </Button>
          </Link>

          {/* Mobile Login/Dashboard */}
          {user ? (
            <Link to="/dashboard" onClick={() => setMenuOpen(false)}>
              <Button className="w-full justify-start bg-yellow-400 text-black hover:bg-yellow-300">
                Dashboard
              </Button>
            </Link>
          ) : (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Link to="/signin" onClick={() => setMenuOpen(false)}>
                <Button className="w-full justify-start bg-yellow-400 text-black hover:bg-yellow-300">
                  Login
                </Button>
              </Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
