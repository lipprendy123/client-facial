"use client";

import axios from "axios";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Link from "next/link";

const ServiceDetail = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/services/${id}`)
        .then((response) => {
          console.log("API Response:", response.data); // Debug
          setService(response.data.data); // Perbaikan akses data
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  if (!service) {
    return <div>Data tidak ditemukan.</div>;
  }

  console.log("Service Image:", service.image);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Slider */}
          <div className="md:w-1/2 w-full relative">
            {" "}
            {/* Added relative for absolute positioning */}
            <Swiper
              navigation={true}
              modules={[Navigation]}
              className="w-full h-full"
            >
              {service.image?.length > 0 ? (
                service.image.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img
                      src={`http://localhost:4000/public/images/${img}`}
                      alt={`${service.name} - ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))
              ) : (
                <div className="flex items-center justify-center h-full">
                  {" "}
                  {/* Centered placeholder */}
                  <p className="text-gray-500">Gambar tidak tersedia</p>
                </div>
              )}
            </Swiper>
            {/* Optional: Add image counter or other overlay elements here */}
            {/* Example: <div className="absolute bottom-4 left-4 bg-gray-800 bg-opacity-50 text-white px-2 py-1 rounded">1/3</div> */}
          </div>

          {/* Service Info */}
          <div className="md:w-1/2 w-full p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4 md:text-4xl">
                {service.name}
              </h1>
              <p className="text-gray-600 mb-6 leading-relaxed md:text-lg">
                {service.description}
              </p>

              <div className="grid grid-cols-2 gap-4 mb-6 md:flex md:items-center md:justify-between">
                {" "}
                {/* Used grid for responsiveness */}
                <div>
                  <span className="text-lg font-semibold text-gray-700">
                    Harga:
                  </span>
                  <span className="text-xl font-bold text-blue-600 ml-2">
                    Rp {service?.price?.toLocaleString() ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-700">
                    Durasi:
                  </span>
                  <span className="text-xl font-bold text-blue-600 ml-2">
                    {service.duration} jam
                  </span>
                </div>
              </div>

              <div className="mb-8">
                {" "}
                {/* Increased margin bottom */}
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">
                  Manfaat
                </h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 md:text-lg">
                  {" "}
                  {/* Added space-y for list items */}
                  {service?.benefits?.length > 0 ? (
                    service.benefits.map((benefit) => (
                      <li key={benefit._id}>{benefit.name}</li>
                    ))
                  ) : (
                    <li>Data manfaat tidak tersedia.</li>
                  )}
                </ul>
              </div>
            </div>

            <Link
              href={`/booking?serviceId=${service._id}`}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-lg md:text-xl"
            >
              Pesan Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
