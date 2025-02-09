'use client'
import Image from 'next/image';
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section id='hero' className="relative flex flex-col md:flex-row items-center justify-center min-h-screen md:max-w-7xl p-6 md:pb-28 container mx-auto">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-blue-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-50 rounded-full filter blur-3xl opacity-30 -z-10"></div>

      <motion.div 
        className="md:w-1/2 text-center md:text-left px-6 space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-block px-4 py-2 bg-blue-50 rounded-full">
          <span className="text-blue-600 font-medium">✨ Spesial untuk Anda</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 leading-tight">
          Wujudkan Impian<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-500">
            Kulit Sehat & Glowing
          </span>
        </h1>

        <p className="text-gray-600 text-lg md:text-xl leading-relaxed max-w-xl">
          Nikmati pengalaman perawatan wajah eksklusif dengan teknologi terkini dan produk premium untuk hasil yang maksimal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.button 
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Booking Sekarang
          </motion.button>
          
          <motion.button 
            className="px-8 py-4 bg-white text-blue-600 text-lg rounded-xl shadow-md hover:shadow-lg border-2 border-blue-100 transform hover:-translate-y-0.5 transition-all"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Lihat Layanan
          </motion.button>
        </div>

        <div className="flex items-center gap-6 pt-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">1000+</h3>
            <p className="text-gray-600">Klien Puas</p>
          </div>
          <div className="h-12 w-px bg-gray-200"></div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">15+</h3>
            <p className="text-gray-600">Treatment</p>
          </div>
          <div className="h-12 w-px bg-gray-200"></div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-800">5⭐</h3>
            <p className="text-gray-600">Rating</p>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        className="md:w-1/2 mt-12 md:mt-0 px-6 relative"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Decoration elements */}
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full -z-10"></div>
        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-pink-100 rounded-full -z-10"></div>
        
        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src='/facial.jpeg'
            width={900}
            height={700} 
            alt="Perawatan Wajah Premium" 
            className="w-full md:max-w-2xl object-cover transform hover:scale-105 transition-transform duration-700"
            placeholder='empty'
            priority
          />
          
          {/* Floating card */}
          <motion.div 
            className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌟</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Hasil Terbaik</h3>
                <p className="text-gray-600">Dipercaya oleh ribuan pelanggan</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}