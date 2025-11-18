import React, { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Calendar, DollarSign, Star, MessageCircle, Crown } from "lucide-react";

function VendorIntro() {
    const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
    const userId = authUser?.id;
    const token = localStorage.getItem("authToken");

    const [profile, setProfile] = useState(null);

    useEffect(() => {
        if (!userId) return;
        const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        axios
            .get(`${BASE_URL}/api/vendor/${userId}/profile`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                },
            })
            .then((res) => {
                console.log("Profile API response", res.data);
                setProfile(res.data.data);
            })
            .catch((err) => console.error("Error fetching profile:", err));
    }, [userId, token]);

    if (!profile) return <p className="text-center p-4">Loading...</p>;

    const { user, vendor } = profile;

    return (
        <div className="bg-[#f9fafb] p-4 sm:p-6 lg:p-8">
            {/* Top Section */}
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center p-4 lg:p-6 gap-4 lg:gap-0 bg-white rounded-2xl shadow-sm">
                <div className="flex flex-col gap-2">
                    {vendor?.verificationStatus === "verified" && (
                        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 text-base sm:text-lg font-medium">
                            <Crown className="w-4 h-4 sm:w-5 sm:h-5" />
                            Verified Vendor
                        </span>
                    )}

                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mt-2">
                        Welcome back, {vendor?.ownerName || "Vendor"}!
                    </h1>

                    <p className="text-gray-600 text-sm sm:text-base">
                        {vendor?.businessName} • {vendor?.city}
                    </p>
                </div>

                <div className="flex flex-col items-start lg:items-end gap-2 mt-2 lg:mt-0">
                    {vendor?.status === "approved" && (
                        <span className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-50 text-green-600 font-medium text-sm sm:text-base">
                            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                            Approved
                        </span>
                    )}
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">
                        Member since {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Stats Section */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-5">
                {/* New Leads */}
                <div className="bg-[#fff5f2] rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4">
                    <MessageCircle className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 flex-shrink-0" />
                    <div>
                        <p className="text-gray-500 text-sm sm:text-md">New Leads</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{vendor?.newLeads || 0}</h2>
                    </div>
                </div>

                {/* Upcoming Jobs */}
                <div className="bg-[#f0f6f8] rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4">
                    <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 flex-shrink-0" />
                    <div>
                        <p className="text-gray-500 text-sm sm:text-md">Upcoming Jobs</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{vendor?.upcomingJobs || 0}</h2>
                    </div>
                </div>

                {/* Total Earnings */}
                <div className="bg-[#fff5f2] rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4">
                    <DollarSign className="w-10 h-10 sm:w-12 sm:h-12 text-orange-500 flex-shrink-0" />
                    <div>
                        <p className="text-gray-500 text-sm sm:text-md">Total Earnings</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">₹{vendor?.totalEarnings || 0}</h2>
                    </div>
                </div>

                {/* Avg Rating */}
                <div className="bg-[#f0f6f8] rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4">
                    <Star className="w-10 h-10 sm:w-12 sm:h-12 text-teal-500 flex-shrink-0" />
                    <div>
                        <p className="text-gray-500 text-sm sm:text-md">Avg Rating</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{vendor?.avgRating || 0}</h2>
                    </div>
                </div>

                {/* Completed */}
                <div className="bg-[#fff5f2] rounded-2xl p-4 shadow-sm flex items-center gap-3 sm:gap-4">
                    <CheckCircle className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 flex-shrink-0" />
                    <div>
                        <p className="text-gray-500 text-sm sm:text-md">Completed</p>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-800">{vendor?.completed || 0}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendorIntro;
