import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAuthStore = create(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            role: null, // 'client', 'artisan', 'admin'

            setAuth: (user, token) => set({
                user,
                token,
                isAuthenticated: !!token,
                role: user?.role || null
            }),

            logout: () => set({
                user: null,
                token: null,
                isAuthenticated: false,
                role: null
            }),

            updateUser: (userData) => set((state) => ({
                user: { ...state.user, ...userData }
            })),
        }),
        {
            name: 'artisan-connect-auth',
        }
    )
);
