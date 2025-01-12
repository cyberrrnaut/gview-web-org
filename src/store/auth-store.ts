import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { disconnect } from '@wagmi/core'
import { config } from '@/config'

type AuthState = {
  isAuthenticated: boolean
  isProfileComplete: boolean
  address?: string
  email?: string
  avatarUrl?:string
  login: (data: { email?: string; address?: `0x${string}` }) => Promise<void>
  logout: () => Promise<void>
  setAuthenticated: (auth: boolean) => void
  setProfileComplete: (profileComplete: boolean) => void
}

export const useAuthStore = create(
  persist<AuthState>(
    (set) => ({
      isAuthenticated: false,
      isProfileComplete: false,
      address: undefined,
      email: undefined,

      setAuthenticated: (auth) => set({ isAuthenticated: auth }),
      setProfileComplete: (profileComplete) =>
        set({ isProfileComplete: profileComplete }),

      // Centralized login API call
      login: async (data: { email?: string; address?: `0x${string}` }) => {
        try {
          // Build request body based on the provided data
          const requestBody: { email?: string; address?: string } = {}
          if (data.email) {
            requestBody.email = data.email
          } else if (data.address) {
            requestBody.address = data.address
          }

          const response = await fetch('/api/auth/signin', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody), // Send only the relevant field
            credentials: 'include', // To manage cookies if needed
          })

          if (!response.ok) {
            throw new Error('Login failed')
          }
          
          console.log('response',response);
          
          const result = await response.json()
          console.log('result',result);
          
          // Update Zustand state based on API response
          set({
            isAuthenticated: true,
            address: result.user.address || data.address,
            email: result.user.email || data.email,
            avatarUrl: result.user.avatar ,
            isProfileComplete: result.isProfileComplete || false,
          })
          console.log('Login successful:', result)
        } catch (error) {
          console.error('Error during login:', error)
          throw error
        }
      },

      // Centralized logout API call
      logout: async () => {
        try {
          const response = await fetch('/api/auth/signout', {
            method: 'POST',
            credentials: 'include', // Include cookies for server-side logout
          })

          if (!response.ok) {
            throw new Error('Logout failed')
          }

          // Disconnect wallet if connected
          await disconnect(config)

          // Clear the state
          set({
            isAuthenticated: false,
            isProfileComplete: false,
            address: undefined,
            email: undefined,
            avatarUrl:undefined,
          })

          // Clear persisted storage
          const storageKey = 'auth-store'
          localStorage.removeItem(`zustand-persist:${storageKey}`)

          console.log('Logout successful')
        } catch (error) {
          console.error('Error during logout:', error)
          throw error
        }
      },
    }),
    { name: 'auth-store' } // Key for local storage
  )
)
