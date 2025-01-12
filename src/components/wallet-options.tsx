'use client'

import * as React from 'react'
import { useConnect } from 'wagmi'

export function WalletOptions() {
  const { connectors, connect } = useConnect()

  return (
    <>
      {connectors.slice(1).map((connector) => (
        <button
          key={connector.uid}
          onClick={() => connect({ connector })}
          className="w-full px-4 py-2 mb-2 bg-slate-700 text-white rounded-md hover:bg-slate-800"
        >
          {connector.name}
        </button>
      ))}
    </>
  )
}
