import React, { useState, useEffect } from "react";
import { CheckCircle, Shield } from "lucide-react";
import Card from "../components/Card";
import SearchBar from "../components/SearchBar";
import GetStarted from "../components/GetStarted";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Loading from "../components/Loading";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";


const Services = () => {
  const [price, setPrice] = useState(0);
  const [selected, setSelected] = useState("All Services");
  const [sortOrder, setSortOrder] = useState("");
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const deleteTrue = location.state?.deleteTrue; 
  const searchCategory = location.state?.category;
  const searchLocation = location.state?.location;

  const categories = [
    "All Services",
    "Weddings",
    "Birthday",
    "Corporate",
    "Anniversary",
    "Baby Shower",
    "Theme Parties",
  ];
  
  // Auto-select category from search
  useEffect(() => {
    if (searchCategory && categories.includes(searchCategory)) {
      setSelected(searchCategory);
    }
  }, [searchCategory]);
  
  console.log("deletruee", deleteTrue);

  //  Fetch data after component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const BASE_URL = 
          import.meta.env.VITE_BACKEND_URL || 
          (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
            ? "http://localhost:3000" 
            : "https://ovevents.onrender.com");
        const { data } = await axios.get(`${BASE_URL}/api/eventplan/getAllServices`);
        console.log("data", data.data);
        
        setServices(data.data);
         // adjust based on your backend response
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const Navigate = useNavigate()

  if (loading) {
    return <Loading message="Loading services..." />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
        {deleteTrue ? <button className="px-3 py-2 mx-10 my-10 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=>Navigate(-1)}>Back</button> : <>
      <Navbar />

      {/* Header */}
      <div className="text-center mb-10 px-4 py-6">
        <div className="inline-block bg-orange-50 text-orange-600 px-4 py-2 rounded-full font-medium mb-3 shadow-sm">
          👑 Premium Services
        </div>
        <h1 className="text-4xl font-extrabold text-gray-800">Oveventz Services</h1>
        <p className="text-gray-600 mt-4 max-w-3xl mx-auto">
          Discover our complete range of premium event services, all managed by{" "}
          <span className="font-medium">Oveventz</span>.
        </p>

        <div className="w-full sm:w-3/4 lg:w-2/3 mx-auto mt-8">
          <SearchBar locationPlaceholder="Search by location..." />
        </div>
      </div> </>}

      {/* Layout */}
      <div className="px-6 pb-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
       {deleteTrue ? "" : <div className="flex flex-col gap-6">
          {/* Categories */}
          <div className="bg-white shadow rounded-2xl p-5">
            <h2 className="font-bold text-xl mb-3">Categories</h2>
            <ul className="space-y-3 text-gray-700 font-semibold">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`cursor-pointer ${
                    selected === category
                      ? "text-global rounded-xl px-2 py-1 bg-[#efe3df]"
                      : "hover:text-orange-600"
                  }`}
                  onClick={() => setSelected(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
          </div>

          {/* Price Range */}
          <div className="bg-white shadow rounded-2xl p-5">
            <div className="flex justify-between mb-3">
              <h2 className="font-semibold text-lg">Price Range</h2>
              <span className="text-gray-700 font-medium">₹{price.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="0"
              max="500000"
              step={5000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
              className="w-full accent-[#c16a4d]"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>₹0</span>
              <span>₹500000</span>
            </div>
          </div>

          {/* Sort */}
          <div className="bg-white shadow rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-3">Sort By</h2>
            <select
              className="w-full rounded-lg p-3 text-base outline-2 outline-[#E69B83]"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="">Most Popular</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>

          {/* Guarantee */}
          <div className="bg-white shadow rounded-2xl p-5">
            <h2 className="font-semibold text-lg mb-3 flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-600" />
              Oveventz Guarantee
            </h2>
            <ul className="text-sm text-gray-600 space-y-2">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> Quality assured services
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> Transparent pricing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> 24/7 support
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-green-600" /> Money-back guarantee
              </li>
            </ul>
          </div>
        </div>}

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {services 
              .filter((service) => {
                const matchesCategory =
                  selected === "All Services" || service.category === selected;
                const matchesPrice = price === 0 || service.price <= price;
                return matchesCategory && matchesPrice;
              })
              .sort((a, b) => {
                if (sortOrder === "lowToHigh") return a.price - b.price;
                if (sortOrder === "highToLow") return b.price - a.price;
                return 0;
              })
              .map((service) => (
                
                <Card key={service._id}  {...service} deleteTrue = {deleteTrue} />
              ))}
          </div>
        </div>
      </div>

     {deleteTrue ? "" : <> <GetStarted text="Contact Us" />
      <Footer />
      </>
      }
    </div>
  );
};

export default Services;
