import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Menu, X } from "lucide-react";

const links = [
  { path: "/dashboard", label: "Overview" },
  { path: "/", label: "Home" },
  { path: "/dashboard/members", label: "Members" },
  // { path: "/dashboard/reports", label: "Reports" },
  { path: "/dashboard/users", label: "Users" },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile menu toggle */}
      <div className="md:hidden p-4">
        <Button variant="ghost" onClick={() => setIsOpen(true)}>
          <Menu className="w-5 h-5" />
        </Button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 px-4 py-6 z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static md:block`}
      >
        {/* Close button (mobile only) */}
        <div className="flex justify-end md:hidden mb-4">
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {links.map(({ path, label }) => {
            const isActive = location.pathname === path;
            return (
              <Button
                key={path}
                variant={isActive ? "default" : "ghost"}
                className={`justify-start text-left ${
                  isActive
                    ? "bg-yellow-500 text-black dark:text-white"
                    : "hover:bg-muted"
                }`}
                asChild
                onClick={() => setIsOpen(false)}
              >
                <Link to={path}>{label}</Link>
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Mobile overlay */}
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
