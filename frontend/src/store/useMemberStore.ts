import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { toast } from "react-hot-toast";
import { MEMBERS_URL } from "../constants";

// Authenticated Axios client
const api = axios.create({
  baseURL: MEMBERS_URL,
  withCredentials: true,
});

export interface Member {
  _id: string;
  name: string;
  phone?: string;
  address?: string;
  StartedDate: string;
  expiryDate: string;
  gender?: "male" | "female";
  paymentType: string;
  paymentMethod: string;
  Price: number;
  Discount: number;
  createdAt: string;
  updatedAt: string;
}

interface MemberStore {
  members: Member[];
  member: Member | null;
  loading: boolean;
  error: string | null;

  fetchMembers: () => Promise<void>;
  getMember: (id: string) => Promise<void>;
  addMember: (data: Partial<Member>) => Promise<void>;
  updateMember: (id: string, data: Partial<Member>) => Promise<void>;
  deleteMember: (id: string) => Promise<void>;
  importMembers: (data: Partial<Member>[]) => Promise<void>;
}

export const useMemberStore = create<MemberStore>()(
  persist(
    (set) => ({
      members: [],
      member: null,
      loading: false,
      error: null,

      fetchMembers: async () => {
        try {
          set({ loading: true });
          const res = await api.get("/");
          set({ members: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Fetch failed", loading: false });
        }
      },

      getMember: async (id) => {
        try {
          set({ loading: true });
          const res = await api.get(`/${id}`);
          set({ member: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Get failed", loading: false });
        }
      },

      addMember: async (data) => {
        try {
          set({ loading: true });
          const res = await api.post("/", data);
          set((state) => ({
            members: [...state.members, res.data],
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Create failed", loading: false });
        }
      },

      updateMember: async (id, data) => {
        try {
          set({ loading: true });
          const res = await api.put(`/${id}`, data);
          set((state) => ({
            members: state.members.map((m) => (m._id === id ? res.data : m)),
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Update failed", loading: false });
        }
      },

      deleteMember: async (id) => {
        try {
          await api.delete(`/${id}`);
          set((state) => ({
            members: state.members.filter((m) => m._id !== id),
          }));
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Delete failed" });
        }
      },

importMembers: async (data) => {
  try {
    set({ loading: true });

    const enrichedMembers: Member[] = [];

    for (const row of data) {
      const res = await api.post("/", row);

      const enriched = {
        ...row,
        _id: res.data._id,
        createdAt: res.data.createdAt,
        updatedAt: res.data.updatedAt,
        name: row.name ?? "",
        StartedDate: row.StartedDate ?? "",
        expiryDate: row.expiryDate ?? "",
        paymentType: row.paymentType ?? "",
        paymentMethod: row.paymentMethod ?? "",
        Price: row.Price ?? 0,
        Discount: row.Discount ?? 0,
      };

      enrichedMembers.push(enriched as Member);
    }

    set((state) => ({
      members: [...state.members, ...enrichedMembers],
      loading: false,
    }));

    toast.success("Excel members imported");
  } catch (error: any) {
    set({
      error: error.response?.data?.message || "Import failed",
      loading: false,
    });
    toast.error("Excel import failed");
  }
}

    }),
    {
      name: "member-store",
      partialize: (state) => ({ member: state.member }),
    }
  )
);
