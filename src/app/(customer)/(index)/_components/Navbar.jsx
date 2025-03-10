'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, ChevronDown, History, LogOut, Loader2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoadingLogout, setIsLoadingLogout] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth", { withCredentials: true });
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log("User belum login, abaikan error ini.");
        } else {
          console.error("Terjadi error:", error);
        }
      }
    }

    const storedUser = sessionStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        sessionStorage.removeItem("user");
      }
    } else {
      fetchUser();
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownOpen && !event.target.closest('.dropdown-container')) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    if (isLoadingLogout) return;
    
    try {
      setIsLoadingLogout(true);
      await axios.post("http://localhost:4000/api/auth/logout");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("token");
      setUser(null);
      router.push("/");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoadingLogout(false);
    }
  };

  const handleBookingHistory = async () => {
    if (isLoadingHistory) return;

    try {
      setIsLoadingHistory(true);
      setDropdownOpen(false); // Close dropdown immediately
      await router.push("/booking-history");
    } catch (error) {
      console.error("Navigation failed:", error);
    } finally {
      setIsLoadingHistory(false);
    }
  };

  const handleSmoothScroll = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex justify-between items-center py-4">
      <Link
        href="/"
        className="relative font-bold text-2xl"
      >
        <span className="relative inline-block px-2 text-pink-600 hover:text-pink-700 transition-colors duration-300">
          <span className="absolute -left-4 top-1/2 w-2 h-2 rounded-full bg-purple-400 transform -translate-y-1/2"/>
          <span className="absolute -right-4 top-1/2 w-2 h-2 rounded-full bg-pink-400 transform -translate-y-1/2"/>
          Keisha Beauty
        </span>
      </Link>

        <div className="hidden md:flex items-center space-x-6">
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "hero")}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "about")}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            About
          </a>
          <a
            href="#service"
            onClick={(e) => handleSmoothScroll(e, "service")}
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Service
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <div className="relative dropdown-container">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors px-4 py-2 rounded-md hover:bg-gray-100"
              >
                <span>Hi, {user.name}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              <div
                className={`absolute right-0 mt-2 bg-white shadow-lg rounded-md overflow-hidden transition-all duration-200 origin-top-right transform w-48 border border-gray-100 ${
                  dropdownOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <button
                  onClick={handleBookingHistory}
                  disabled={isLoadingHistory}
                  className="flex items-center w-full text-gray-700 hover:bg-gray-100 px-4 py-2 transition-colors"
                >
                  {isLoadingHistory ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <History className="w-4 h-4 mr-2" />
                  )}
                  Booking History
                </button>
                <button
                  onClick={handleLogout}
                  disabled={isLoadingLogout}
                  className="flex items-center w-full text-red-600 hover:bg-red-50 px-4 py-2 transition-colors"
                >
                  {isLoadingLogout ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <LogOut className="w-4 h-4 mr-2" />
                  )}
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-200"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <button
          className="md:hidden text-gray-700 hover:text-blue-600 transition-colors"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden bg-white border-t shadow-md transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="py-4 space-y-4 px-4">
          <a
            href="#hero"
            onClick={(e) => handleSmoothScroll(e, "hero")}
            className="block text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </a>
          <a
            href="#about"
            onClick={(e) => handleSmoothScroll(e, "about")}
            className="block text-gray-700 hover:text-blue-600 transition-colors"
          >
            About
          </a>
          <a
            href="#service"
            onClick={(e) => handleSmoothScroll(e, "service")}
            className="block text-gray-700 hover:text-blue-600 transition-colors"
          >
            Service
          </a>
          <hr className="border-gray-200" />
          {user ? (
            <>
              <span className="block text-gray-700">Hi, {user.name}</span>
              <button
                onClick={handleBookingHistory}
                disabled={isLoadingHistory}
                className="flex items-center w-full text-gray-700 hover:text-blue-600 transition-colors"
              >
                {isLoadingHistory ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <History className="w-4 h-4 mr-2" />
                )}
                Booking History
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoadingLogout}
                className="flex items-center w-full text-red-600 hover:bg-red-50 px-4 py-2 rounded-md transition-colors"
              >
                {isLoadingLogout ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <LogOut className="w-4 h-4 mr-2" />
                )}
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/sign-in"
                className="block bg-blue-600 text-white text-center px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="block bg-gray-200 text-gray-700 text-center px-4 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}