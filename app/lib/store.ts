import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

/* ================= TYPES ================= */
interface User {
  id: number;
  username: string;
  role?: string;
  [key: string]: any;
}

interface Product {
  id: number;
  title: string;
  [key: string]: any;
}

interface StoreState {
  isLogin: boolean;
  username: string;
  role: string;
  users: User[];
  products: Product[];
  setUser: (username: string, role: string) => void;
  logout: () => void;
  getUsers: () => Promise<void>;
  getProducts: () => Promise<void>;
}

/* ================= STORE ================= */

const store = create<StoreState>()(
  persist(
    (set) => ({
      isLogin: false,
      username: "",
      role: "",
      users: [],
      products: [],

      setUser: (username: string, role: string) =>
        set({ isLogin: true, username, role }),

      logout: () => set({ isLogin: false, username: "", role: "" }),

      getUsers: async () => {
        try {
          const { data } = await axios.get("/api/getusers");

          if (!data.success) {
            toast.error(data.message);
            return;
          }

          set({ users: data.users });
        } catch (error) {
          toast.error("Failed to fetch users");
        }
      },

      getProducts: async () => {
        try {
          const { data } = await axios.get("/api/getproducts");

          if (!data.success) {
            toast.error(data.message);
            return;
          }

          set({ products: data.products });
        } catch (error) {
          toast.error("Failed to fetch products");
        }
      },
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        isLogin: state.isLogin,
        username: state.username,
        role: state.role,
      }),
    }
  )
);

export default store;
