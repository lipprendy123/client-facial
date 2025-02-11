'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Swal from "sweetalert2";
import DashboardLayout from "../dashboardLayout";
import { ChevronLeft, ChevronRight, Edit, Trash2, Plus } from "lucide-react";
import { Card, CardContent } from "../../../../../components/ui/card";
import Link from "next/link";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndexes, setActiveImageIndexes] = useState({});

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await fetch("http://localhost:4000/api/services");
      const data = await res.json();
      setServices(data.data);
      const indexes = {};
      data.data.forEach(service => {
        indexes[service._id] = 0;
      });
      setActiveImageIndexes(indexes);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching services:", error);
      setLoading(false);
    }
  };

  const handleDelete = async (serviceId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await fetch(`http://localhost:4000/api/services/${serviceId}`, {
            method: "DELETE",
          });
  
          if (!res.ok) throw new Error("Failed to delete service");
  
          setServices((prevServices) =>
            prevServices.filter((service) => service._id !== serviceId)
          );
  
          Swal.fire("Deleted!", "Your service has been deleted.", "success");
        } catch (error) {
          console.error("Error deleting service:", error);
          Swal.fire("Error!", "Failed to delete service.", "error");
        }
      }
    });
  };

  const handleNextImage = (serviceId, imagesLength) => {
    setActiveImageIndexes(prev => ({
      ...prev,
      [serviceId]: (prev[serviceId] + 1) % imagesLength
    }));
  };

  const handlePrevImage = (serviceId, imagesLength) => {
    setActiveImageIndexes(prev => ({
      ...prev,
      [serviceId]: (prev[serviceId] - 1 + imagesLength) % imagesLength
    }));
  };

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-bold">Services Management</h1>
            <Link href='/dashboard/services/create' className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              <Plus size={20} />
              <span>Add Service</span>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {services.map((service) => (
                <Card key={service._id} className="overflow-hidden bg-white">
                  <div className="relative h-56">
                    {service.image && service.image.length > 0 && (
                      <>
                        <Image
                          src={`http://localhost:4000/public/images/${service.image[activeImageIndexes[service._id]]}`}
                          alt={service.name}
                          fill
                          className="object-cover"
                        />
                        {service.image.length > 1 && (
                          <div className="absolute inset-0 flex items-center justify-between p-2">
                            <button
                              onClick={() => handlePrevImage(service._id, service.image.length)}
                              className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                              <ChevronLeft size={24} />
                            </button>
                            <button
                              onClick={() => handleNextImage(service._id, service.image.length)}
                              className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                            >
                              <ChevronRight size={24} />
                            </button>
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/50 px-2 py-1 rounded text-white text-sm">
                          {activeImageIndexes[service._id] + 1} / {service.image.length}
                        </div>
                      </>
                    )}
                  </div>

                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h2 className="text-xl font-semibold">{service.name}</h2>
                      <div className="flex gap-2">
                        <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => handleDelete(service._id)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">{service.description}</p>

                    <div className="space-y-3">
                      <div className="text-sm text-gray-700">
                        <h3 className="font-semibold mb-1">Benefits:</h3>
                        <ul className="list-disc pl-4 space-y-1">
                          {service.benefits.map((benefit) => (
                            <li key={benefit._id}>{benefit.name}</li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center pt-3 border-t">
                        <span className="text-lg font-bold text-indigo-600">
                          Rp {service.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">
                          Duration: {service.duration} Hour(s)
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Services;
