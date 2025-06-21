import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
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
    }),
    {
      name: "member-store",
      partialize: (state) => ({ member: state.member }), // optional: persist only selected member
    }
  )
);
