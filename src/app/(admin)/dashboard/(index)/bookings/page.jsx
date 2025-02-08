'use client'

import { useState, useEffect } from "react";
import axios from "axios";
import DashboardLayout from "../dashboardLayout";

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [selectedBooking, setSelectedBooking] = useState(null);
    
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:4000/api/bookings");
            setBookings(response.data.data);
        } catch (error) {
            console.error("Error fetching bookings:", error);
        }
    };

    const handleDeleteBooking = async (id) => {
        if (!window.confirm("Are you sure you want to delete this booking?")) return;
        
        try {
            await axios.delete(`http://localhost:4000/api/bookings/${id}`);
            setBookings(bookings.filter((booking) => booking._id !== id));
            if (selectedBooking && selectedBooking._id === id) {
                setSelectedBooking(null);
            }
        } catch (error) {
            console.error("Error deleting booking:", error);
        }
    };

    return (
       <DashboardLayout>
           <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Bookings</h2>
            <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-2">Client Name</th>
                            <th className="border p-2">Email</th>
                            <th className="border p-2">Phone</th>
                            <th className="border p-2">Service</th>
                            <th className="border p-2">Date</th>
                            <th className="border p-2">Time</th>
                            <th className="border p-2">Booking Type</th>
                            <th className="border p-2">Status</th>
                            <th className="border p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking._id} className="border">
                                <td className="border p-2">{booking.clientName}</td>
                                <td className="border p-2">{booking.clientEmail}</td>
                                <td className="border p-2">{booking.clientPhone}</td>
                                <td className="border p-2">{booking.service ? booking.service.name : "-"}</td>
                                <td className="border p-2">{new Date(booking.date).toLocaleDateString()}</td>
                                <td className="border p-2">{booking.time}</td>
                                <td className="border p-2">{booking.bookingType}</td>
                                <td className="border p-2">{booking.status}</td>
                                <td className="border p-2">
                                    <button
                                        onClick={() => setSelectedBooking(booking)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mr-2"
                                    >
                                        Details
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBooking(booking._id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedBooking && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-1/3">
                        <h3 className="text-xl font-bold mb-2">Booking Details</h3>
                        <p><strong>ID:</strong> {selectedBooking._id}</p>
                        <p><strong>Client:</strong> {selectedBooking.clientName}</p>
                        <p><strong>Email:</strong> {selectedBooking.clientEmail}</p>
                        <p><strong>Phone:</strong> {selectedBooking.clientPhone}</p>
                        <p><strong>Service:</strong> {selectedBooking.service ? selectedBooking.service.name : "-"}</p>
                        <p><strong>Date:</strong> {new Date(selectedBooking.date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {selectedBooking.time}</p>
                        <p><strong>Booking Type:</strong> {selectedBooking.bookingType}</p>
                        <p><strong>Status:</strong> {selectedBooking.status}</p>
                        <div className="flex gap-4 mt-4">
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                            >
                                Close
                            </button>
                            <button
                                onClick={() => handleDeleteBooking(selectedBooking._id)}
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
       </DashboardLayout>
    );
};

export default BookingsPage;
