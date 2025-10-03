import React, { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { config } from "../config/config" 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo + App Name */}
        <Link href="/" className="flex items-center h-12">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            className="h-20 w-auto" 
            width={0} 
            height={0} 
            sizes="100vw"
          />
        </Link>

        {/* Nav Links - Desktop */}
        <nav className="hidden md:flex space-x-4">
          <Link href="/about" className="px-3 py-2 rounded-md text-gray-700 hover:bg-green-500 hover:text-white transition">Despre Noi</Link>
          <Link href="/contact" className="px-3 py-2 rounded-md text-gray-700 hover:bg-green-500 hover:text-white transition">Contact</Link>
          <Link href="/firms" className="px-3 py-2 rounded-md text-gray-700 hover:bg-green-500 hover:text-white transition">Partener</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md hover:bg-gray-100"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-2 px-6 py-4">
            <Link href="/about" className="px-3 py-2 rounded-md text-gray-700 hover:bg-green-500 hover:text-white transition">Despre Noi</Link>
            <Link href="/contact" className="px-3 py-2 rounded-md text-gray-700 hover:bg-green-500 hover:text-white transition">Contact</Link>
            <Link href="/firms" className="px-3 py-2 rounded-md text-gray-700 hover:bg-green-500 hover:text-white transition">Partener</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Navbar
