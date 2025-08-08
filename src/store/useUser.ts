import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// User type
type TUser = {
  id: string;
  name: string;
  role: 'admin' | 'user';
  token:string;
} | null;

// // API response type
export type LoginResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data: TUser;
};

// Store type
type TUserStore = {
  user: TUser;
  setUser: (user: TUser) => void;
  clearUser: () => void;
};

// Zustand store with persistence
export const useUserStore = create<TUserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'user', // key in localStorage
    }
  )
);
