import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { toast } from "react-toastify";
import logo from "../assets/oveBG.png";

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = localStorage.getItem("authUser");

    if (token && user) {
      const parsedUser = JSON.parse(user);
      setUserId(parsedUser.id);
      setUserRole(parsedUser.role);
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      setUserId(null);
      setUserRole(null);
    }
  }, [location]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate("/vendor-auth");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">





          {/* Logo */}
          <div onClick={()=>{navigate('/');window.scrollTo({ top: 0, behavior: "smooth" });}} className="flex items-center gap-2 cursor-pointer">
            <img src={logo} alt="Logo" className="w-30 h-30 object-contain" />

            {/* <span className="font-bold text-gray-800 text-lg sm:text-xl">
              OccasionSuper
            </span> */}
          </div>







          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-gray-700 font-medium">
            <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/services"
              className={`hover-global hover:text-shadow hover:scale-110 transition-all ease-linear text-sm lg:text-lg
                ${location.pathname === "/services" ? "border-b-2 border-[#E69B83]" : ""}`}
            >
              Services
            </Link>

            <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/event-planning"
              className={`hover-global hover:text-shadow hover:scale-110 transition-all ease-linear text-sm lg:text-lg
                ${location.pathname === "/event-planning" ? "border-b-2 border-[#E69B83]" : ""}`}
            >
              Event Planner
            </Link>

            <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
              to="/blog"
              className={`hover-global hover:text-shadow hover:scale-110 transition-all ease-linear text-sm lg:text-lg
                ${location.pathname === "/blog" ? "border-b-2 border-[#E69B83]" : ""}`}
            >
              Blog
            </Link>

            {userRole === "customer" ? (
              <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
                to="/customer-dashboard"
                className={`hover-global hover:text-shadow hover:scale-110 transition-all ease-linear text-sm lg:text-lg
                  ${location.pathname === "/customer-dashboard" || location.pathname === "/customer" ? "border-b-2 border-[#E69B83]" : ""}`}
              >
                Customer Portal
              </Link>
            ) : (
              <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
                to={isLoggedIn && userId ? `/${userId}/vendor-dashboard` : "/vendor-auth"}
                className={`hover-global hover:text-shadow hover:scale-110 transition-all ease-linear text-sm lg:text-lg
                  ${(location.pathname === "/vendor-auth" || location.pathname === `/${userId}/vendor-dashboard`) ? "border-b-2 border-[#E69B83]" : ""}`}
              >
                Vendor Portal
              </Link>
            )}
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center gap-3">
            {isLoggedIn && userId && userRole !== "customer" && (
              <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
                to={`/vendor/${userId}/profile`}
                className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base border border-[#E69B83] text-[#E69B83] rounded-lg hover:bg-[#E69B83] hover:text-white transition-all hover:shadow-lg hover:shadow-[#E69B83] ease-linear"
              >
                Profile
              </Link>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base border border-[#E69B83] text-[#E69B83] rounded-lg hover:bg-[#E69B83] hover:text-white transition-all hover:shadow-lg hover:shadow-[#E69B83] ease-linear"
              >
                Logout
              </button>
            ) : (
              <Link onClick={()=>window.scrollTo({ top: 0, behavior: "smooth" })}
                to="/vendor-auth"
                className="px-3 lg:px-4 py-1 lg:py-2 text-sm lg:text-base border border-[#E69B83] text-[#E69B83] rounded-lg hover:bg-[#E69B83] hover:text-white transition-all hover:shadow-lg hover:shadow-[#E69B83] ease-linear"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-[#E69B83] transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-gray-200">
              <Link
                to="/services"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#E69B83] hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() =>{ setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" })}}
              >
                Services
              </Link>

              <Link
                to="/event-planning"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#E69B83] hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => {setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" });}}
              >
                Event Planner
              </Link>

              <Link
                to="/blog"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#E69B83] hover:bg-gray-50 rounded-md transition-colors duration-200"
                onClick={() => {setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" });}}
              >
                Blog
              </Link>

              {userRole === "customer" ? (
                <Link
                  to="/customer-dashboard"
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#E69B83] hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => {setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" });}}
                >
                  Customer Portal
                </Link>
              ) : (
                <Link
                  to={isLoggedIn && userId ? `/${userId}/vendor-dashboard` : "/vendor-auth"}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-[#E69B83] hover:bg-gray-50 rounded-md transition-colors duration-200"
                  onClick={() => {setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" });}}
                >
                  Vendor Portal
                </Link>
              )}

              {isLoggedIn && userId && userRole !== "customer" && (
                <Link
                  to={`/vendor/${userId}/profile`}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-[#E69B83] hover:bg-[#E69B83] hover:text-white rounded-md transition-colors duration-200"
                  onClick={() => {setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" });}}
                >
                  Profile
                </Link>
              )}

              {isLoggedIn ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full text-left block px-3 py-2 text-base font-medium text-[#E69B83] hover:bg-[#E69B83] hover:text-white rounded-md transition-colors duration-200"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/vendor-auth"
                  className="w-full text-left block px-3 py-2 text-base font-medium text-[#E69B83] hover:bg-[#E69B83] hover:text-white rounded-md transition-colors duration-200"
                  onClick={() => {setIsMenuOpen(false);window.scrollTo({ top: 0, behavior: "smooth" })}}
                >
                  Login
                </Link>
              )}

            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
