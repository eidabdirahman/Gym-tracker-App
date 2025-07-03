import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Pencil, Trash2, Plus, Loader2, Upload } from "lucide-react";
import * as XLSX from "xlsx";
import { useMemberStore } from "../../store/useMemberStore";
import type { Member } from "../../store/useMemberStore";
import { Button } from "../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const MemberListScreen = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    members,
    fetchMembers,
    deleteMember,
    addMember,
    importMembers,
    loading,
    error,
  } = useMemberStore();

  useEffect(() => {
    fetchMembers();
  }, [fetchMembers]);

  const handleAdd = async () => {
    try {
      await addMember({});
      toast.success("Sample member added");
    } catch {
      toast.error("Failed to add member");
    }
  };

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const parsedData = XLSX.utils.sheet_to_json(sheet) as any[];

        const fixedData: Partial<Member>[] = parsedData.map((row) => ({
          name: row.name,
          gender: row.gender,
          phone: row.phone?.toString?.(),
          address: row.address,
          StartedDate:
            typeof row.start === "number"
              ? XLSX.SSF.format("yyyy-mm-dd", row.start)
              : row.start,
          expiryDate:
            typeof row.expires === "number"
              ? XLSX.SSF.format("yyyy-mm-dd", row.expires)
              : row.expires,
          paymentType: row.paymentType,
          paymentMethod: row.paymentMethod,
          Price: Number(row.Price) || 0,
        }));

        await importMembers(fixedData);
        toast.success("Members imported from Excel!");
      };
      reader.readAsArrayBuffer(file);
    } catch (error) {
      console.error("Excel import error:", error);
      toast.error("Failed to import Excel");
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure?")) {
      await deleteMember(id);
      toast.success("Member deleted");
    }
  };

  return (
    <div className="space-y-8 px-4 py-8 bg-white dark:bg-black min-h-screen transition-colors">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <h1 className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">
          Member List
        </h1>

        <div className="flex flex-col sm:flex-row gap-6">
          {/* ➕ Add Member */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Quick Add</span>
            <Button onClick={handleAdd} className="w-fit">
              <Plus className="w-4 h-4 mr-2" />
              Add Sample Member
            </Button>
          </div>

          {/* 📥 Import Excel */}
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-medium text-muted-foreground">Bulk Import</span>
            <div className="relative w-fit">
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleImport}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
              <Button asChild variant="outline">
                <span>
                  <Upload className="w-4 h-4 mr-2" />
                  Import from Excel
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔍 Search */}
      <div className="flex justify-end">
        <input
          type="text"
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-64 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 dark:bg-black dark:text-white"
        />
      </div>

      {/* ⏳ Loading */}
      {loading && (
        <div className="flex justify-center py-6">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </div>
      )}

      {/* ❌ Error */}
      {error && <p className="text-red-500">{error}</p>}

      {/* 📋 Member Table */}
      <div className="border rounded-md overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Start</TableHead>
              <TableHead>Expires</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>  
          <TableBody>
            {members
              .filter((m) => {
                const query = searchQuery.toLowerCase();
                return (
                  m.name?.toLowerCase().includes(query) ||
                  m.phone?.toLowerCase().includes(query) ||
                  m.address?.toLowerCase().includes(query)
                );
              })
              .sort((a, b) => {
                const now = new Date();
                const aExpiry = new Date(a.expiryDate);
                const bExpiry = new Date(b.expiryDate);
                const aExpired = aExpiry < now;
                const bExpired = bExpiry < now;

                if (aExpired && !bExpired) return -1;
                if (!aExpired && bExpired) return 1;

                const aSoon =
                  !aExpired &&
                  (aExpiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 5;
                const bSoon =
                  !bExpired &&
                  (bExpiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 5;

                if (aSoon && !bSoon) return -1;
                if (!aSoon && bSoon) return 1;

                return 0;
              })
              .map((m) => {
                const now = new Date();
                const expiry = new Date(m.expiryDate);
                const isExpired = expiry < now;
                const isExpiringSoon =
                  !isExpired &&
                  (expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24) <= 5;

                const rowClass = isExpired
                  ? "bg-red-50 text-red-700"
                  : isExpiringSoon
                  ? "bg-yellow-100 text-yellow-800"
                  : "";

                return (
                  <TableRow key={m._id} className={rowClass}>
                    <TableCell>{m.name}</TableCell>
                    <TableCell>{m.gender || "Not specified"}</TableCell>
                    <TableCell>{m.phone}</TableCell>
                    <TableCell>{m.address}</TableCell>
                    <TableCell>
                      {new Date(m.StartedDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(m.expiryDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {`${m.paymentType} / ${m.paymentMethod}`}
                    </TableCell>
                    <TableCell>
                      {m.Price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell>
                       {m.Discount.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          onClick={() =>
                            navigate(`/dashboard/members/${m._id}/edit`)
                          }
                        >
                                                   <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => handleDelete(m._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default MemberListScreen;
