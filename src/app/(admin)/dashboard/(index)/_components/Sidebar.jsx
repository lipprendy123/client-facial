'use client'

// components/Sidebar.js
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">
      <button
        className="lg:hidden p-2 text-gray-600" 
        onClick={toggleSidebar}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
      <div
        className={`fixed inset-y-0 left-0 h-screen z-50 w-64 bg-gray-900 text-white p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform lg:translate-x-0 lg:relative lg:w-64`}
      >
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav>
          <ul className="space-y-4">
            <li><Link href="/dashboard/services" className="block p-2 rounded hover:bg-gray-700">Service</Link></li>
            <li><Link href="/dashboard/benefits" className="block p-2 rounded hover:bg-gray-700">Benefits</Link></li>
            <li><Link href="/dashboard/bookings" className="block p-2 rounded hover:bg-gray-700">Booking</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;