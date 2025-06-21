import { useEffect } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, Plus ,Loader2 } from "lucide-react";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const UsersListScreen = () => {
  const {
    users,
    fetchUsers,
    deleteUser,
    register,
    loading,
    error,
  } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleCreateUser = async () => {
    try {
      await register({ name: "", email: "", password: "",  });
      toast.success("User created successfully!");
      fetchUsers();
    } catch {
      toast.error("User creation failed");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      toast.success("User deleted");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">User Management</h1>
        <Button onClick={handleCreateUser}>
          <Plus className="w-4 h-4 mr-2" />
          Register User
        </Button>
      </div>

      {loading && (
  <div className="flex justify-center py-6">
    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
  </div>
)}

      {error && <p className="text-red-500">{error}</p>}

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell className="capitalize">{user.role}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/dashboard/users/${user._id}/edit`)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => handleDelete(user._id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default UsersListScreen;
