import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Quote from "../components/Quote"
import WhyChooseUs from "../components/WhyChooseUs";
import Login from "../components/Login"
import Footer from "../components/Footer"
// const adminPhone = ;
// const adminPhone = import.meta.env.VITE_PHONE;
const adminPhone = "9220836393";
import Logo from "../../public/oveBG.png"
import Navbar from "../components/Navbar";

const VendorReg = () => {
  const navigate = useNavigate();


  const features = [
    {
      icon: (
        <div className="text-global text-lg sm:text-xl lg:text-2xl">
          <div className="relative">
            <span className="text-xl sm:text-2xl lg:text-3xl">1</span>
          </div>
        </div>
      ),
      title: "Guaranteed Business Opportunities",
      description: (
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          <li>Get verified leads every month from high-value clients.</li>
          <li>
            Covers all categories including weddings, birthdays, anniversaries, corporate parties, exhibitions, and more.</li>
        </ul>
      ),
    },
    {
      icon: (
        <div className="text-global text-lg sm:text-xl lg:text-2xl">
          <div className="relative">
            <span className="text-xl sm:text-2xl lg:text-3xl">2</span>
          </div>
        </div>
      ),
      title: "Hassle-Free Vendor Experience",
      description: (
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          <li>
               Oveventz manages client communication, negotiations, and requirements for you.
          </li>
          <li>You just need to deliver your service - we handle the rest.
          </li>
        </ul>
      ),
    },
    {
      icon: (
        <div className="text-global text-lg sm:text-xl lg:text-2xl">
          <div className="relative">
            <span className="text-xl sm:text-2xl lg:text-3xl">3</span>
          </div>
        </div>
      ),
      title: "On-Time & Secure Payments",
      description: (
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          <li>Advance payment confirmation before booking.
          </li>
          <li>
            Secured, transparent, and time-bound payments through Oveventz.
          </li>
        </ul>
      ),
    },
    {
      icon: (
        <div className="text-global text-lg sm:text-xl lg:text-2xl">
          <div className="relative">
            <span className="text-xl sm:text-2xl lg:text-3xl">4</span>
          </div>
        </div>
      ),
      title: "Increased Online Visibility",
      description: (
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          <li>
            Listing your services on     Oveventz boosts your brand visibility across multiple cities.

          </li>
          <li>We manage your digital presence to enhance your business reach.
          </li>
        </ul>
      ),
    },
    {
      icon: (
        <div className="text-global text-lg sm:text-xl lg:text-2xl">
          <div className="relative">
            <span className="text-xl sm:text-2xl lg:text-3xl">5</span>
          </div>
        </div>
      ),
      title: "End-to-End Event Management",
      description: (
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          <li>You only need to deliver your service.
          </li>
          <li>
                Oveventz handles planning, coordination, execution, and ensures complete client satisfaction.

          </li>
        </ul>
      ),
    },
    {
      icon: (
        <div className="text-global text-lg sm:text-xl lg:text-2xl">
          <div className="relative">
            <span className="text-xl sm:text-2xl lg:text-3xl">6</span>
          </div>
        </div>
      ),
      title: "Zero Marketing Cost",
      description: (
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 text-sm sm:text-base">
          <li>No need to spend on advertising or marketing.
          </li>
          <li>We directly bring interested customers to you.</li>
        </ul>
      ),
    },
  ];

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 items-center">
            
            {/* Left Section - Marketing Content */}
            <div className="text-white w-full order-2 lg:order-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
                Grow Your Business with Oveventz! 🚀
              </h1>
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8 text-sm sm:text-base lg:text-lg">
                <li className="flex items-start gap-2">
                  <span className="text-[#E69B83] mt-1">•</span>
                  <span>Showcase your services on our fast-growing event marketplace.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E69B83] mt-1">•</span>
                  <span>Connect with thousands of customers looking for event services.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E69B83] mt-1">•</span>
                  <span>Get bookings for weddings, birthdays, corporate events, and more.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E69B83] mt-1">•</span>
                  <span>Join our network of trusted vendors and grow together with us!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#E69B83] mt-1">•</span>
                  <span>Be an Early Partner & Get Exclusive Benefits 🎉</span>
                </li>
              </ul>
              <button
                onClick={() => navigate("/register")}
                className="w-full sm:w-auto bg-[#E69B83] hover:shadow-md hover:shadow-[#c16a4d] hover:scale-105 hover:bg-[#c16a4d] font-semibold px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg rounded-lg transition-all hover:cursor-pointer"
              >
                Join as a Partner
              </button>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full order-1 lg:order-2">
              <Login />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <WhyChooseUs features={features} align="left" col="3" />

      <Quote
        text={`"Aapka Talent, Hamara Platform - Together, Let's Make Every Event Unforgettable!"`}
      />

      <Footer />



  

    </>
  );
};

export default VendorReg;

