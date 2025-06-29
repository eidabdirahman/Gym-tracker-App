import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "../../components/ui/dropdown-menu";
import { LogOut, User as UserIcon } from "lucide-react";
import ThemeToggle from "../../components/ThemeToggle";

const DashboardHeader = () => {
  const logout = useUserStore((state) => state.logout);
  const user = useUserStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <header className="w-full px-4 sm:px-6 py-4 border-b bg-background flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      {/* Title */}
      <h1 className="text-lg sm:text-xl font-semibold whitespace-nowrap">
        Admin Dashboard
      </h1>

      {/* Right-side controls */}
      <div className="flex items-center gap-3 sm:gap-4 flex-wrap sm:flex-nowrap">
        <ThemeToggle />

        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="capitalize max-w-[150px] truncate">
                {user.name}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-sm">
                <div className="truncate">{user.name}</div>
                <div className="text-xs text-muted-foreground truncate">{user.email}</div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                <UserIcon className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
