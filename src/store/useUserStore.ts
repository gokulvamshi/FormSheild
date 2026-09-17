import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
  user: {
    id: string;
    firebaseUid?: string | null;
    email?: string | null;
    phone?: string | null;
    name: string | null;
    avatar?: string | null;
    digilockerConnected: boolean;
    mockMode: boolean;
    language?: string;
  } | null;
  setUser: (user: UserState['user']) => void;
  updateUser: (updates: Partial<NonNullable<UserState['user']>>) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),
      clearUser: () => set({ user: null }),
    }),
    {
      name: 'formshield-user',
    }
  )
);
