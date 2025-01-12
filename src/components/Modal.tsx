import { ArrowRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { WalletOptions } from "@/components/wallet-options"
import { useAccount } from 'wagmi'
import { useAuthStore } from '@/store/auth-store'

export const ConnectModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { address } = useAccount()
  const { login, isAuthenticated } = useAuthStore()
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const modalRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (address) {
      login({ address:address })
    }
  }, [address, login])

  useEffect(() => {
    if (isAuthenticated) {
      onClose()
    }
  }, [isAuthenticated])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleOutsideClick)
    }
    return () => document.removeEventListener('mousedown', handleOutsideClick)
  }, [isOpen, onClose])

  const handleSubmitEmail = async () => {
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMessage('Invalid email address')
      return
    }

    try {
      setErrorMessage('')
      setIsLoading(true)
      await login({ email })
      console.log('Logged in with email successfully')
    } catch (error) {
      setErrorMessage('Failed to log in. Please try again.')
      console.error('Login failed:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" aria-hidden={!isOpen}>
      <div
        ref={modalRef}
        className="bg-slate-600 flex flex-col items-center justify-center shadow-lg relative w-screen h-screen md:rounded-lg md:w-[auto] md:h-[auto] p-6"
      >
        <h2 className="text-lg font-semibold mb-4">Connect Options</h2>

        <WalletOptions />

        <div className="mb-4">
          <div className="flex border rounded-md overflow-hidden">
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Continue with email"
              className="block w-full px-3 py-2 border-none shadow-sm focus:ring-blue-500 focus:border-blue-500 outline-none"
              disabled={isLoading}
            />
            <button
              className={`p-2 bg-blue-500 text-white flex items-center justify-center ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
              onClick={handleSubmitEmail}
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : <ArrowRight size={20} />}
            </button>
          </div>
          {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}
        </div>

        <div className="flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-red-600 rounded-md hover:bg-red-800">
            Close
          </button>
        </div>
      </div>
    </div>
  )
}
