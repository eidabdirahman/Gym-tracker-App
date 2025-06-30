import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-hot-toast";

// UI Components from your library
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

// Icons
import { Loader2, ArrowLeft } from "lucide-react";

const UserEditScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, getUserDetails, updateUser, loading, error } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<"admin" | "superadmin">("admin");

  useEffect(() => {
    if (id) {
      getUserDetails(id);
    }
  }, [id, getUserDetails]);

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setRole(user.role || "admin");
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    try {
      await updateUser({ userId: id, name, email, role });
      toast.success("User updated successfully!");
      navigate("/dashboard/users");
    } catch (err) {
      toast.error("Failed to update user.");
    }
  };

  return (
    <div className="space-y-8 px-4 py-8 bg-white dark:bg-black min-h-screen transition-colors">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
          Edit User
        </h1>
        <Button variant="outline" onClick={() => navigate("/dashboard/users")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Users
        </Button>
      </div>

      {/* Loading State */}
      {loading && !user && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="flex justify-center py-6">
            <p className="text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-md">{error}</p>
        </div>
      )}

      {/* Form */}
      {user && (
        <Card className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>User Details</CardTitle>
              <CardDescription>
                Update the user's information below.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter user's full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter user's email address"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select
                  value={role}
                  onValueChange={(value: "admin" | "superadmin") => setRole(value)}
                >
                  <SelectTrigger id="role">
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="superadmin">Superadmin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={loading} className="bg-yellow-500 text-black hover:bg-yellow-600 font-bold">
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update User"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default UserEditScreen;