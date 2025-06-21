import { Link, useLocation } from "react-router-dom";
import { Button } from "../../components/ui/button";

const links = [
  { path: "/dashboard", label: "Overview" },
  {path: "/", label: "Home"},
  { path: "/dashboard/members", label: "Members" },
  { path: "/dashboard/reports", label: "Reports" },
  { path: "/dashboard/users", label: "Users" },
];

const DashboardSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 min-h-screen bg-muted px-4 py-6 border-r">
      <nav className="flex flex-col gap-2">
        {links.map(({ path, label }) => (
          <Button
            key={path}
            variant={location.pathname === path ? "default" : "ghost"}
            className="justify-start"
            asChild
          >
            <Link to={path}>{label}</Link>
          </Button>
        ))}
      </nav>
    </aside>
  );
};

export default DashboardSidebar;
