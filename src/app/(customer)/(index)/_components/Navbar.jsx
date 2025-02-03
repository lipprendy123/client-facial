'use client'

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto max-w-5xl flex justify-between items-center">
        {/* Logo */}
        <div className="text-white text-xl font-bold">FacialKeisha</div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-white hover:text-gray-200">Home</Link>
          <Link href="/about" className="text-white hover:text-gray-200">About</Link>
          <Link href="/service" className="text-white hover:text-gray-200">Service</Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-700 flex flex-col space-y-2 p-4">
          <a href="#home" className="text-white hover:text-gray-200">Home</a>
          <a href="#about" className="text-white hover:text-gray-200">About</a>
          <a href="#service" className="text-white hover:text-gray-200">Service</a>
        </div>
      )}
    </nav>
  );
}
