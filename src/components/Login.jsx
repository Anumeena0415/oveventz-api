// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";
// import ShowHideButton from "./ShowHideButton";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";

//   const validate = () => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email || !password) {
//       toast.error("Email and password are required");
//       return false;
//     }
//     if (!emailRegex.test(email)) {
//       toast.error("Please enter a valid email address");
//       return false;
//     }
//     if (password.length < 6) {
//       toast.error("Password must be at least 6 characters");
//       return false;
//     }
//     return true;
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       setIsLoading(true);
//       const response = await fetch(`${BASE_URL}/api/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: email.trim(), password: password.trim() }),
//       });

//       const result = await response.json();

//       if (!response.ok || !result?.success) {
//         const message = result?.message || "Login failed";
//         toast.error(message);
//         return;
//       }

//       const token = result.data?.token;
//       const user = result.data?.user;
//       if (!token || !user) {
//         toast.error("Invalid server response");
//         return;
//       }

//       localStorage.setItem("authToken", token);
//       localStorage.setItem("authUser", JSON.stringify(user));

//       toast.success("Login successful");
//       const vendorId = user.vendor_id || user.id;
//       if (!vendorId) {
//         navigate("/vendor");
//         return;
//       }
//       navigate(`/${vendorId}/vendor-dashboard`);
//     } catch (err) {
//       toast.error("Unable to login. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white outline-2 outline-[#E69B83] shadow-xl shadow-[#E69B83] rounded-2xl p-6 sm:p-8 md:p-12 w-full max-w-md mx-auto">
//       <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-global-gradient mb-6 text-center">
//         Business Login
//       </h2>

//       <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
//         {/* Email */}
//         <div>
//           <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
//             Email
//           </label>
//           <input
//             type="email"
//             placeholder="Enter your email"
//             required
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
//           />
//         </div>

//         {/* Password */}
//         <div>
//           <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
//             Password
//           </label>
//           <div className="relative w-full">
//             <input
//               required
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
//             />
//             <ShowHideButton
//               show={showPassword}
//               onToggle={() => setShowPassword(!showPassword)}
//             />
//           </div>
//         </div>

//         {/* Submit */}
//         <button
//           type="submit"
//           disabled={isLoading}
//           className={`w-full text-lg sm:text-xl bg-[#E69B83] text-white font-semibold p-2 sm:p-3 rounded-lg transition-all hover:shadow-md hover:shadow-[#E69B83] hover:bg-[#c16a4d] hover:cursor-pointer ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
//         >
//           {isLoading ? "Logging in..." : "Login"}
//         </button>
//       </form>

//       <p className="mt-3 sm:mt-4 text-center text-gray-600 text-sm sm:text-base hover:text-global-gradient">
//         <button
//           type="button"
//           onClick={() => {
//             const emailValue = (email || "").trim().toLowerCase();
//             if (!emailValue) {
//               toast.error("Enter your email first");
//               return;
//             }
//             navigate(`/vendor-auth/forgot-password/${emailValue}`);
//           }}
//           className="underline text-blue-600 hover:text-blue-700"
//         >
//           Forgot password?
//         </button>
//       </p>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ShowHideButton from "./ShowHideButton";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !password) {
      toast.error("Email and password are required");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email.trim(), password: password.trim() }),
      });

      const result = await response.json();

      if (!response.ok || !result?.success) {
        const message = result?.message || "Login failed";
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

      toast.success("Login successful");
      console.log("result", result);
      
      // Redirect based on user role
      const userRole = user.role;
      const userId = user.id;
      
      if (userRole === "admin") {
        // Admin redirects to admin dashboard
        navigate("/admin");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      } else if (userRole === "vendor") {
        // Vendor redirects to vendor dashboard
        if (userId) {
          navigate(`/${userId}/vendor-dashboard`);
        } else {
          navigate("/vendor");
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      } else if (userRole === "customer") {
        // Customer redirects to customer dashboard
        navigate("/customer-dashboard");
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      } else {
        // Default redirect
        navigate("/");
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      toast.error("Unable to login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white outline-2 outline-[#E69B83] shadow-xl shadow-[#E69B83] rounded-2xl p-6 sm:p-8 md:p-12 w-full max-w-md mx-auto  ">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-global-gradient mb-6 text-center">
        Business Login
      </h2>

      <form className="space-y-4 sm:space-y-5" onSubmit={handleLogin}>
        {/* Email */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Email
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-base sm:text-lg md:text-xl text-black font-semibold mb-1">
            Password
          </label>
          <div className="relative w-full">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 sm:p-3 outline-1 rounded-lg focus:outline-2 focus:outline-[#E69B83] text-sm sm:text-base"
            />
            <ShowHideButton
              show={showPassword}
              onToggle={() => setShowPassword(!showPassword)}
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full text-lg sm:text-xl bg-[#E69B83] text-white font-semibold p-2 sm:p-3 rounded-lg transition-all hover:shadow-md hover:shadow-[#E69B83] hover:bg-[#c16a4d] hover:cursor-pointer ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-3 sm:mt-4 space-y-2">
        <p className="text-center text-gray-600 text-sm sm:text-base">
          <button
            type="button"
            onClick={() => navigate("/vendor-auth/forgot-password")}
            className="hover:cursor-pointer hover:text-[#c16a4d]"
          >
            Forgot password ?
          </button>
        </p>
        <p className="text-center text-gray-600 text-sm sm:text-base">
          <button
            type="button"
            onClick={() => navigate("/register/customer")}
            className="text-[#E69B83] hover:text-[#c16a4d] font-semibold underline"
          >
            Register as a Customer
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
