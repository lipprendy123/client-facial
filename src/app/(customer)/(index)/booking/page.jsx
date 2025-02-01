'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

export default function BookingPage() {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get('serviceId');
  const serviceName = searchParams.get('serviceName');

  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    service: serviceId || '', // Auto-fill dari URL
    date: '',
    time: '',
    bookingType: 'home_calling',
  });

  const [message, setMessage] = useState('');

  useEffect(() => {
    if (serviceId) {
      setFormData((prev) => ({ ...prev, service: serviceId }));
    }
  }, [serviceId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/bookings', formData);
      setMessage('Booking successful!');
      setFormData({
        clientName: '',
        clientEmail: '',
        clientPhone: '',
        service: serviceId || '',
        date: '',
        time: '',
        bookingType: 'home_calling',
      });
    } catch (error) {
      setMessage('Booking failed. Please try again.');
      console.error('Error posting booking:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Buat Booking</h1>
        {serviceName && <p className="text-lg font-semibold mb-2">Layanan: {serviceName}</p>}
        {message && <p className="mb-4 text-green-600">{message}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" name="clientName" placeholder="Nama" className="w-full p-2 border rounded-md" value={formData.clientName} onChange={handleChange} required />
          <input type="email" name="clientEmail" placeholder="Email" className="w-full p-2 border rounded-md" value={formData.clientEmail} onChange={handleChange} required />
          <input type="text" name="clientPhone" placeholder="Nomor Telepon" className="w-full p-2 border rounded-md" value={formData.clientPhone} onChange={handleChange} required />
          
          <input type="hidden" name="service" value={formData.service} />
          
          <input type="date" name="date" className="w-full p-2 border rounded-md" value={formData.date} onChange={handleChange} required />
          <input type="time" name="time" className="w-full p-2 border rounded-md" value={formData.time} onChange={handleChange} required />

          <label className="block text-sm font-medium text-gray-700">Tipe Booking</label>
          <select name="bookingType" className="w-full p-2 border rounded-md" value={formData.bookingType} onChange={handleChange}>
            <option value="home_calling">Home Calling</option>
            <option value="visit_to_clinic">Visit to Clinic</option>
          </select>

          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Buat Booking</button>
        </form>
      </div>
    </div>
  );
}
