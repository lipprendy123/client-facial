"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Image from "next/image";

const ServiceCard = () => {
  const [services, setServices] = useState([]); // Pastikan state awal adalah array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/services")
      .then((response) => {
        console.log("API Response:", response.data); // Debugging
        setServices(response.data.data); // Ambil array dari properti "data"
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!Array.isArray(services)) {
    return <p className="text-center text-gray-500">No services available.</p>;
  }

  return (
    <div className="container mx-auto px-4 md:mb-48 md:max-w-5xl py-8">
      <h2 className="text-2xl font-bold text-center mb-6">Our Services</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.map((service) => (
          <motion.div
            key={service._id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Image
              src={`http://localhost:4000/public/images/${service.image}`}
              alt={service.name}
              width={300} // Atur width sesuai kebutuhan
              height={200} // Atur height sesuai kebutuhan
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600">
                Rp {service.price.toLocaleString()}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ServiceCard;
