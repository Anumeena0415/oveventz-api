import React from "react";
import { CheckCircle } from "lucide-react";
import Image1 from "../assets/img1.jpg"
import { useNavigate } from "react-router-dom";
function Packages() {
  const navigate = useNavigate()
  // Card data
  const packages = [
    {
      badge: "OccasionSuper Premium",
      image: Image1,
      title: "Shaadi Special Photography Package",
      desc: "Capture your special day with our premium photography package. Includes pre-weddi…",
      price: "₹125,000",
      tag: "All-inclusive",
    },
    {
      badge: "OccasionSuper Premium",
      image: Image1,
      title: "Kids Birthday Bash Decor",
      desc: "Make your child's birthday unforgettable with our vibrant balloon and theme decor.…",
      price: "₹18,500",
      tag: "All-inclusive",
    },
    {
      badge: "OccasionSuper Premium",
      image: Image1,
      title: "Corporate Grand Buffet (Per Plate)",
      desc: "Impress your corporate guests with a lavish multi-cuisine buffet. Perfect for office…",
      price: "₹950",
      tag: "All-inclusive",
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      {/* Header */}
      <div className="max-w-6xl mx-auto px-4 flex flex-col mb-10">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <span className="bg-orange-50 text-global px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base lg:text-lg font-medium">
            ✨ Curated Packages
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6 lg:mt-8">Oveventz Experiences</h2>
          <p className="text-gray-500 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-4">
            Handcrafted event packages designed for perfection
          </p>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        {packages.map((pkg, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
          >
            <div className="relative">
              <img
                src={pkg.image}
                alt={pkg.title}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-3 left-3 bg-orange-50 text-orange-600 text-xs font-medium px-4 py-2 rounded-full">
                {pkg.badge}
              </span>
            </div>
            <div className="p-5">
              <h3 className="text-lg font-semibold">{pkg.title}</h3>
              <p className="text-gray-600 text-sm mt-1">{pkg.desc}</p>
              <div className="flex items-center justify-between mt-4">
                <p className="text-xl font-bold text-orange-600">{pkg.price}</p>
                <span className="flex items-center text-sm text-gray-500">
                  <CheckCircle className="h-4 w-4 mr-1 text-teal-500" />{pkg.tag}
                </span>
              </div>
              <button onClick={()=>{navigate('/services');window.scrollTo({ top: 0, behavior: "smooth" });}} className="mt-4 w-full py-2 rounded-lg bg-gradient-to-r from-orange-400 to-teal-500 text-white font-medium hover:opacity-90 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Packages;