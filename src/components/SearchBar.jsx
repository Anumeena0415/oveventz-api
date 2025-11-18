import React, { useState, useRef, useEffect } from "react";
import { Search, MapPin, ChevronDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const categories = [
    "All Services",
    "Weddings",
    "Birthday",
    "Corporate",
    "Anniversary",
    "Baby Shower",
    "Theme Parties",
];

function SearchBar({ locationPlaceholder }) {
    const [selectedCategory, setSelectedCategory] = useState("All Services");
    const [location, setLocation] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        setIsDropdownOpen(false);
    };

    const handleSearch = () => {
        // Navigate to services page with selected category
        navigate("/services", {
            state: { category: selectedCategory, location: location }
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <div className="mb-6 sm:mb-8 bg-white shadow-md rounded-xl border border-gray-200">
            {/* Mobile Layout */}
            <div className="block sm:hidden">
                <div className="p-3 space-y-3">
                    {/* Category dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                            <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
                            <button
                                type="button"
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                className="flex-1 flex items-center justify-between text-gray-700 text-sm"
                            >
                                
                                <span>{selectedCategory}</span>
                                <ChevronDown 
                                    className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                                />
                            </button>
                        </div>
                        
                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-60 overflow-y-auto">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => handleCategorySelect(cat)}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#efe3df] transition-colors ${
                                            selectedCategory === cat
                                                ? "bg-[#efe3df] text-[#E69B83] font-semibold"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Location input (only if locationPlaceholder is passed) */}
                    {locationPlaceholder && (
                        <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
                            <MapPin className="w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder={locationPlaceholder}
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="flex-1 outline-none text-gray-700 text-sm bg-transparent"
                            />
                        </div>
                    )}

                    {/* Button */}
                    <button 
                        onClick={handleSearch}
                        className="w-full px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#c37a61] via-[#e29177] to-[#367d80] text-white font-medium"
                    >
                        Search
                    </button>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center px-4 py-3 gap-3">
                {/* Category dropdown */}
                <div
                    className={`relative flex items-center gap-2 flex-1 ${locationPlaceholder ? "border-r border-gray-200 pr-3" : ""
                        }`}
                    ref={dropdownRef}
                >
                    <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 relative">
                        <button
                            type="button"
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="w-full flex items-center justify-between px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
                        >
                            <span className="text-sm sm:text-base">{selectedCategory}</span>
                            <ChevronDown 
                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                            />
                        </button>
                        
                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-xl z-[9999] max-h-60 overflow-y-auto">
                                {categories.map((cat) => (
                                    <button
                                        key={cat}
                                        type="button"
                                        onClick={() => handleCategorySelect(cat)}
                                        className={`w-full text-left px-4 py-2.5 text-sm hover:bg-[#efe3df] transition-colors ${
                                            selectedCategory === cat
                                                ? "bg-[#efe3df] text-[#E69B83] font-semibold"
                                                : "text-gray-700"
                                        }`}
                                    >
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Location input (only if locationPlaceholder is passed) */}
                {locationPlaceholder && (
                    <div className="flex items-center gap-2 flex-1 pl-3">
                        <MapPin className="w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder={locationPlaceholder}
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                            className="flex-1 outline-none text-gray-700"
                        />
                    </div>
                )}

                {/* Button */}
                <button 
                    onClick={handleSearch}
                    className="ml-3 px-4 lg:px-6 py-2 text-base lg:text-lg rounded-lg bg-gradient-to-r from-[#c37a61] via-[#e29177] to-[#367d80] text-white font-medium"
                >
                    Search
                </button>
            </div>
        </div>
    );
}

export default SearchBar;
