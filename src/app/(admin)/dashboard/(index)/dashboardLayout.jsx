'use client'

import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">{children}</main>
        <div className="p-6 flex justify-end">
        </div>
      </div>  
    </div>
  );
};

export default DashboardLayout;
