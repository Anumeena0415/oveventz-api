import React from "react";
import { Link } from "react-router-dom";

const ThankYou = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-100 text-center p-6">
      <div className="bg-white shadow-lg rounded-2xl p-10 max-w-md">
        <h1 className="text-4xl font-bold text-[#E69B83] mb-4">Thank You!</h1>
        <p className="text-gray-700 mb-6">
          Your submission has been received successfully. Our team will contact you soon.!
        </p>
        <Link 
          to="/"
          className="inline-block bg-[#E69B83] hover:bg-[#e18f73] text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;


