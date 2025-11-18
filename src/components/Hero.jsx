import React from "react";
import { useNavigate } from "react-router-dom";
import { Sparkles, Brain, Target, Zap, Shield } from "lucide-react";
import { Image7, Image8, Image9, Image10 } from "../assets";
import SearchBar from "./SearchBar";

const Hero = () => {
    const navigate = useNavigate();
    return (
        <section className="relative w-full bg-white px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
            <div className="max-w-7xl mx-auto">
                <SearchBar
                    locationPlaceholder="Search by location..."
                />

                <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center" style={{ marginTop: '60px' }}>
                    {/* Left Column */}
                    <div className="space-y-6 sm:space-y-8">
                        {/* Badge */}
                        <div className="text-sm sm:text-base lg:text-lg inline-flex items-center gap-1 bg-gradient-to-r from-pink-100 to-teal-100 text-gray-800 px-3 sm:px-4 py-2 rounded-full shadow-sm font-medium">
                            <Sparkles className="w-4 h-4 text-[#E69B83]" />
                            AI-Powered Event Management
                        </div>

                        {/* Heading */}
                        <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight text-gray-900">
                            Your Perfect Event <br />
                            <span className="text-[#E69B83]">Delivered</span>
                        </h1>

                        {/* Subtext */}
                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-xl">
                            Experience premium event management with our AI-powered platform.
                            From concept to celebration, Oveventz handles everything with precision and elegance.
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-gray-700 font-medium">
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <Brain className="w-4 h-4 sm:w-5 sm:h-5 text-[#E69B83]" />
                                <span>Smart Recommendations</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <Target className="w-4 h-4 sm:w-5 sm:h-5 text-[#E69B83]" />
                                <span>Personalized Planning</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-[#E69B83]" />
                                <span>Instant Matching</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm sm:text-base">
                                <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#E69B83]" />
                                <span>Quality Assured</span>
                            </div>
                        </div>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-xl rounded-lg cursor-pointer bg-gradient-to-r from-[#c37a61] via-[#e29177] to-[#367d80] text-white font-medium shadow-md hover:scale-105 transition"
                                onClick={() =>{ navigate("/event-planning");window.scrollTo({ top: 0, behavior: "smooth" });}} >
                                Start AI Planning
                            </button>
                            <button className="px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-xl cursor-pointer rounded-lg border border-[#E69B83] text-[#E69B83] font-medium hover:bg-[#E69B83] hover:text-white transition"
                                onClick={() =>{ navigate("/services");window.scrollTo({ top: 0, behavior: "smooth" });}} >
                                Explore Services
                            </button>
                        </div>

                        {/* Sign-in Section
                        <div className="bg-[#FFF5F2] border border-[#E69B83]/30 px-4 sm:px-6 py-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 max-w-lg">
                            <div>
                                <h4 className="font-bold text-gray-800 text-sm sm:text-base">Join Oveventz</h4>
                                <p className="text-gray-600 text-xs sm:text-sm">Get personalized recommendations and track your events</p>
                            </div>
                            <button className="px-3 sm:px-4 py-2 bg-[#c67d65] text-white text-sm sm:text-base lg:text-lg rounded-lg hover:scale-105 hover:shadow-md hover:shadow-[#af5435] hover:bg-[#af5435] transition-all ease-linear">
                                Sign In
                            </button>
                        </div> */}
                    </div>

                    {/* Right Column - Images */}
                    <div className="relative grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                        {/* Top Image */}
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={Image7}
                                alt="Wedding"
                                className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover"
                            />
                        </div>

                        {/* Cake Image */}
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={Image8}
                                alt="Cake"
                                className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover"
                            />
                        </div>

                        {/* Banquet Hall */}
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={Image9}
                                alt="Banquet"
                                className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover"
                            />
                        </div>

                        {/* Couple Toasting */}
                        <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg">
                            <img
                                src={Image10}
                                alt="Couple"
                                className="w-full h-32 sm:h-40 lg:h-48 xl:h-56 object-cover"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Hero
