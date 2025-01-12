'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/config'

import React from 'react'

const queryClient = new QueryClient()

// Using React.ReactNode to type the children prop
export function WagmiWrapper({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}> 
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  )
}
