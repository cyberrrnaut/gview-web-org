'use client'

import React, { useState } from 'react'
import { Search, User, Settings, Menu } from 'lucide-react'

export default function ResponsiveNavbar() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  return (
    <>
      {/* Navbar for Large and Medium Devices */}
      <div className="hidden md:flex w-[100vw] mt-16 fixed  justify-end items-center h-[60px] px-6 border-b border-gray-300 lg:flex-row md:flex-row">
       

        
        {/* Profile and Settings */}
        <div className="flex items-center gap-4">
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => console.log('Profile clicked')}
          >
            <User size={20} />
          </button>
          <button
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            onClick={() => console.log('Settings clicked')}
          >
            <Settings size={20} />
          </button>
        </div>
      </div>

      {/* Navbar for Small Devices */}
      <div className="fixed bottom-0 inset-x-0 flex justify-between items-center h-[60px] px-6 border-t border-gray-300 md:hidden">
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => console.log('Menu clicked')}
        >
          <Menu size={24} />
        </button>

        {/* Search Button on Small Devices */}
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => setIsSearchVisible(!isSearchVisible)}
        >
          <Search size={24} />
        </button>

        {/* Profile Button */}
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => console.log('Profile clicked')}
        >
          <User size={24} />
        </button>

        {/* Settings Button */}
        <button
          className="p-2 hover:bg-gray-200 rounded-full"
          onClick={() => console.log('Settings clicked')}
        >
          <Settings size={24} />
        </button>
      </div>

      {/* Search bar for Small Devices */}
      {isSearchVisible && (
        <div className="fixed inset-x-0 top-[60px] p-4 bg-white border-b border-gray-300 md:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search..."
              className="block w-full px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="px-4 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
              onClick={() => console.log('Searching for:', searchQuery)}
            >
              <Search size={20} />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
