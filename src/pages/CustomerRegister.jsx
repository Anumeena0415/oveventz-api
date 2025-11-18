import React from "react";
import { useNavigate } from "react-router-dom";
import CustomerRegister from "../components/CustomerRegister";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CustomerRegisterPage = () => {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />
      <section className="relative w-full min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1600&q=80"
            alt="Background"
            className="w-full h-full object-cover blur-sm"
          />
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto">
          <div className="flex justify-center items-center">
            <CustomerRegister />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default CustomerRegisterPage;

