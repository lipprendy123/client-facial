'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.removeItem("user");
      }
    }
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          FacialKeisha
        </Link>

        <div className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="#about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link href="#service" className="text-gray-700 hover:text-blue-600 transition">Service</Link>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition"
              >
                <span>Hi, {user.email}</span>
                <ChevronDown size={16} />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md p-2 w-48">
                  <Link
                    href="/booking-history"
                    className="block text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-md"
                  >
                    Booking History
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left text-red-600 hover:bg-red-100 px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/sign-in" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Sign In
              </Link>
              <Link href="/sign-up" className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t shadow-md py-4 space-y-4 px-4">
          <Link href="/" className="block text-gray-700 hover:text-blue-600 transition">Home</Link>
          <Link href="#about" className="block text-gray-700 hover:text-blue-600 transition">About</Link>
          <Link href="#service" className="block text-gray-700 hover:text-blue-600 transition">Service</Link>
          <hr className="border-gray-300" />
          {user ? (
            <>
              <span className="block text-gray-700">Hi, {user.username}</span>
              <Link href="/booking-history" className="block text-gray-700 hover:text-blue-600 transition">
                Booking History
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left text-red-600 hover:bg-red-100 px-4 py-2 rounded-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/sign-in" className="block bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition">
                Sign In
              </Link>
              <Link href="/sign-up" className="block bg-gray-200 text-gray-700 text-center px-4 py-2 rounded-md hover:bg-gray-300 transition">
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
