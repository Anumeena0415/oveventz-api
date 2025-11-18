import React from "react";
import Login from "../components/Login";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center pb-8 sm:pb-12 md:pb-16 bg-gray-100 px-4" >
        <div className="w-full max-w-md">
          <Login />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginPage;

