'use client'

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Untuk redirect setelah logout
import { Menu, X } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State untuk mengontrol dropdown
  const router = useRouter(); // Gunakan router untuk navigasi

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.removeItem("user"); // Hapus jika data corrupt
      }
    }
  }, []);

  // Fungsi Logout
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout");

      // Hapus sesi token & user
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");

      setUser(null); // Update state

      router.push("/"); // Redirect ke halaman login
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="p-4 shadow-md">
      <div className="container mx-auto max-w-5xl flex justify-between items-center">
        {/* Logo */}
        <div className="text-gray-900 text-xl font-bold">FacialKeisha</div>

        {/* Menu Items */}
        <div className="hidden md:flex space-x-6">
          <Link href="/" className="text-gray-900 hover:text-gray-200">Home</Link>
          <Link href="#about" className="text-gray-900 hover:text-gray-200">About</Link>
          <Link href="#service" className="text-gray-900 hover:text-gray-200">Service</Link>
        </div>

        {/* Kondisi: Jika user sudah login, tampilkan username dan Dropdown */}
        <div className="hidden md:flex space-x-4 items-center">
          {user ? (
            <>
              <span className="text-gray-900">Hi, {user.email}</span>

              {/* Dropdown untuk Logout dan History Booking */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="text-gray-900 px-4 py-1 rounded-md hover:bg-gray-200"
                >
                  ▼
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 space-y-2 w-48">
                    <Link
                      href="/booking-history"
                      className="block text-gray-900 hover:bg-gray-100 px-4 py-1 rounded-md"
                    >
                      History Booking
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block text-red-600 hover:bg-red-100 px-4 py-1 rounded-md w-full text-left"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-white bg-blue-600 border border-white px-4 py-1 rounded-md hover:bg-blue-700 transition">Sign In</Link>
              <Link href="/sign-up" className="text-white bg-blue-600 px-4 py-1 rounded-md hover:bg-blue-700 transition">Sign Up</Link>
            </>
          )}
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
          {user ? (
            <>
              <span className="text-gray-900">Hi, {user.username}</span>
              <button
                onClick={handleLogout}
                className="text-gray-900 border border-white px-4 py-1 rounded-md text-center hover:bg-red-600 hover:text-white transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="text-gray-900 border border-white px-4 py-1 rounded-md text-center hover:bg-white hover:text-blue-600 transition">Sign In</Link>
              <Link href="/sign-up" className="text-gray-900 px-4 py-1 rounded-md text-center hover:bg-gray-200 transition">Sign Up</Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
