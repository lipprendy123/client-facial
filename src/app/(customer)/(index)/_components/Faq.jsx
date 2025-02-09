'use client'

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQComponent = () => {
    const [openIndex, setOpenIndex] = React.useState(null);
  
    const faqs = [
      {
        question: "Berapa lama durasi treatment facial?",
        answer: "Treatment facial kami berlangsung sekitar 60-90 menit, tergantung jenis paket yang Anda pilih. Setiap sesi mencakup konsultasi awal, pembersihan, perawatan utama, dan relaksasi."
      },
      {
        question: "Apakah perlu booking terlebih dahulu?",
        answer: "Ya, kami sangat menyarankan untuk melakukan booking terlebih dahulu untuk memastikan ketersediaan jadwal dan terapis. Anda dapat melakukan booking melalui website ini atau menghubungi nomor kami."
      },
      {
        question: "Produk apa yang digunakan dalam treatment?",
        answer: "Kami menggunakan produk-produk premium berkualitas tinggi yang telah teruji secara dermatologis. Semua produk kami mengandung bahan-bahan alami dan aman untuk semua jenis kulit."
      },
      {
        question: "Apakah ada hal yang perlu dipersiapkan sebelum facial?",
        answer: "Kami menyarankan untuk datang dengan wajah bersih tanpa makeup. Jika Anda memiliki kondisi kulit khusus, harap informasikan kepada kami saat melakukan booking."
      },
      {
        question: "Berapa sering sebaiknya melakukan facial?",
        answer: "Untuk hasil optimal, kami menyarankan melakukan facial setiap 3-4 minggu sekali. Namun, frekuensi dapat disesuaikan dengan kondisi dan kebutuhan kulit Anda."
      }
    ];
  
    return (
      <section className="py-16 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-gray-600">
              Temukan jawaban untuk pertanyaan umum seputar layanan facial kami
            </p>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left bg-white hover:bg-gray-50 flex justify-between items-center"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <span className="font-medium text-gray-800">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                <div
                  className={`px-6 py-4 bg-gray-50 ${
                    openIndex === index ? "block" : "hidden"
                  }`}
                >
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };

  export default FAQComponent;