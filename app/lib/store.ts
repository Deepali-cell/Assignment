import axios from "axios";
import { toast } from "react-toastify";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const store = create(
  persist(
    (set) => ({
      isLogin: false,
      username: "",
      role: "",
      users: [],
      products: [],

      setUser: (username, role) =>
        set({
          isLogin: true,
          username,
          role,
        }),

      logout: () =>
        set({
          isLogin: false,
          username: "",
          role: "",
        }),
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
