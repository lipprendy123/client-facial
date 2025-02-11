'use client';

import { useState } from "react";
import { Menu, X, LayoutDashboard, Wrench, Gift, Calendar } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Service',
      path: '/dashboard/services',
      icon: <Wrench className="w-5 h-5" />
    },
    {
      title: 'Benefits',
      path: '/dashboard/benefits',
      icon: <Gift className="w-5 h-5" />
    },
    {
      title: 'Booking',
      path: '/dashboard/bookings',
      icon: <Calendar className="w-5 h-5" />
    }
  ];

  return (
    <div className="relative">
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md text-gray-600 hover:bg-gray-50" 
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 h-screen z-40 w-64 bg-white shadow-lg transform 
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-200 ease-in-out lg:translate-x-0 lg:relative`}
      >
        {/* Sidebar Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
        </div>

        {/* Navigation */}
        <nav className="px-4 py-6">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link 
                  href={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                    ${pathname === item.path 
                      ? 'bg-blue-50 text-blue-600' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;