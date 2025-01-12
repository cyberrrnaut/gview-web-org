'use client'

import React, { useState } from 'react'
import { ModeToggle } from './mode-toggle'
import { ConnectModal } from './Modal'
import { useAuthStore } from '@/store/auth-store'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { isAuthenticated, logout, avatarUrl } = useAuthStore()
  const router = useRouter()

  const handleModalToggle = () => {
    setIsModalOpen((prev) => !prev)
  }

  const handleLogout = () => {
    logout()
  }

  const handleProfileRedirect = () => {
    router.push('/profile')
  }

  return (
    <div className="fixed top-0 left-0 w-full shadow-md z-50 flex justify-around h-[60px] border-b-[1px] border-slate-400 md:justify-between">
      {/* App Title */}
      <h1 className="text-xl font-bold">g-view</h1>

      {/* Right Section with Mode Toggle and Connect */}
      <div className="relative flex items-center gap-4">
        {/* Mode Toggle (Theme Switcher) */}
        <ModeToggle />

        {/* Connect or Disconnect Button */}
        {
          isAuthenticated ? (
            <>
             
              {avatarUrl && (
                <div className="relative group pr-14">
                  {/* Avatar Image */}
                  <Image 
                    width={40} 
                    height={40} 
                    src={avatarUrl} 
                    alt="avatar" 
                    className="rounded-full cursor-pointer"
                    onClick={handleProfileRedirect}
                  />

                  {/* Profile Button (Hidden initially, only visible on large screen hover) */}
                  <div className=" absolute top-full flex flex-col items-start justify-center left-0 w-full transform -translate-y-4 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <button 
                      onClick={handleProfileRedirect} 
                      className="bg-blue-500 text-white px-4 py-2 rounded-md w-full"
                    >
                      Profile
                    </button>
                    <button
                onClick={handleLogout}   
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                Disconnect
              </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <button
              onClick={handleModalToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Connect
            </button>
          )
        }

        {/* Connect Modal */}
        <ConnectModal isOpen={isModalOpen} onClose={handleModalToggle} />
      </div>
    </div>
  )
}
