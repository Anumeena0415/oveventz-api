import React from "react";
import RecommendationCard from "../components/RecommendationCard";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const recommendations = [
    {
        id: 1,
        title: "Royal Events & Catering",
        rating: 4.8,
        description:
            "Perfect match for your budget and wedding requirements. Excellent food quality and decoration services.",
        price: "₹1,20,000 – ₹1,50,000",
        services: ["Catering", "Decoration", "Planning"],
        image:
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 2,
        title: "Moments Photography Studio",
        rating: 4.9,
        description:
            "Top-rated photographer in your city with amazing portfolio for wedding shoots.",
        price: "₹25,000 – ₹40,000",
        services: ["Photography", "Videography"],
        image:
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
    {
        id: 3,
        title: "Melody Makers DJ",
        rating: 4.7,
        description:
            "Great music selection and professional setup. Perfect for creating the right ambiance.",
        price: "₹15,000 – ₹25,000",
        services: ["DJ", "Sound System", "Lighting"],
        image:
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    },
];


const AIRecommendations = () => {
    const navigate = useNavigate();
    return (
        <>
            <Navbar />
            <div className="bg-[#f9f9fc] py-10 px-6">
                {/* Heading */}
                <div className="text-center mb-10">
                    <h2 className="text-2xl font-bold flex justify-center items-center gap-2">
                        <span className="text-[#E69B83]">✨</span> AI Recommendations
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Top matches for aapke budget aur requirements ke hisaab se
                    </p>
                </div>

                {/* Cards */}
                <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                    {recommendations.map((item) => (
                        <RecommendationCard key={item.id} item={item} />
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <button
                        onClick={() => navigate("/event-planning")}
                        className="px-6 py-2 border border-[#E69B83] text-[#E69B83] rounded-lg hover:bg-[#E69B83] hover:text-white transition"
                    >
                        Plan Another Event
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AIRecommendations;
