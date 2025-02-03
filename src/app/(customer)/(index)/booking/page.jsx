'use client'

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';

const BookingForm = ({ serviceId, serviceName, servicePrice }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    time: '',
    bookingType: ''
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:4000/api/bookings', {
        ...formData,
        service: serviceId
      });

      if (response.data.success) {
        // Redirect to confirmation page or show success message
        router.push('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Booking failed. Please try again.');
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-10">
      <CardHeader>
        <CardTitle>Booking for {serviceName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Full Name"
            required
          />
          <Input
            type="email"
            name="clientEmail"
            value={formData.clientEmail}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <Input
            type="tel"
            name="clientPhone"
            value={formData.clientPhone}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
          <Select 
            name="bookingType"
            value={formData.bookingType}
            onValueChange={(value) => setFormData(prev => ({...prev, bookingType: value}))}
            required
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Booking Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="home_calling">Home Calling</SelectItem>
              <SelectItem value="visit_to_clinic">In Clinic</SelectItem>
            </SelectContent>
          </Select>

          {error && <p className="text-red-500">{error}</p>}

          <Button 
            type="submit" 
            className="w-full"
            disabled={loading}
          >
            {loading ? 'Booking...' : `Book Now - Rp ${servicePrice?.toLocaleString() || 'N/A'}`}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default BookingForm;