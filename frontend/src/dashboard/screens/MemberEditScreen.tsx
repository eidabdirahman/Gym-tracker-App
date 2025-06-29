import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { ArrowLeft, Loader2 } from "lucide-react";
import { useMemberStore } from "../../store/useMemberStore";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

const MemberEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { member, getMember, updateMember, loading, error } = useMemberStore();

  const [formData, setFormData] = useState<{
    name: string;
    phone?: string;
    address?: string;
    StartedDate: string;
    expiryDate: string;
    gender?: "male" | "female";
    paymentType: string;
    paymentMethod: string;
    Price: number;
  }>({
    name: "",
    phone: "",
    address: "",
    StartedDate: "",
    expiryDate: "",
    gender: undefined,
    paymentType: "",
    paymentMethod: "",
    Price: 0,
  });

  useEffect(() => {
    if (id) getMember(id);
  }, [id, getMember]);

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name || "",
        phone: member.phone || "",
        address: member.address || "",
        StartedDate: member.StartedDate.slice(0, 10),
        expiryDate: member.expiryDate.slice(0, 10),
        gender: member.gender,
        paymentType: member.paymentType || "",
        paymentMethod: member.paymentMethod || "",
        Price: member.Price,
      });
    }
  }, [member]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "Price" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await updateMember(id, formData);
    toast.success("Member updated successfully");
    navigate("/dashboard/members");
  };

  if (loading || !member) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8 space-y-6 bg-white dark:bg-black text-gray-800 dark:text-yellow-100 shadow-lg rounded-md transition-colors">
      <h1 className="text-3xl font-bold text-yellow-700 dark:text-yellow-300">Edit Member</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Name</Label>
            <Input name="name" value={formData.name} onChange={handleChange} required />
          </div>
          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Phone</Label>
            <Input name="phone" value={formData.phone} onChange={handleChange} />
          </div>
          <div className="md:col-span-2">
            <Label className="text-yellow-800 dark:text-yellow-200">Address</Label>
            <Input name="address" value={formData.address} onChange={handleChange} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Start Date</Label>
            <Input type="date" name="StartedDate" value={formData.StartedDate} onChange={handleChange} />
          </div>
          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Expiry Date</Label>
            <Input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} />
          </div>
          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Gender</Label>
            <Select
              value={formData.gender || ""}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, gender: value as "male" | "female" }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Payment Type</Label>
            <Select
              value={formData.paymentType}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, paymentType: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monthly">Monthly</SelectItem>
                <SelectItem value="quarterly">Quarterly</SelectItem>
                <SelectItem value="biannually">Biannually</SelectItem>
                <SelectItem value="yearly">Yearly</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="text-yellow-800 dark:text-yellow-200">Payment Method</Label>
            <Select
              value={formData.paymentMethod}
              onValueChange={(value) =>
                setFormData((prev) => ({ ...prev, paymentMethod: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="ZAAD">ZAAD</SelectItem>
                <SelectItem value="Edahab">Edahab</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="md:col-span-2">
            <Label className="text-yellow-800 dark:text-yellow-200">Price</Label>
            <Input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <Button type="button" variant="ghost" onClick={() => navigate("/dashboard/members")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Update
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MemberEditScreen;
