import React, { useState, useEffect } from "react";
import ReviewCard from "./ReviewCard";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CustomerStories = () => {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = async () => {
        try {
            const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
            const response = await axios.get(`${BASE_URL}/api/reviews`);
            
            if (response.data.success) {
                setReviews(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching reviews:", error);
            // Fallback to empty array if API fails
            setReviews([]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-8 sm:mb-12">
                        <span className="inline-flex items-center gap-2 bg-[#ecebeb] text-[#E69B83] px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base lg:text-lg font-medium">
                            ❤️ Customer Stories
                        </span>
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6">
                            What Our Customers Say
                        </h2>
                        <p className="text-gray-500 text-base sm:text-lg lg:text-xl mt-2 sm:mt-3 max-w-3xl mx-auto px-4">
                            Real experiences from real customers who trusted Oveventz
                        </p>
                    </div>
                    <p className="text-center text-gray-500">Loading reviews...</p>
                </div>
            </section>
        );
    }

    return (
        <section className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 sm:mb-12">
                    <span className="inline-flex items-center gap-2 bg-[#ecebeb] text-[#E69B83] px-3 sm:px-4 py-2 rounded-full text-sm sm:text-base lg:text-lg font-medium">
                        ❤️ Customer Stories
                    </span>
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mt-4 sm:mt-6">
                        What Our Customers Say
                    </h2>
                    <p className="text-gray-500 text-base sm:text-lg lg:text-xl mt-2 sm:mt-3 max-w-3xl mx-auto px-4">
                        Real experiences from real customers who trusted Oveventz
                    </p>
                </div>

                {reviews.length > 0 ? (
                    <div className="relative">
                        {/* Slider Container */}
                        <div className="overflow-hidden">
                            <div 
                                className="flex transition-transform duration-500 ease-in-out"
                                style={{ 
                                    transform: `translateX(-${currentIndex * 100}%)`
                                }}
                            >
                                {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, slideIndex) => (
                                    <div 
                                        key={slideIndex}
                                        className="flex-shrink-0 w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
                                    >
                                        {reviews
                                            .slice(slideIndex * 3, slideIndex * 3 + 3)
                                            .map((review) => (
                                                <ReviewCard key={review._id} review={review} />
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        {reviews.length > 3 && (
                            <div className="flex justify-center items-center gap-4 mt-8">
                                <button
                                    onClick={() => {
                                        const maxIndex = Math.ceil(reviews.length / 3) - 1;
                                        setCurrentIndex((prev) => 
                                            prev === 0 ? maxIndex : prev - 1
                                        );
                                    }}
                                    className="p-2 rounded-full bg-[#E69B83] text-white hover:bg-[#f48965] transition-colors shadow-md"
                                    aria-label="Previous reviews"
                                >
                                    <ChevronLeft size={24} />
                                </button>
                                
                                {/* Dots Indicator */}
                                <div className="flex gap-2">
                                    {Array.from({ length: Math.ceil(reviews.length / 3) }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            className={`h-2 rounded-full transition-all ${
                                                currentIndex === index 
                                                    ? "bg-[#E69B83] w-8" 
                                                    : "bg-gray-300 hover:bg-gray-400 w-2"
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={() => {
                                        const maxIndex = Math.ceil(reviews.length / 3) - 1;
                                        setCurrentIndex((prev) => 
                                            prev === maxIndex ? 0 : prev + 1
                                        );
                                    }}
                                    className="p-2 rounded-full bg-[#E69B83] text-white hover:bg-[#f48965] transition-colors shadow-md"
                                    aria-label="Next reviews"
                                >
                                    <ChevronRight size={24} />
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500">No reviews available at the moment.</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default CustomerStories;
