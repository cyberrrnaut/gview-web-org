'use client'

import { http, createConfig } from 'wagmi'
import {  mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors'

// const projectId = '<WALLETCONNECT_PROJECT_ID>'

export const config = createConfig({
  chains: [mainnet],
  connectors: [
    injected(),
   
  ],
  transports: {
    [mainnet.id]: http()
  },
})