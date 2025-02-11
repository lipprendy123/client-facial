'use client'

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8 } }
};

const AboutComponent = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            variants={fadeInLeft} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Pengalaman Facial Premium untuk Kulit Sehat & Cantik Anda
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Selamat datang di [Nama Spa], tempat di mana keindahan dan kesehatan kulit Anda menjadi prioritas utama kami. Dengan pengalaman lebih dari 10 tahun dalam industri kecantikan, kami menawarkan perawatan facial premium menggunakan produk-produk berkualitas tinggi dan teknologi modern.
            </p>
            <div className="space-y-4">
              {[
                { icon: '✨', title: 'Perawatan Premium', desc: 'Menggunakan produk dan teknik terbaik untuk hasil maksimal' },
                { icon: '👩‍⚕️', title: 'Terapis Berpengalaman', desc: 'Tim ahli kami telah tersertifikasi dan berpengalaman' },
                { icon: '🌿', title: 'Produk Alami', desc: 'Menggunakan bahan-bahan alami yang aman untuk kulit Anda' }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  variants={fadeInUp} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true, amount: 0.2 }}
                  className="flex items-start space-x-3"
                >
                  <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-pink-600 text-xl">{item.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{item.title}</h3>
                    <p className="text-gray-600">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            variants={fadeInRight} 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image 
                src="/example9.avif"
                alt="Facial Spa Treatment"
                width={600}
                height={650}
                className="object-cover"
              />
            </div>
            <motion.div 
              variants={fadeInUp} 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true, amount: 0.2 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl"
            >
              <p className="text-4xl font-bold text-pink-600">10+</p>
              <p className="text-gray-600">Tahun Pengalaman</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutComponent;
