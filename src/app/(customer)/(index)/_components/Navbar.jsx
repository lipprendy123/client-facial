'use client'

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className=" p-4 shadow-md">
      <div className="container mx-auto max-w-5xl flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-900 text-xl font-bold">FacialKeisha</div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-900 hover:text-gray-200">Home</Link>
          <Link href="/about" className="text-gray-900 hover:text-gray-200">About</Link>
          <Link href="/service" className="text-gray-900 hover:text-gray-200">Service</Link>
        </div>

        {/* Sign In & Sign Up Buttons */}
        <div className="hidden md:flex space-x-4">
          <Link href="/signin" className="text-white bg-blue-600 border border-white px-4 py-1 rounded-md hover:bg-blue-700 transition">Sign In</Link>
          <Link href="/signup" className="text-white bg-blue-600  px-4 py-1 rounded-md hover:bg-blue-700 transition">Sign Up</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-gray-900" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 flex flex-col space-y-2 p-4">
          <Link href="/" className="text-gray-900 hover:text-gray-200">Home</Link>
          <Link href="/about" className="text-gray-900 hover:text-gray-200">About</Link>
          <Link href="/service" className="text-gray-900 hover:text-gray-200">Service</Link>
          <hr className="border-gray-400 my-2" />
          <Link href="/signin" className="text-gray-900 border border-white px-4 py-1 rounded-md text-center hover:bg-white hover:text-blue-600 transition">Sign In</Link>
          <Link href="/signup" className="text-gray-900  px-4 py-1 rounded-md text-center hover:bg-gray-200 transition">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
