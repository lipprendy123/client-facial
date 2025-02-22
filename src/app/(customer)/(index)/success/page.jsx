'use client'

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '../../../../components/ui/card';
import { Button } from '../../../../components/ui/button';
import { CheckCircle, Clock, Calendar, Home, Loader2 } from 'lucide-react';

const PaymentSuccessPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleReturnHome = async () => {
    setIsLoading(true);
    try {
      await router.push('/');
    } catch (error) {
      console.error('Navigation error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <Card className="max-w-md w-full mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-full max-w-[250px] mb-8">
              <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                <circle cx="200" cy="150" r="130" fill="#f0f9ff"/>
                <circle cx="200" cy="150" r="80" fill="#22c55e"/>
                <path d="M160 150 L190 180 L240 130" stroke="white" strokeWidth="12" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="100" cy="80" r="15" fill="#3b82f6" opacity="0.6"/>
                <circle cx="300" cy="100" r="10" fill="#f59e0b" opacity="0.6"/>
                <circle cx="280" cy="220" r="12" fill="#6366f1" opacity="0.6"/>
                <circle cx="120" cy="200" r="8" fill="#ec4899" opacity="0.6"/>
                <path d="M50 150 Q 70 130, 90 150" stroke="#3b82f6" strokeWidth="4" fill="none"/>
                <path d="M310 150 Q 330 170, 350 150" stroke="#f59e0b" strokeWidth="4" fill="none"/>
              </svg>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Booking Successful!
            </h1>
            
            <p className="text-gray-600 mb-8">
              Thank you for your booking. Your appointment has been confirmed.
            </p>

            {/* Booking Details */}
            <div className="w-full space-y-4 mb-8">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-green-700 font-medium">Payment Completed</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-500" />
                  <span className="text-blue-700 font-medium">Check your email for booking details</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-purple-500" />
                  <span className="text-purple-700 font-medium">We will contact you shortly</span>
                </div>
              </div>
            </div>

            {/* Action Button with Loading State */}
            <Button 
              onClick={handleReturnHome}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-all duration-200 ease-in-out"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Redirecting...</span>
                </>
              ) : (
                <>
                  <Home className="w-4 h-4" />
                  <span>Return to Home</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PaymentSuccessPage;