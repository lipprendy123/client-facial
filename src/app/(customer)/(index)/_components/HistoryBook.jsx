'use client'

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function HistoryBooking() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const token = sessionStorage.getItem("token"); // Ambil token dari sessionStorage

  useEffect(() => {
    const fetchBookingHistory = async () => {
      if (!token) {
        setError("You need to be logged in to view your booking history.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/history/booking', {
          headers: {
            Authorization: `Bearer ${token}`, // Sertakan token di header request
          },
        });
        
        if (response.data.success) {
          setBookingHistory(response.data.data);
        } else {
          setError('No booking history found.');
        }
      } catch (err) {
        setError('Failed to fetch booking history.');
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, [token]); // Re-fetch jika token berubah

  if (loading) {
    return (
      <div className="text-center p-10">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-10">
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-6xl p-4">
      <h2 className="text-2xl font-semibold mb-4">Booking History</h2>

      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
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
              <tr key={booking._id} className="border-b">
                <td className="py-3 px-4 text-sm text-gray-800">{booking.clientName}</td>
                <td className="py-3 px-4 text-sm text-gray-800">{booking.service.name}</td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  {new Date(booking.date).toLocaleDateString()}
                </td>
                <td className="py-3 px-4 text-sm text-gray-800">{booking.time}</td>
                <td className="py-3 px-4 text-sm text-gray-800">
                  <span
                    className={`${
                      booking.status === 'pending'
                        ? 'text-yellow-600'
                        : booking.status === 'completed'
                        ? 'text-green-600'
                        : 'text-red-600'
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
    </div>
  );
}
