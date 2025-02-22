'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Sidebar from "./_components/Sidebar";
import Header from "./_components/Header";

const DashboardLayout = ({ children }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkUserRole = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/auth", { withCredentials: true });
        const user = response.data.user; // Perubahan di sini
    
        if (user.role === "admin") {
          setIsAuthorized(true);
        } else {
          router.push("/unauthorized"); // Redirect jika bukan admin
        }
      } catch (error) {
        router.push("/dashboard/admin-sign-in"); // Redirect jika tidak login
      } finally {
        setLoading(false);
      }
    };

    checkUserRole();
  }, [router]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthorized) {
    return null; // Hindari render layout sebelum redirect
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="p-6 flex-1">{children}</main>
        <div className="p-6 flex justify-end"></div>
      </div>
    </div>
  );
};

export default DashboardLayout;
