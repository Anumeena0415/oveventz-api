import React from 'react'

const FeatureCard = ({ icon, title, description, align }) => {
    return (
        <div className="text-center flex flex-col items-center h-full">
            {/* Icon */}
            <div className="flex items-center justify-center mb-4 sm:mb-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 shadow-md shadow-[#E69B83] border-2 border-[#E69B83] rounded-full flex items-center justify-center">
                    {icon}
                </div>
            </div>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-global min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] flex items-center justify-center mb-3 sm:mb-4 px-2">
                {title}
            </h3>
            <span
                className={`text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-xs sm:max-w-sm lg:max-w-md mx-auto ${align === "left" ? "text-left" : "text-center"
                    }`}
            >
                {description}
            </span>
        </div>
    )
}

export default FeatureCard
