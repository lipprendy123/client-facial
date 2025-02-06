'use client'

import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:4000/api/auth/logout", {},);
      router.push("/");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">{children}</main>
        <div className="p-6 flex justify-end">
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
