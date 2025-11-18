import React from "react";

const SpecialInstructions = ({ event }) => {
  console.log("event-", event.formData);
  
  return (
    <div className="bg-white rounded-2xl p-3 mt-4">
      {/* Special Instructions */}
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Special Instructions
      </h2>
      <p className="text-gray-600 text-center mb-6">
        Any specific requirements or preferences?
      </p>


      <div className="mb-8">
        <label
          htmlFor="additional-details"
          className="block text-gray-700 font-semibold mb-2"
        >
          Additional Details (Optional)
        </label>
        <textarea
          id="additional-details"
          rows="4"
          placeholder="Tell us about any specific themes, dietary requirements, cultural preferences, or special arrangements you need..."
          className="w-full p-2 outline-1 outline-gray-300 rounded-lg focus:outline-2 focus:outline-[#E69B83]"
        />
      </div>

      {/* Event Summary */}
      <div className="bg-red-100 p-6 text-lg rounded-2xl">
        <h3 className="text-2xl text-center font-bold mb-4"></h3>
        <p>
          <span className="font-semibold">Your Name:</span> {event.formData.customerDetails.name}
        </p>
        <p>
          <span className="font-semibold">Your Email:</span> {event.formData.customerDetails.email}
        </p>
        <p>
          <span className="font-semibold">Your PhoneNo:</span> {event.formData.customerDetails.phoneNo}
        </p>
        <p>
          <span className="font-semibold">Date:</span> {event.formData.date}
        </p>
        <p>
          <span className="font-semibold">City:</span> {event.formData.city}
        </p>
        <p>
          <span className="font-semibold">Guests:</span> {event.formData.guests}
        </p>
        <p>
          <span className="font-semibold">Budget:</span> ₹{event.formData.budget}
        </p>
        <p>
          <span className="font-semibold">Venue:</span> {event.formData.venuePreference || ""}
        </p>
        <p>
          <span className="font-semibold">Services:</span>{" "}
          {event.formData.services?.join(", ") || ""}
        </p>
      </div>
    </div>
  );
};

export default SpecialInstructions;
