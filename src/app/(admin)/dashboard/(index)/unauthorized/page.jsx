'use client';

import { useRouter } from "next/navigation";

const UnauthorizedPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-2xl font-bold text-red-500">Access Denied</h1>
      <p className="text-gray-600">You are not authorized to view this page.</p>
      <button 
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => router.push("/")}
      >
        Go Home
      </button>
    </div>
  );
};

export default UnauthorizedPage;
