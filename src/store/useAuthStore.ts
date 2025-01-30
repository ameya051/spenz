import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

interface User {
    id: string
    email: string
    name: string
}

interface AuthState {
    user: User | null
    setUser: (user: User | null) => void
}

export const useAuthStore = create<AuthState>()(
    devtools(
        (set) => ({
            user: null,
            setUser: (user: User | null) => set((state) => ({ ...state, user })),
        }),
        { name: 'Auth Store' }
    )
)
