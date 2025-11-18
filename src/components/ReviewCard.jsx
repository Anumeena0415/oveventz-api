import React from "react";

const ReviewCard = ({ review }) => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-shadow flex flex-col justify-between h-full outline-1 outline-[#E69B83]">
            <div className="flex mb-3 sm:mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <svg
                        key={i}
                        className={`w-4 h-4 sm:w-5 sm:h-5 ${i < review.stars ? "text-yellow-400" : "text-gray-300"}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.17c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.922-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.196-1.539-1.118l1.286-3.957a1 1 0 00-.364-1.118L2.049 9.384c-.784-.57-.38-1.81.588-1.81h4.17a1 1 0 00.95-.69l1.286-3.957z" />
                    </svg>
                ))}
            </div>
            <p className="italic text-gray-600 mb-4 sm:mb-6 flex-grow text-sm sm:text-base leading-relaxed">{review.text}</p>
            <div className="flex items-center gap-3 sm:gap-4 mt-auto">
                <img
                    src={review.image}
                    alt={review.name}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover"
                />
                <div>
                    <h3 className="font-bold text-base sm:text-lg lg:text-xl">{review.name}</h3>
                    <p className="text-gray-400 text-xs sm:text-sm">{review.role}</p>
                </div>
            </div>
        </div>
    );
};

export default ReviewCard