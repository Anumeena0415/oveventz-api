import { Star } from "lucide-react";

const RecommendationCard = ({ item }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border hover:shadow-md transition flex flex-col">
      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt={item.title}
          className="h-40 sm:h-48 md:h-56 w-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-[#E69B83] text-white text-[10px] sm:text-xs font-semibold px-2 sm:px-3 py-0.5 sm:py-1 rounded-full">
          AI Match
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 className="font-bold text-base sm:text-lg">{item.title}</h3>

        <div className="flex items-center gap-1 text-yellow-500 mt-1">
          <Star size={14} className="sm:w-4 sm:h-4" fill="currentColor" />
          <span className="text-xs sm:text-sm text-gray-700">{item.rating}</span>
        </div>

        {/* Fixed height description */}
        <p className="text-gray-600 text-xs sm:text-sm mt-2 min-h-[48px]">
          {item.description}
        </p>

        {/* Always aligned at same level */}
        <div className="mt-auto">
          <p className="mt-3 font-semibold text-[#E69B83] text-sm sm:text-base">
            {item.price}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {item.services.map((service, idx) => (
              <span
                key={idx}
                className="bg-teal-900 text-white text-[10px] sm:text-xs px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg"
              >
                {service}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mt-5">
            <button className="flex-1 bg-[#E69B83] text-white py-2 rounded-lg hover:bg-[#c16a4d] transition text-sm sm:text-base">
              Request Quote
            </button>
            <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition text-sm sm:text-base">
              View Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendationCard;
