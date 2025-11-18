import React from "react";

const VenuePreferences = ({ formData, setFormData }) => {
  const venues = [
    {
      title: "Indoor Venue",
      desc: "Banquet halls, hotels, restaurants",
    },
    {
      title: "Outdoor Venue",
      desc: "Gardens, lawns, beach, farmhouse",
    },
    {
      title: "Hybrid Setup",
      desc: "Combination of indoor and outdoor",
    },
    {
      title: "Home/Residence",
      desc: "At your home or family place",
    },
  ];

  return (
    <div className="bg-white rounded-2xl p-4 mt-8 mb-8">
      <h2 className="text-2xl font-bold text-center">Venue Preferences</h2>
      <p className="text-center text-gray-500">
        What kind of venue do you prefer?
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
        {venues.map((venue) => (
          <div
            key={venue.title}
            onClick={() =>
              setFormData({
                ...formData,
                venuePreference: venue.title,
              })
            }
            className={`cursor-pointer border rounded-xl px-1 py-5 flex flex-col items-center justify-center transition ${
              formData.venuePreference === venue.title
                ? "border-2 border-[#E69B83] bg-orange-50 text-orange-500"
                : "border-gray-300 hover:border-2 hover:border-[#E69B83]"
            }`}
          >
            <h3 className="font-semibold text-xl">{venue.title}</h3>
            <p className="text-lg text-gray-500">{venue.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VenuePreferences;
