"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function HistoryBooking() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (!token) {
        setError("You need to be logged in to view your booking history.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("http://localhost:4000/api/history/booking", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setBookingHistory(response.data.data);
        } else {
          setError("No booking history found.");
        }
      } catch (err) {
        setError("Failed to fetch booking history.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [token]);

  return (
    <div className="container mx-auto max-w-6xl p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Booking History</h2>

      {/* Tombol Back to Home */}
      <div className="mb-6 text-center">
        <button
          onClick={() => router.push("/")}
          className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* Jika Masih Loading */}
      {loading && (
        <div className="text-center">
          <p className="text-gray-600 text-lg">Loading your booking history...</p>
        </div>
      )}

      {/* Jika Ada Error */}
      {error && (
        <div className="text-center">
          <p className="text-red-600 text-lg">{error}</p>
        </div>
      )}

      {/* Jika Tidak Ada Data */}
      {!loading && !error && bookingHistory.length === 0 && (
        <div className="text-center">
          <p className="text-gray-500 text-lg">You have no booking history.</p>
        </div>
      )}

      {/* Jika Data Ada */}
      {!loading && !error && bookingHistory.length > 0 && (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-200">
            <thead className="bg-blue-100">
              <tr>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Client Name</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Service</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Date</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Time</th>
                <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {bookingHistory.map((booking) => (
                <tr key={booking._id} className="border-b hover:bg-gray-50 transition">
                  <td className="py-3 px-4 text-sm text-gray-800">{booking.clientName}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">{booking.service.name}</td>
                  <td className="py-3 px-4 text-sm text-gray-800">
                    {new Date(booking.date).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-800">{booking.time}</td>
                  <td className="py-3 px-4 text-sm font-semibold">
                    <span
                      className={`px-3 py-1 rounded-full text-xs ${
                        booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : booking.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
