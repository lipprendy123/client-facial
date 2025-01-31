'use client'
import Image from 'next/image';
import Facial from '../../../public/facial-hero.avif';
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen md:max-w-5xl p-6 md:pb-28 container mx-auto">
      <motion.div 
        className="md:w-1/2 text-center md:text-left px-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800">Perawatan Wajah Profesional</h1>
        <p className="mt-4 text-gray-600 text-lg">
          Kami menawarkan jasa facial berkualitas tinggi untuk menjaga kesehatan dan kecantikan kulit Anda.
        </p>
        <button className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg rounded-lg shadow-md hover:bg-blue-700 transition">
          Booking Sekarang
        </button>
      </motion.div>
      
      <motion.div 
        className="md:w-1/2 mt-8 md:mt-0 px-6"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Image
          src='/facial.jpeg'
          width={900}
          height={700} 
          alt="Facial Treatment" 
          className="rounded-lg shadow-lg w-full md:max-w-md"
          placeholder='empty'
        />
      </motion.div>
    </section>
  );
}
