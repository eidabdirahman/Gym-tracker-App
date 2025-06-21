import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { USERS_URL } from "../constants";

// Reusable Axios client
const api = axios.create({
  baseURL: USERS_URL,
  withCredentials: true,
});

type Role = "admin" | "superadmin";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: Role;
}

interface AuthCredentials {
  email: string;
  password: string;
}

interface RegisterData extends AuthCredentials {
  name: string;
}

interface UpdateProfileData {
  name?: string;
  email?: string;
  password?: string;
}

interface UpdateUserData {
  userId: string;
  name?: string;
  email?: string;
  role?: Role;
  password?: string;
}

interface UserStore {
  user: User | null;
  users: User[];
  loading: boolean;
  error: string | null;

  login: (data: AuthCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: UpdateProfileData) => Promise<void>;
  fetchUsers: () => Promise<void>;
  deleteUser: (userId: string) => Promise<void>;
  getUserDetails: (id: string) => Promise<void>;
  updateUser: (data: UpdateUserData) => Promise<void>;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      users: [],
      loading: false,
      error: null,

      login: async (data) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post("/login", data);
          set({ user: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Login failed", loading: false });
        }
      },

      register: async (data) => {
        try {
          set({ loading: true, error: null });
          const res = await api.post("/register", data);
          set({ user: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Registration failed", loading: false });
        }
      },

      logout: async () => {
        try {
          await api.post("/logout");
          set({ user: null });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Logout failed" });
        }
      },

      updateProfile: async (data) => {
        try {
          set({ loading: true, error: null });
          const res = await api.put("/profile", data);
          set({ user: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Update failed", loading: false });
        }
      },

      fetchUsers: async () => {
        try {
          set({ loading: true });
          const res = await api.get("/");
          set({ users: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Fetch failed", loading: false });
        }
      },

      deleteUser: async (userId) => {
        try {
          await api.delete(`/${userId}`);
          set((state) => ({
            users: state.users.filter((u) => u._id !== userId),
          }));
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Delete failed" });
        }
      },

      getUserDetails: async (id) => {
        try {
          set({ loading: true });
          const res = await api.get(`/${id}`);
          set({ user: res.data, loading: false });
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Fetch failed", loading: false });
        }
      },

      updateUser: async (data) => {
        try {
          set({ loading: true, error: null });
          const res = await api.put(`/${data.userId}`, data);
          set((state) => ({
            users: state.users.map((u) => (u._id === data.userId ? res.data : u)),
            loading: false,
          }));
        } catch (error: any) {
          set({ error: error.response?.data?.message || "Update failed", loading: false });
        }
      },
    }),
    {
      name: "user-store", // localStorage key
      partialize: (state) => ({ user: state.user }), // Only persist user session
    }
  )
);
