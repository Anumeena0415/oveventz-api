import React, { useState } from "react";
import { Utensils, Palette, Camera, Music, Building, Calendar } from "lucide-react";

const services = [
  { icon: <Utensils className="w-8 h-8 text-orange-400" />, label: "Catering" },
  { icon: <Palette className="w-8 h-8 text-orange-400" />, label: "Decoration" },
  { icon: <Camera className="w-8 h-8 text-orange-400" />, label: "Photography" },
  { icon: <Music className="w-8 h-8 text-orange-400" />, label: "DJ/Music" },
  { icon: <Building className="w-8 h-8 text-orange-400" />, label: "Venue" },
  { icon: <Calendar className="w-8 h-8 text-orange-400" />, label: "Event Planning" },
];

const ServicesRequired = ({ formData, setFormData }) => {
  const [selectedServices, setSelectedServices] = useState(formData.services || []);

const toggleService = (label) => {
  setSelectedServices((prev) => {
    const updated = prev.includes(label)
      ? prev.filter((s) => s !== label)
      : [...prev, label];
    console.log("updated services:", updated);
    return updated;
  });
};



  return (
    <div className="bg-white rounded-2xl p-4 mt-6">
      <h2 className="text-2xl md:text-3xl font-bold text-center">
        Services Required
      </h2>
      <p className="text-gray-600 text-center mb-8">
        Select all services you need for your event
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service, index) => {
          const isSelected = selectedServices.includes(service.label);

          return (
            <div
              key={index}
              onClick={() => toggleService(service.label)}
              className={`cursor-pointer border rounded-xl px-1 py-5 flex flex-col items-center justify-center transition 
              ${isSelected ? "border-2 border-[#E69B83] bg-orange-50 text-orange-500" : "border-gray-300 hover:border-2 hover:border-[#E69B83]"} border`}
            >
              {service.icon}
              <p className="mt-3 text-gray-800 font-medium">{service.label}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ServicesRequired;
