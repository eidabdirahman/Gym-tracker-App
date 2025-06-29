import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react"; // Icons for menu and cancel

const links = [
  { path: "/dashboard", label: "Overview" },
  { path: "/", label: "Home" },
  { path: "/dashboard/members", label: "Members" },
  { path: "/dashboard/reports", label: "Reports" },
  { path: "/dashboard/users", label: "Users" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu toggle button */}
      <div className="md:hidden p-4">
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-muted border-r px-4 py-6 transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        {/* Cancel button (mobile only) */}
        <div className="flex justify-end md:hidden mb-4">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation links */}
        <nav className="flex flex-col gap-2">
          {links.map(({ path, label }) => (
            <Button
              key={path}
              variant={location.pathname === path ? "default" : "ghost"}
              className="justify-start"
              asChild
              onClick={() => setIsOpen(false)} // Close sidebar on link click (mobile)
            >
              <Link to={path}>{label}</Link>
            </Button>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default DashboardSidebar;
