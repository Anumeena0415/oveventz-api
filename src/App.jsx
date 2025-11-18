import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import VendorAuth from "./pages/VendorAuth";
import VendorDashBoard from "./pages/VendorDashBoard"
import Register from "./components/VendorRegister/Register"
import EventPlanning from "./pages/EventPlanning";
import AIRecommendations from "./pages/AIRecommendations";
import Services from "./pages/Services";
import FileUploadTest from "./components/FileUploadTest";
import Admin from "./pages/Admin";
import VendorUsers from "./pages/VendorUsers";
import VendorUsersList from "./pages/VendorUsersList";
import AdminDashboard from "./pages/AdminDashboard";
import VendorDetails from "./components/VendorDetails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ThankYou from "./components/ThankYou";
import VendorProfile from "./components/VendorProfile";
import CustomerDashBoard from "./pages/customer/CustomerDashBoard";
import CustomerRegisterPage from "./pages/CustomerRegister";
import { VendorUserForm } from "./components/VendorUserForm";
import Forgotpassword from "./pages/ForgotPassword";
import Login from "./components/Login";
import LoginPage from "./pages/LoginPage";
import Blog from "./pages/Blog";
import AddBlog from "./pages/AddBlog";
import ManageBlogs from "./pages/ManageBlogs";
import Customer from "./components/Customers";
import HandleHome from "./pages/handleHome";
import HandleAllposts from "./pages/handleAllposts";
import AddServices from './pages/AddServices'
import ManageReviews from './pages/ManageReviews'
import ManageServices from './pages/ManageServices'
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

const adminPhone = "9220836393";


function App() {
  const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");

  return (
    <Router>
          <div className="fixed right-2 sm:right-4 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-end gap-2 sm:gap-3 lg:gap-4">
        {/* Phone Button */}
        <Link
          to={`tel:${adminPhone}`}
          className="group flex items-center bg-[#2563eb] hover:bg-[#1d4ed8]
 text-white rounded-lg shadow-md transition-all duration-300 overflow-hidden w-12 h-12 hover:w-auto hover:px-3 justify-center hover:justify-start"
          title="Call Admin"
        >
          {/* Phone Icon SVG */}
          <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          <span className="hidden group-hover:inline transition-all duration-300 text-sm ml-2 whitespace-nowrap">
            +91-9220836393
          </span>
        </Link>

        {/* WhatsApp Button */}
        <Link  
          to={`https://wa.me/9220836393?text=`}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition-all duration-300 overflow-hidden w-12 h-12 hover:w-auto hover:px-3 justify-center hover:justify-start"
          title="WhatsApp Admin"
        >

          <svg className="w-5 h-5 flex-shrink-0 fill-current" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
          </svg>
          <span className="hidden group-hover:inline transition-all duration-300 text-sm ml-2 whitespace-nowrap">
            +91-9220836393
          </span>
        </Link>
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/vendor-auth" element={<VendorAuth />} />
        <Route path="/:userId/vendor-dashboard" element={<VendorDashBoard />} />
        <Route path="/register" element={<Register />} />
        <Route path="/event-planning" element={<EventPlanning />} />
        <Route path="/services" element={<Services />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
        <Route path="/test-upload" element={<FileUploadTest />} />
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/vendors/:id" element={<ProtectedRoute requiredRole="admin"><VendorDetails /></ProtectedRoute>} />
        <Route path="/admin/vendor-users" element={<ProtectedRoute requiredRole="admin"><VendorUsersList /></ProtectedRoute>} />
        <Route path="/admin/vendor-users/:vendorId" element={<ProtectedRoute requiredRole="admin"><VendorUsers /></ProtectedRoute>} />
        <Route path="/add-blog" element={<ProtectedRoute requiredRole="admin"><AddBlog /></ProtectedRoute>} />
        <Route path="/manageBlogs" element={<ProtectedRoute requiredRole="admin"><ManageBlogs /></ProtectedRoute>} />
        <Route path="/AllCustomer" element={<ProtectedRoute requiredRole="admin"><Customer /></ProtectedRoute>} />
        <Route path="/handleHome" element={<ProtectedRoute requiredRole="admin"><HandleHome /></ProtectedRoute>} />
        <Route path="/handlePosts" element={<ProtectedRoute requiredRole="admin"><HandleAllposts /></ProtectedRoute>} />
        <Route path="/addService" element={<ProtectedRoute requiredRole="admin"><AddServices /></ProtectedRoute>} />
        <Route path="/manageReviews" element={<ProtectedRoute requiredRole="admin"><ManageReviews /></ProtectedRoute>} />
        <Route path="/manageServices" element={<ProtectedRoute requiredRole="admin"><ManageServices /></ProtectedRoute>} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/vendor-profile" element={<VendorProfile userId={authUser?.id} />} />
        <Route path="/vendor/:userId/profile" element={<VendorProfile />} />
        <Route path="/customer" element={<CustomerDashBoard />} />
        <Route path="/customer-dashboard" element={<CustomerDashBoard />} />
        <Route path="/register/customer" element={<CustomerRegisterPage />} />
        <Route path="/vendor-auth/forgot-password" element={<Forgotpassword />} />
        <Route path="/blog" element={<Blog/>}/> 
        <Route path="/Login" element={<LoginPage/>}/>
        <Route path="/thankYou" element={<ThankYou/> }/>
    
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick pauseOnFocusLoss draggable pauseOnHover theme="colored" />
    </Router>
  );
}

export default App;
