import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useAuthStore = create(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      is_authenticated: false,

      setAuth: (token, user) => set({
        token,
        user,
        is_authenticated: true
      }),

      logout: () => set({
        token: null,
        user: null,
        is_authenticated: false
      }),

      getToken: () => get().token
    }),
    {
      name: 'auth_storage'
    }
  )
)

export default useAuthStore