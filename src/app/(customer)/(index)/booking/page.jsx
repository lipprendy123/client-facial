'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../../../../components/ui/card';
import { Input } from '../../../../components/ui/input';
import { Button } from '../../../../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../../components/ui/select';
import { Loader2, Calendar, Clock, Phone, Mail, User, MapPin, Home } from 'lucide-react';
import { Alert, AlertDescription } from '../../../../components/ui/alert';
import { Textarea } from '../../../../components/ui/textarea';

const BookingForm = ({ serviceId, serviceName, servicePrice }) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    clientName: '',
    clientEmail: '',
    clientPhone: '',
    date: '',
    time: '',
    bookingType: '',
    address: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validation, setValidation] = useState({});

  const validateForm = () => {
    const errors = {};
    const phoneRegex = /^[0-9]{10,13}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const today = new Date();
    const selectedDate = new Date(formData.date);

    if (!formData.clientName.trim()) {
      errors.clientName = 'Name is required';
    }

    if (!emailRegex.test(formData.clientEmail)) {
      errors.clientEmail = 'Valid email is required';
    }

    if (!phoneRegex.test(formData.clientPhone)) {
      errors.clientPhone = 'Valid phone number is required (10-13 digits)';
    }

    if (!formData.date) {
      errors.date = 'Date is required';
    } else if (selectedDate < today) {
      errors.date = 'Date cannot be in the past';
    }

    if (!formData.time) {
      errors.time = 'Time is required';
    }

    if (!formData.bookingType) {
      errors.bookingType = 'Booking type is required';
    }

    // Only validate address if booking type is home_calling
    if (formData.bookingType === 'home_calling' && !formData.address.trim()) {
      errors.address = 'Address is required for home visits';
    }

    setValidation(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    // Clear validation error when user starts typing
    if (validation[name]) {
      setValidation(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) {
        return;
    }

    setLoading(true);
    const token = sessionStorage.getItem('token');

    if (!token) {
        setError("Please login to continue booking");
        setLoading(false);
        return;
    }

    try {
        // Langkah 1: Buat booking
        const bookingResponse = await axios.post(
            'http://localhost:4000/api/bookings',
            { ...formData, service: serviceId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        );

        if (bookingResponse.data.success) {
            const booking = bookingResponse.data.data; // Asumsikan data booking dikembalikan

            // Langkah 2: Kirim data booking ke endpoint pembayaran
            const paymentResponse = await axios.post(
              'http://localhost:4000/api/payment/create-transaction', // Endpoint pembayaran
                 console.log("Data yang dikirim ke pembayaran:",
                {
                    order_id: `ORDER-${booking._id}`,
                    gross_amount: servicePrice,
                    customer_details: {
                        first_name: booking.clientName,
                        email: booking.clientEmail,
                        phone: booking.clientPhone,
                    },
                },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            ));

            // Langkah 3: Tangani respons pembayaran
            if (paymentResponse.data.redirect_url) {
                window.location.href = paymentResponse.data.redirect_url; // Redirect ke Midtrans
            } else {
                setError('Payment initiation failed. Redirect URL not received.');
            }
        }
    } catch (err) {
        setError(err.response?.data?.message || 'Booking or Payment failed. Please try again.');
    } finally {
        setLoading(false);
    }
};

  

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-xl mx-auto">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold text-center text-gray-900">
            Book Your Appointment
          </CardTitle>
          <CardDescription className="text-center text-gray-600">
            {serviceName} - Rp {servicePrice?.toLocaleString() || 'N/A'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {(error || success) && (
            <Alert className={`mb-4 ${error ? 'bg-red-50 border-red-400' : 'bg-green-50 border-green-400'}`}>
              <AlertDescription className={error ? 'text-red-800' : 'text-green-800'}>
                {error || success}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="text"
                  name="clientName"
                  value={formData.clientName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className={`pl-10 ${validation.clientName ? 'border-red-500' : ''}`}
                />
              </div>
              {validation.clientName && (
                <p className="text-red-500 text-sm">{validation.clientName}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="email"
                  name="clientEmail"
                  value={formData.clientEmail}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className={`pl-10 ${validation.clientEmail ? 'border-red-500' : ''}`}
                />
              </div>
              {validation.clientEmail && (
                <p className="text-red-500 text-sm">{validation.clientEmail}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  type="tel"
                  name="clientPhone"
                  value={formData.clientPhone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className={`pl-10 ${validation.clientPhone ? 'border-red-500' : ''}`}
                />
              </div>
              {validation.clientPhone && (
                <p className="text-red-500 text-sm">{validation.clientPhone}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`pl-10 ${validation.date ? 'border-red-500' : ''}`}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                {validation.date && (
                  <p className="text-red-500 text-sm">{validation.date}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    className={`pl-10 ${validation.time ? 'border-red-500' : ''}`}
                  />
                </div>
                {validation.time && (
                  <p className="text-red-500 text-sm">{validation.time}</p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Select
                  name="bookingType"
                  value={formData.bookingType}
                  onValueChange={(value) => {
                    setFormData(prev => ({...prev, bookingType: value}));
                    if (validation.bookingType) {
                      setValidation(prev => ({ ...prev, bookingType: '' }));
                    }
                  }}
                >
                  <SelectTrigger className={`pl-10 ${validation.bookingType ? 'border-red-500' : ''}`}>
                    <SelectValue placeholder="Select Booking Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="home_calling">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        Home Calling
                      </span>
                    </SelectItem>
                    <SelectItem value="visit_to_clinic">
                      <span className="flex items-center gap-2">
                        <MapPin size={16} />
                        In Clinic
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {validation.bookingType && (
                <p className="text-red-500 text-sm">{validation.bookingType}</p>
              )}
            </div>

            {/* Address field - only show when home_calling is selected */}
            {formData.bookingType === 'home_calling' && (
              <div className="space-y-2">
                <div className="relative">
                  <Home className="absolute left-3 top-7 transform -translate-y-1/2 text-gray-400" size={18} />
                  <Textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Your Full Address"
                    className={`pl-10 pt-2 min-h-[100px] ${validation.address ? 'border-red-500' : ''}`}
                  />
                </div>
                {validation.address && (
                  <p className="text-red-500 text-sm">{validation.address}</p>
                )}
              </div>
            )}

            <Button
              type="submit"
              className="w-full h-11 relative bg-blue-500 text-white"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  Processing...
                </span>
              ) : (
                `Book Now - Rp ${servicePrice?.toLocaleString() || 'N/A'}`
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookingForm;