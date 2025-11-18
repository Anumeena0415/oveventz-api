import React, { useState } from "react";
import {
  useLocation,
  useNavigate,
  useParams,
  useRoutes,
} from "react-router-dom";

import EventBasics from "../components/EventPlanning/EventBasics";
import BudgetPriorities from "../components/EventPlanning/BudgetPriorities";
import VenuePreferences from "../components/EventPlanning/VenuePreferences";
import ServicesRequired from "../components/EventPlanning/ServicesRequired";
import SpecialInstructions from "../components/EventPlanning/SpecialInstructions";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import AddCustomerDetails from "../components/EventPlanning/AddCustomerDetails";

const EventPlanning = () => {
  const location = useLocation();
  const title = location.state?.title || {};

  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: "",
    date: "",
    city: "",
    guests: 50,
    budget: 100000,
    priorities: {
      "Food & Catering": 5,
      "Decoration & Ambiance": 5,
      "Photography & Videography": 5,
    },
    status: "pending",
    venuePreference: "",
    services: [],
    customerDetails: {
      name: "",
      email: "",
      phoneNo: "",
    },
  });

  // const handleSubmit = async () => {
  //     try {
  //         const res = await axios.post("https://ovevents.onrender.com/api/eventplan/event", {
  //             name : formData.customerDetails.name,
  //             email : formData.customerDetails.email,
  //             phoneNo : formData.customerDetails.phoneNo,
  //             type: formData.eventType, // map eventType → type
  //             date: formData.date,
  //             city: formData.city,
  //             guests: formData.guests,
  //             budget: formData.budget,
  //             status : formData.status,
  //             venuePreference: formData.venuePreference,
  //             services: formData.services || [], // handle undefined
  //         });
  //         console.log('res-----', res.data.data);

  //     }
  //     catch (err) {
  //         console.log('Error--', err)
  //     }

  // }
  const handleSubmit = async () => {
    console.log("Submit button clicked!");
    try{
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await axios.post(`${BASE_URL}/api/eventplan/event`,{
        name: formData.customerDetails.name, 
        email: formData.customerDetails.email,
         phoneNo: formData.customerDetails.phoneNo, 
         type: formData.type, // fixed field 
         date: formData.date, 
         city: formData.city, 
         guests: formData.guests,
          budget: formData.budget, 
          status: formData.status,
           venuePreference: formData.venuePreference,
            services: formData.services || [],
      } )

      console.log("resposnseeeeeeeee",res);
      
    }
     catch (err) {
      console.error(
        "Error in handleSubmit:",
        err.response?.data || err.message
      );
    }
  };

  const totalSteps = 6;

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex justify-center items-center p-4 sm:p-6 lg:p-8">
        <div className="w-full max-w-4xl lg:w-2/3 p-4 sm:p-6 lg:p-8 outline-1 outline-[#E69B83] shadow-md shadow-[#E69B83] rounded-xl sm:rounded-2xl">
          {/* Progress Bar */}
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 sm:mb-2 gap-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
                Event Planner Wizard
              </h1>
              <p className="text-sm sm:text-base lg:text-lg font-semibold text-gray-500">
                Step {step} of {totalSteps}
              </p>
            </div>

            <div className="mt-1 h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-[#E69B83] rounded-full transition-all duration-300"
                style={{ width: `${(step / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Step Content */}
          <div className="mt-6 sm:mt-8">
            {step === 1 && (
              <EventBasics
                title={title}
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 2 && (
              <BudgetPriorities formData={formData} setFormData={setFormData} />
            )}
            {step === 3 && (
              <VenuePreferences formData={formData} setFormData={setFormData} />
            )}
            {step === 4 && (
              <ServicesRequired formData={formData} setFormData={setFormData} />
            )}
            {step === 5 && (
              <AddCustomerDetails
                formData={formData}
                setFormData={setFormData}
              />
            )}
            {step === 6 && <SpecialInstructions event={{ formData }} />}
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row justify-between pt-6 sm:pt-4 gap-3 sm:gap-0">
            {/* Previous Button */}
            <button
              onClick={() => setStep((prev) => Math.max(prev - 1, 1))}
              disabled={step === 1}
              className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg text-white hover:bg-[#c16a4d] bg-[#E69B83] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              ← Previous
            </button>

            {/* Next / Submit Button */}
            {step === totalSteps ? (
              <button
                  onClick={() => { handleSubmit(); navigate("/thankYou") }}
                  className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-green-500 hover:bg-green-700 text-white transition-colors duration-200"
              >
                  Submit
              </button>

              
            ) : (
              <button
                onClick={() =>
                  setStep((prev) => Math.min(prev + 1, totalSteps))
                }
                className="w-full sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base rounded-lg bg-[#E69B83] hover:bg-[#c16a4d] text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Next →
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EventPlanning;
