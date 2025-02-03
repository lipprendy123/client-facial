'use client'

import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const ServiceDetail = () => {
    const params = useParams();
    const id = params.id;
    const [service, setService] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:4000/api/services/${id}`)
                .then((response) => {
                    console.log("API Response:", response.data); // Debug
                    setService(response.data.data); // Perbaikan akses data
                    setLoading(false);
                })
                .catch((error) => {
                    console.error("API Error:", error);
                    setError(error.message);
                    setLoading(false);
                });
        }
    }, [id]);
    

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div className="text-red-600">Error: {error}</div>;
    }

    if (!service) {
        return <div>Data tidak ditemukan.</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 py-10">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                    src={`http://localhost:4000/public/images/${service.image}`} 
                    alt={service.name}
                    className="w-full h-64 object-cover"
                />
                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-800 mb-4">{service.name}</h1>
                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <span className="text-lg font-semibold text-gray-700">Harga:</span>
                            <span className="text-xl font-bold text-blue-600 ml-2">
                                Rp {service?.price?.toLocaleString() ?? "N/A"}
                            </span>
                        </div>
                        <div>
                            <span className="text-lg font-semibold text-gray-700">Durasi:</span>
                            <span className="text-xl font-bold text-blue-600 ml-2">{service.duration} jam</span>
                        </div>
                    </div>

                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Manfaat</h2>
                        <ul className="list-disc list-inside text-gray-600">
                            {service?.benefits?.length > 0 ? (
                                service.benefits.map((benefit) => (
                                    <li key={benefit._id} className="mb-2">
                                        {benefit.name}
                                    </li>
                                ))
                            ) : (
                                <li>Data manfaat tidak tersedia.</li>
                            )}
                        </ul>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
                        Pesan Sekarang
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
