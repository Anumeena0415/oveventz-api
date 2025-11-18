import React, { useState } from "react";
import { CircleCheck, Shield } from "lucide-react";

const VendorStep4 = ({ formData, setFormData }) => {
  const { bankDetails } = formData;
  const setBankDetails = (updated) => setFormData((prev) => ({ ...prev, bankDetails: updated }));

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Allow numbers only for accountNumber
    if (name === "accountNumber") {
      const numericValue = value.replace(/\D/g, ""); // remove non-digits
      setFormData((prev) => ({
        ...prev,
        bankDetails: {
          ...prev.bankDetails,
          [name]: numericValue,
        },
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      bankDetails: {
        ...prev.bankDetails,
        [name]: value,
      },
    }));
  };


  return (
    <div className="max-w-4xl mx-auto p-3 bg-white rounded-lg">
      {/* Bank Details Section */}
      <div className="bg-white rounded-xl mb-8" >
        <h3 className="text-2xl font-semibold text-center">Bank Details</h3>
        <p className="text-gray-600 text-center mb-6">
          Add your bank details for secure payouts (optional)
        </p>

        <div className="space-y-2">
          <div>
            <label className="block text-lg font-semibold mb-1">
              Account Holder Name <span className="text-blue-500 text-sm">(Optional)</span>
            </label>
            <input
              type="text"
              name="accountHolder"
              value={bankDetails.accountHolder}
              onChange={handleChange}
              placeholder="As per bank records"
              className="outline-1 hover:outline-2 hover:outline-[#E69B83] w-full rounded-lg p-2"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              Account Number <span className="text-blue-500 text-sm">(Optional)</span>
            </label>
            <input
              type="text"
              name="accountNumber"
              value={bankDetails.accountNumber}
              onChange={handleChange}
              placeholder="Enter your account number"
              className="outline-1 hover:outline-2 hover:outline-[#E69B83] w-full rounded-lg p-2"
            />
            <p className="text-sm text-gray-500 mt-1">
              Account number will be masked for security
            </p>
          </div>

          <div>
            <label className="block text-lg font-semibold mb-1">
              IFSC Code <span className="text-blue-500 text-sm">(Optional)</span>
            </label>
            <input
              type="text"
              name="ifsc"
              value={bankDetails.ifsc}
              onChange={handleChange}
              placeholder="e.g., SBIN0001234"
              className="outline-1 hover:outline-2 hover:outline-[#E69B83] w-full rounded-lg p-2"
            />
          </div>
        </div>
      </div >

      {/* Security & Privacy */}
      <div className="m-8" >
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Shield className="w-6 h-6 text-orange-500" />
          Security & Privacy
        </h3>
        <ul className="
  space-y-2 md:space-y-3 
  text-sm sm:text-base md:text-lg 
  text-gray-700
">
          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
            <span>Bank details are encrypted and stored securely</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
            <span>Account numbers are masked in all interfaces</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
            <span>Used only for legitimate payout processing</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
            <span>Compliant with banking security standards</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-500 flex-shrink-0" />
            <span>Bank details are optional – you can add them later</span>
          </li>
        </ul>

      </div >


      {/* Application Summary Section */}
      <div className="bg-orange-50 shadow-md rounded-xl p-6 mb-8" >
        <h3 className="text-xl font-bold mb-3">Application Summary</h3>
        <ul className="space-y-1">
          <li><strong>Business:</strong> {formData.businessName}</li>
          <li><strong>Owner:</strong> {formData.ownerName}</li>
          <li><strong>Location:</strong> {formData.city}</li>
          <li><strong>Categories:</strong> {formData.categories.join(", ")}</li>
          <li><strong>Packages:</strong> {formData.packages.length} created</li>
          <li>
            <strong>Documents:</strong>
            {Object.values(formData.documents).filter(Boolean).length}/3 uploaded
          </li>
          <li>
            <strong>Bank Details:</strong>
            {formData.bankDetails.accountNumber ? "Added" : "Optional"}
          </li>
        </ul>
      </div >
    </div >
  );
};

export default VendorStep4;

