"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

const BookingForm = () => {
  const { id } = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: "",
    clientEmail: "",
    clientPhone: "",
    date: "",
    time: "",
    bookingType: "home_calling",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:4000/api/bookings", {
        ...formData,
        service: id,
      });

      console.log("Booking success:", response.data);
      alert("Booking berhasil!");

      router.push("/"); // Redirect ke halaman utama atau halaman sukses
    } catch (error) {
      console.error("Booking error:", error);
      alert("Terjadi kesalahan saat booking.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Form Booking</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="clientName"
            placeholder="Nama"
            value={formData.clientName}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="email"
            name="clientEmail"
            placeholder="Email"
            value={formData.clientEmail}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="text"
            name="clientPhone"
            placeholder="Nomor Telepon"
            value={formData.clientPhone}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />
          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg"
          >
            <option value="home_calling">Home Calling</option>
            <option value="visit_to_clinic">Visit to Clinic</option>
          </select>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
