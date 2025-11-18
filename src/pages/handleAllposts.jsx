import React, { useEffect, useState } from "react";
import axios from "axios";
import ServiceCard from "../components/ServiceCard";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

const handleAllposts = () => {
  const [services, setServices] = useState([]); // state to hold data
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const fetchServices = async () => {
    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await axios.get(`${BASE_URL}/api/eventplan/homeScreen`);
      console.log("Fetched data:", res.data.data);
      setServices(res.data.data); // save to state
    } catch (err) {
      console.error("Error fetching data:", err);
      if (err.response?.status === 404) alert("Route not found");
      else if (err.response?.status === 500) alert("Internal server error");
      else alert("Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleEdit = (postData) => {
    navigate('/handleHome', { state: { editData: postData } });
  };

  // Refresh data after edit/delete
  useEffect(() => {
    const handleFocus = () => {
      fetchServices();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  if (loading) {
    return <Loading message="Loading posts..." />;
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto ">
        {/* Header */}
         <button className="px-3 py-2 mb-4 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=> navigate(-1)}>Back</button>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.length > 0 ? (
            services.map((service, index) => (
              <ServiceCard 
                key={service._id || index} 
                {...service} 
                deleteButton={true} 
                onEdit={handleEdit}
                onDelete={fetchServices}
              />
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

export default handleAllposts;
