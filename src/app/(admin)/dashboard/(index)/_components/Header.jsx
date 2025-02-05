import Image from "next/image";

// components/Header.js
const Header = () => {
    return (
      <header className="bg-white shadow p-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">Admin Dashboard</h1>
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Admin</span>
          <Image src="/facial.jpeg" alt="Profile" width={8} height={8} className="w-8 h-8 object-cover rounded-full" />
        </div>
      </header>
    );
  };
  
  export default Header;