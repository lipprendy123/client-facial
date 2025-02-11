"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from 'next/navigation';
import axios from "axios";
import Image from "next/image";
import Link from "next/link";

const ServiceCard = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingId, setLoadingId] = useState(null); // ID service yang sedang loading
  const router = useRouter();

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/services")
      .then((response) => {
        setServices(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  const handleCardClick = (id) => {
    setLoadingId(id); // Set ID service yang sedang loading
    setTimeout(() => {
      router.push(`/service/${id}`);
    }, 1000); // Simulasi delay sebelum pindah halaman
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!Array.isArray(services)) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl text-gray-600">No services available at the moment.</h3>
        <p className="text-gray-500 mt-2">Please check back later.</p>
      </div>
    );
  }

  return (
    <section id="service" className="container mx-auto px-4 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Premium Services
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our range of professional facial treatments designed to enhance your natural beauty
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                loadingId === service._id ? "opacity-50 cursor-wait" : ""
              }`}
              onClick={() => handleCardClick(service._id)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={`http://localhost:4000/public/images/${service.image[0]}`}
                  alt={service.name}
                  width={400}
                  height={300}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                  {service.name}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <span className="text-lg font-bold text-blue-600">
                    Rp {service.price.toLocaleString()}
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500 text-white text-sm rounded-lg flex items-center justify-center transition-opacity duration-300"
                  >
                    {loadingId === service._id ? (
                      <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                    ) : (
                      "View Details"
                    )}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceCard;
