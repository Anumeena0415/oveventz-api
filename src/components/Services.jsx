import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "./ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]); // state to hold data
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const BASE_URL = 
          import.meta.env.VITE_BACKEND_URL || 
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? "http://localhost:3000" 
            : "https://ovevents.onrender.com");
        const res = await axios.get(`${BASE_URL}/api/eventplan/homeScreen`);
        console.log("Fetched data:", res.data.data);
        setServices(res.data.data); 
      } catch (err) {
        console.error("Error fetching data:", err);
        if (err.response?.status === 404) alert("Route not found");
        else if (err.response?.status === 500) alert("Internal server error");
        else alert("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading services...</p>;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <span className="bg-orange-50 text-global px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base lg:text-lg font-medium">
            ✨ Premium Services
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6 lg:mt-8">
            Curated Event Experiences
          </h2>
          <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Every service is handpicked and managed by Oveventz to ensure
            exceptional quality and seamless execution.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ServiceCard key={index} {...service} />
            ))
          ) : (
            <p className="col-span-3 text-center text-gray-400">
              No services available.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Services;
