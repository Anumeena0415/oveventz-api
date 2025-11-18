import React from "react";
import { Award, Check, Star, Shield, Medal, Calendar, Users, CheckCircle } from "lucide-react";

const WhyChoose = () => {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Why Choose */}
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 bg-orange-100 px-3 sm:px-4 py-2 rounded-full">
            <Award className="text-orange-500" size={18} />
            <span className="text-orange-500 text-sm sm:text-base lg:text-lg font-medium">
              Excellence & Trust
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6">
            Why Choose Oveventz?
          </h2>
          <p className="text-gray-600 mt-2 sm:mt-3 text-sm sm:text-base lg:text-lg">
            India's most trusted premium event management platform
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center mb-12 sm:mb-16 lg:mb-20">
          <div>
            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 outline-1 outline-[#E69B83] bg-white rounded-xl sm:rounded-2xl shadow">
              <CheckCircle className="text-orange-400" size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">500+</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Curated Partners</p>
          </div>

          <div>
            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 outline-1 outline-[#E69B83] bg-white rounded-xl sm:rounded-2xl shadow">
              <Users className="text-teal-600" size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">25,000+</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Happy Customers</p>
          </div>

          <div>
            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 outline-1 outline-[#E69B83] bg-white rounded-xl sm:rounded-2xl shadow">
              <Star className="text-orange-400" size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">4.9/5</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Customer Rating</p>
          </div>

          <div>
            <div className="flex justify-center items-center w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 outline-1 outline-[#E69B83] bg-white rounded-xl sm:rounded-2xl shadow">
              <Calendar className="text-teal-600" size={24} />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold">100+</h3>
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg">Cities Served</p>
          </div>
        </div>

        {/* Section 2: Quality & Support */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Quality Guarantee */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow p-6 sm:p-8">
            <h3 className="flex items-center text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
              <Shield className="text-orange-400 mr-2" size={24} />
              Quality Guarantee
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              100% satisfaction or money back
            </p>
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <Check className="text-orange-400 mr-2" size={16} />
                <span>Pre-vetted service providers</span>
              </li>
              <li className="flex items-center">
                <Check className="text-orange-400 mr-2" size={16} />
                <span>Quality control at every step</span>
              </li>
              <li className="flex items-center">
                <Check className="text-orange-400 mr-2" size={16} />
                <span>Dedicated event manager</span>
              </li>
            </ul>
          </div>

          {/* Premium Support */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow p-6 sm:p-8">
            <h3 className="flex items-center text-lg sm:text-xl lg:text-2xl font-bold mb-3 sm:mb-4 text-gray-800">
              <Award className="text-teal-600 mr-2" size={24} />
              Premium Support
            </h3>
            <p className="text-gray-600 mb-4 text-sm sm:text-base">
              24/7 assistance throughout your journey
            </p>
            <ul className="space-y-2 sm:space-y-3 text-gray-700 text-sm sm:text-base">
              <li className="flex items-center">
                <Check className="text-teal-600 mr-2" size={16} />
                <span>Real-time event tracking</span>
              </li>
              <li className="flex items-center">
                <Check className="text-teal-600 mr-2" size={16} />
                <span>Instant communication channel</span>
              </li>
              <li className="flex items-center">
                <Check className="text-teal-600 mr-2" size={16} />
                <span>Post-event follow-up</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WhyChoose;