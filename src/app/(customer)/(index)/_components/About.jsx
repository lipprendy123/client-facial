import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Image from 'next/image';

const AboutComponent = () => {
  return (
    <section className="py-16 px-4 bg-gradient-to-br from-pink-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
              Pengalaman Facial Premium untuk Kulit Sehat & Cantik Anda
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Selamat datang di [Nama Spa], tempat di mana keindahan dan kesehatan kulit Anda menjadi prioritas utama kami. Dengan pengalaman lebih dari 10 tahun dalam industri kecantikan, kami menawarkan perawatan facial premium menggunakan produk-produk berkualitas tinggi dan teknologi modern.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-xl">✨</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Perawatan Premium</h3>
                  <p className="text-gray-600">Menggunakan produk dan teknik terbaik untuk hasil maksimal</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-xl">👩‍⚕️</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Terapis Berpengalaman</h3>
                  <p className="text-gray-600">Tim ahli kami telah tersertifikasi dan berpengalaman</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                  <span className="text-pink-600 text-xl">🌿</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Produk Alami</h3>
                  <p className="text-gray-600">Menggunakan bahan-bahan alami yang aman untuk kulit Anda</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-lg overflow-hidden">
              <Image 
                src="/facial-hero.avif"
                alt="Facial Spa Treatment"
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-xl">
              <p className="text-4xl font-bold text-pink-600">10+</p>
              <p className="text-gray-600">Tahun Pengalaman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};



export default AboutComponent;