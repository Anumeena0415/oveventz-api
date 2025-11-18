import React from "react";

const AddCustomerDetails = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update only the customerDetails part of formData
    setFormData((prevData) => ({
      ...prevData,
      customerDetails: {
        ...prevData.customerDetails,
        [name]: value,
      },
    }));
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-2xl shadow-md space-y-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        Add Customer Details
      </h2>

      {/* Name Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.customerDetails.name}
          onChange={handleChange}
          placeholder="Enter your full name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
        />
      </div>

      {/* Email Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Email Address</label>
        <input
          type="email"
          name="email"
          value={formData.customerDetails.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
        />
      </div>

      {/* Phone Number Field */}
      <div>
        <label className="block text-gray-700 font-medium mb-1">Phone Number</label>
        <input
          type="tel"
          name="phoneNo"
          value={formData.customerDetails.phoneNo}
          onChange={handleChange}
          placeholder="Enter your phone number"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
        />
      </div>
    </div>
  );
};

export default AddCustomerDetails;
