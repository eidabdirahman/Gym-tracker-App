import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { useUserStore } from "../store/useUserStore";
import ThemeToggle from "./ThemeToggle"; 

const Header = () => {
  const user = useUserStore((state) => state.user);

  return (
    <header className="border-b shadow-sm bg-white dark:bg-gray-900 fixed top-0 w-full z-50">
      <div className="mx-auto max-w-7xl px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-lg font-bold tracking-tight text-black dark:text-white">
          GymTracker
        </Link>

        <div className="flex items-center space-x-4">
          <nav className="space-x-2">
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
          </nav>

          {/* Theme switcher lives here */}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
