'use client'

import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import BookingForm from "../../booking/page"; 

const ServiceDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id;
  
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk login status

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:4000/api/services/${id}`)
        .then((response) => {
          setService(response.data.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("API Error:", error);
          setError(error.message);
          setLoading(false);
        });
    }

    // Cek apakah ada token di sessionStorage
    const token = sessionStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [id]);

  const handleBookingClick = () => {
    if (!isAuthenticated) {
      Swal.fire({
        title: "Anda harus login terlebih dahulu!",
        text: "Silakan login untuk melakukan pemesanan.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Login",
        cancelButtonText: "Tetap di Sini",
      }).then((result) => {
        if (result.isConfirmed) {
          router.push("/sign-in"); // Arahkan ke halaman login
        }
      });
      return;
    }
    setShowBookingForm(!showBookingForm);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (!service) return <div>Data tidak ditemukan.</div>;

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 md:px-8 lg:px-12">
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          {/* Image Slider */}
          <div className="md:w-1/2 w-full relative">
            <Swiper navigation={true} modules={[Navigation]} className="w-full h-full">
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
                  <p className="text-gray-500">Gambar tidak tersedia</p>
                </div>
              )}
            </Swiper>
          </div>

          {/* Service Info */}
          <div className="md:w-1/2 w-full p-6 md:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4 md:text-4xl">{service.name}</h1>
              <p className="text-gray-600 mb-6 leading-relaxed md:text-lg">{service.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6 md:flex md:items-center md:justify-between">
                <div>
                  <span className="text-lg font-semibold text-gray-700">Harga:</span>
                  <span className="text-xl font-bold text-blue-600 ml-2">
                    Rp {service?.price?.toLocaleString() ?? "N/A"}
                  </span>
                </div>
                <div>
                  <span className="text-lg font-semibold text-gray-700">Durasi:</span>
                  <span className="text-xl font-bold text-blue-600 ml-2">
                    {service.duration} jam
                  </span>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 md:text-3xl">Manfaat</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-2 md:text-lg">
                  {service?.benefits?.length > 0 ? (
                    service.benefits.map((benefit) => <li key={benefit._id}>{benefit.name}</li>)
                  ) : (
                    <li>Data manfaat tidak tersedia.</li>
                  )}
                </ul>
              </div>
            </div>

            <button
              onClick={handleBookingClick}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 font-medium text-lg md:text-xl"
            >
              {showBookingForm ? 'Tutup Form Booking' : 'Pesan Sekarang'}
            </button>
          </div>
        </div>

        {/* Booking Form */}
        {showBookingForm && (
          <div className="p-6 bg-gray-50">
            <BookingForm 
              serviceId={service._id}
              serviceName={service.name}
              servicePrice={service.price}
            />
          </div>
        )}
      </div>  
    </div>
  );
};

export default ServiceDetail;
