'use client'

import { motion } from 'framer-motion';

export default function About() {
  return (
    <div id='about' className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden"
      >
        <div className="px-6 py-8 sm:p-10">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-4xl font-extrabold text-gray-900 sm:text-5xl"
          >
            Tentang Facial Web
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-4 text-lg text-gray-600"
          >
            Facial Web adalah platform inovatif yang menggunakan teknologi pengenalan wajah untuk memberikan solusi yang aman, cepat, dan efisien. Kami berkomitmen untuk menyediakan layanan terbaik dalam bidang identifikasi dan verifikasi wajah.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="mt-8"
          >
            <h2 className="text-2xl font-bold text-gray-900">Fitur Kami</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </span>
                <p className="ml-3 text-base text-gray-700">Pengenalan wajah dengan akurasi tinggi.</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </span>
                <p className="ml-3 text-base text-gray-700">Integrasi mudah dengan sistem Anda.</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white">
                  ✓
                </span>
                <p className="ml-3 text-base text-gray-700">Keamanan data yang terjamin.</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}