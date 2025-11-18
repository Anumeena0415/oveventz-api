import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShowHideButton from "./ShowHideButton";

const CustomerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = 
    import.meta.env.VITE_BACKEND_URL || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? "http://localhost:3000" 
      : "https://ovevents.onrender.com");

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (formData.name.length < 2) {
      toast.error("Name must be at least 2 characters");
      return false;
    }

    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.phone_number && !phoneRegex.test(formData.phone_number)) {
      toast.error("Please enter a valid 10-digit phone number");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/register/customer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email.trim(),
          password: formData.password.trim(),
          name: formData.name.trim(),
          phone_number: formData.phone_number.trim() || null,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        const message = result?.message || "Registration failed";
        toast.error(message);
        return;
      }

      const token = result.data?.token;
      const user = result.data?.user;
      if (!token || !user) {
        toast.error("Invalid server response");
        return;
      }

      localStorage.setItem("authToken", token);
      localStorage.setItem("authUser", JSON.stringify(user));

      toast.success("Registration successful! Welcome to Oveventz!");
      
      // Redirect to customer dashboard
      navigate("/customer-dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Unable to register. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="bg-white outline-2 outline-[#E69B83] shadow-xl shadow-[#E69B83] rounded-2xl p-6 sm:p-8 md:p-12 w-full max-w-md mx-auto">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-global-gradient mb-6 text-center">
        Customer Registration
      </h2>

      <form className="space-y-4 sm:space-y-5" onSubmit={handleSubmit}>
        {/* Name */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            name="phone_number"
            placeholder="Enter your 10-digit phone number"
            value={formData.phone_number}
            onChange={handleChange}
            maxLength={10}
            className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password (min 6 characters)"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
            />
            <ShowHideButton
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Confirm Password <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full">
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
            />
            <ShowHideButton
              show={showConfirmPassword}
              onToggle={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-lg sm:text-xl bg-[#E69B83] text-white font-semibold p-2 sm:p-3 rounded-lg transition-all hover:shadow-md hover:shadow-[#E69B83] hover:bg-[#c16a4d] hover:cursor-pointer ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Creating Account..." : "Create Account"}
        </button>
      </form>

      <p className="mt-3 sm:mt-4 text-center text-gray-600 text-sm sm:text-base">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/vendor-auth")}
          className="text-[#E69B83] hover:text-[#c16a4d] font-semibold underline"
        >
          Login
        </button>
      </p>
    </div>
  );
};

export default CustomerRegister;

