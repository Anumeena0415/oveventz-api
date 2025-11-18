import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Card = ({ image, title, description, price, rating , _id,category , deleteTrue} ) => {
  const navigate = useNavigate();
  const BASE_URL = 
    import.meta.env.VITE_BACKEND_URL || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? "http://localhost:3000" 
      : "https://ovevents.onrender.com");
  
  const handleBookNow = () =>{
    navigate('/event-planning');
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  }
  const handleDeleteNow = async() =>{
    const data = await axios.delete(`${BASE_URL}/api/eventplan/deleteSeervices/${_id}`)
  }

  // Handle different image URL formats
  const getImageSrc = () => {
    if (!image) return '';
    if (image.startsWith('data:image/')) return image;
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    if (image.startsWith('/uploads/')) return `${BASE_URL}${image}`;
    if (image.startsWith('uploads/')) return `${BASE_URL}/${image}`;
    return `${BASE_URL}/${image}`;
  };

  return (
    <div className="bg-white shadow rounded-2xl overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div onClick={()=> console.log("iddd", _id)} className="relative">
        <img
          src={getImageSrc()}
          alt={title}
          className="w-full h-40 sm:h-48 md:h-56 object-cover"
          onError={(e) => {
            console.error("Image load error for service:", title, "Image URL:", image);
            e.target.style.display = 'none';
          }}
        />
        <span className="absolute top-2 left-2 bg-orange-200 text-orange-800 px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-medium rounded-full">
          Oveventz Premium
        </span>
        <span className="absolute top-2 right-2 bg-white text-yellow-500 px-2 py-1 rounded-full text-xs sm:text-sm font-medium shadow">
          ⭐ {rating}
        </span>
      </div>

      {/* Content */}
      <div className="p-3 sm:p-4">
        <h3 className="font-semibold text-base sm:text-lg">{category}</h3>
        <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">
          {description}
        </p>

        <div className="mt-2 sm:mt-3">
          <p className="text-orange-600 font-bold text-sm sm:text-base">
            ₹{price}
          </p>
          <p className="text-[10px] sm:text-xs text-gray-500">
            Starting price
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mt-3 sm:mt-4">
          <button className="text-orange-600 text-xs sm:text-sm hover:underline">
            View Details
          </button>

          {/* <button className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-xs sm:text-sm">
            Book Now
          </button> */}


          {/* Book Now Button with onClick */}
         
         {deleteTrue ? <button
            onClick={()=>handleDeleteNow()}
            className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-xs sm:text-sm"
          >
            Delete
          </button>:  <button
            onClick={()=>handleBookNow()}
            className="bg-gradient-to-r from-orange-500 to-green-600 text-white px-3 sm:px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-xs sm:text-sm"
          >
            Book Now
          </button>}

        </div>
      </div>
    </div>
  );
};

export default Card;
