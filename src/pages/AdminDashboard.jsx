import React, {useState, useEffect} from "react";
import { Download, Calendar, Shield, DollarSign, Building2, Users, LogOut } from "lucide-react";
import AdminContent from "../components/AdminContent";
import Footer from "../components/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
  const [stats, setStats] = useState({
    totalRevenue: 0,
    activeVendors: 0,
    totalBookings: 0,
    totalUsers: 0,
    vendorStatus: {},
    monthlyRevenue: [],
    recentBookings: [],
    pendingPayouts: 0,
    processedPayouts: 0
  });
  const [loading, setLoading] = useState(true);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        const token = localStorage.getItem("authToken");
        
        const response = await axios.get(`${BASE_URL}/api/admin/dashboard/stats`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setLoading(false);
      }
    };

    if (authUser && authUser.role === "admin") {
      fetchStats();
    }
  }, [authUser]);

  // Check if user is admin
  useEffect(() => {
    if (!authUser || authUser.role !== "admin") {
      toast.error("Access denied. Admin role required.");
      // Always redirect to login page for unauthorized access
      navigate("/Login");
    }
  }, [authUser, navigate]);

  // Don't render if not admin
  if (!authUser || authUser.role !== "admin") {
    return null;
  }

  const handleClick = async () =>{
    navigate('/handleHome')    
  }
  const handleServices = async () =>{
    console.log("heyugsdyfsh")
    navigate('/addService')      
  }

  // Logout function
  const handleLogout = () => {
    // Remove all auth data from localStorage
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    
    // Show success message
    toast.success("Logged out successfully");
    
    // Redirect to login page
    navigate("/Login");
  }

  
  return (
    <div>
      <div className="bg-gray-50 min-h-screen p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <span className="bg-rose-100 text-rose-700 px-4 py-1 rounded-full text-sm font-medium inline-flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Admin Control Center
            </span>
            <h1 className="text-3xl font-bold mt-4">Oveventz Admin Dashboard</h1>
            <p className="text-gray-500 mt-1">
              Comprehensive platform management and analytics
            </p>
          </div>

          <div className="flex items-center gap-3 mt-4 md:mt-0">
        <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=>handleClick()}>Handle Home</button>
        <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=>handleServices()}>Add Services</button>
        <a className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" href="/add-blog">Add Blog</a>
        <a className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" href="/manageReviews">Manage Reviews</a>
            <button className="flex items-center gap-2 border border-gray-300 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100">
              <Download size={16} />
              Export Report
            </button>
            <button className="flex items-center gap-2 bg-gradient-to-r from-orange-400 to-green-600 px-4 py-2 rounded-lg text-white hover:opacity-90">
              {/* <span className="material-icons"></span> */}
              AI Insights
            </button>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white transition-all"
              title="Logout"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
          {/* Total Revenue */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Revenue</p>
              <h2 className="text-2xl font-bold">
                {loading ? "Loading..." : `₹${stats.totalRevenue.toLocaleString('en-IN')}`}
              </h2>
              <p className="text-green-600 text-sm"></p>
            </div>
            <div className="bg-orange-100 text-orange-500 rounded-xl p-3">
              <DollarSign />
            </div>
          </div>

          {/* Active Vendors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Active Vendors</p>
              <h2 className="text-2xl font-bold">
                {loading ? "Loading..." : stats.activeVendors}
              </h2>
              <p className="text-blue-600 text-sm"></p>
            </div>
            <div className="bg-blue-100 text-blue-500 rounded-xl p-3">
              <Building2 />
            </div>
          </div>

          {/* Total Bookings */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Total Bookings</p>
              <h2 className="text-2xl font-bold">
                {loading ? "Loading..." : stats.totalBookings}
              </h2>
              <p className="text-green-600 text-sm"></p>
            </div>
            <div className="bg-orange-100 text-orange-500 rounded-xl p-3">
              <Calendar />
            </div>
          </div>

          {/* Platform Users */}
          <div className="bg-white rounded-2xl p-6 shadow-sm flex justify-between items-center">
            <div>
              <p className="text-gray-500 text-sm">Platform Users</p>
              <h2 className="text-2xl font-bold">
                {loading ? "Loading..." : stats.totalUsers}
              </h2>
              <p className="text-blue-600 text-sm"></p>
            </div>
            <div className="bg-green-100 text-green-500 rounded-xl p-3">
              <Users />
            </div>
          </div>
        </div>
        <AdminContent stats={stats} loading={loading} />
      </div>
      <div>
      </div>
      <Footer />
    </div>
  );
}

