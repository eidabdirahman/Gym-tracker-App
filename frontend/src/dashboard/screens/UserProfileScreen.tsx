import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";
import { toast } from "react-hot-toast";
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
import { Loader2, X } from "lucide-react";

const ProfileScreen = () => {
  const navigate = useNavigate();
  const {
    user: currentUser,
    updateProfile,
    loading,
    error,
  } = useUserStore();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || "");
      setEmail(currentUser.email || "");
    }
  }, [currentUser]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await updateProfile({
        name,
        ...(password && { password }),
      });
      toast.success("Profile updated successfully!");
      setPassword("");
      setConfirmPassword("");
      navigate("/dashboard"); // ✅ Redirect after successful update
    } catch {
      toast.error("Failed to update profile.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div className="space-y-10 px-4 py-12 bg-white dark:bg-black min-h-screen transition-colors">
      <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-300 text-center">
        My Profile
      </h1>

      {loading && !currentUser && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
        </div>
      )}

      {error && (
        <div className="flex justify-center py-6">
          <p className="text-red-500 bg-red-100 dark:bg-red-900/20 p-4 rounded-md">
            {error}
          </p>
        </div>
      )}

      {currentUser && (
        <Card className="max-w-xl mx-auto shadow-md">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-xl">Profile Details</CardTitle>
              <CardDescription>
                Update your name or change your password.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="opacity-70 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter new password"
                />
              </div>
            </CardContent>

            <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 pt-6">
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full sm:w-auto"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="w-full sm:w-auto bg-yellow-500 text-black hover:bg-yellow-600 font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update Profile"
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      )}
    </div>
  );
};

export default ProfileScreen;
