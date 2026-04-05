import { create } from "zustand";
import { persist } from "zustand/middleware";

const useAuthStores = create(
  persist(
    (set) => ({
      token: null,
      setToken: (token) => set({ token }),
      logout: () => set({ token: null }),
    }),
    {
      name: "auth-storage",
    },
  ),
);

export default useAuthStores;
