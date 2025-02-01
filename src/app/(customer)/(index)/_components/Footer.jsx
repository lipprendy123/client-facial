import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Logo & Deskripsi */}
          <div>
            <h2 className="text-2xl font-bold">FacialCare</h2>
            <p className="text-gray-400 mt-2">
              Klinik perawatan wajah terbaik dengan berbagai layanan facial.
            </p>
          </div>

          {/* Navigasi */}
          <div>
            <h3 className="text-xl font-semibold">Layanan</h3>
            <ul className="mt-2 space-y-2">
              <li><a href="#" className="hover:text-gray-300">Facial Basic</a></li>
              <li><a href="#" className="hover:text-gray-300">Hydrating Facial</a></li>
              <li><a href="#" className="hover:text-gray-300">Anti-Aging</a></li>
            </ul>
          </div>

          {/* Sosial Media */}
          <div>
            <h3 className="text-xl font-semibold">Ikuti Kami</h3>
            <div className="flex space-x-4 mt-2">
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition duration-300">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 mt-8 border-t border-gray-700 pt-4">
          <p>&copy; {new Date().getFullYear()} FacialCare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
