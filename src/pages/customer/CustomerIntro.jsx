import React from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, CheckCircle, CreditCard, Star, Crown } from "lucide-react";

const CustomerIntro = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/event-planning"); // <-- your route path
  };
  return (
    <div className="p-6 bg-gray-50">
      {/* Top badge + title */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <span className="inline-flex items-center px-3 py-1 mb-2 text-sm font-medium text-orange-700 bg-orange-100 rounded-full">
            <Crown className="text-orange-700" size={15} />Premium Customer
          </span>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, User!
          </h1>
          <p className="text-gray-500">
            Manage your events and track your bookings with Oveventz
          </p>
        </div>

        <button
          onClick={handleClick}
          className="mt-4 md:mt-0 px-6 py-2 hover:cursor-pointer text-white rounded-md bg-gradient-to-r from-orange-400 to-teal-600 hover:opacity-90 transition">
          + Plan New Event
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
        {/* Active Events */}
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4">
          <div className="p-3 rounded-xl bg-orange-100 text-orange-500">
            <CalendarDays size={24} />
          </div>
          <p className="mt-2 text-gray-500">Active Events</p>
          <p className="text-xl font-bold text-gray-900">0</p>
        </div>

        {/* Completed */}
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4">
          <div className="p-3 rounded-xl bg-teal-100 text-teal-600">
            <CheckCircle size={24} />
          </div>
          <p className="mt-2 text-gray-500">Completed</p>
          <p className="text-xl font-bold text-gray-900">1</p>
        </div>

        {/* Total Spent */}
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4">
          <div className="p-3 rounded-xl bg-orange-100 text-orange-500">
            <CreditCard size={24} />
          </div>
          <p className="mt-2 text-gray-500">Total Spent</p>
          <p className="text-xl font-bold text-gray-900">₹535,000</p>
        </div>

        {/* Reviews Given */}
        <div className="flex flex-col items-center justify-center bg-white rounded-2xl shadow p-4">
          <div className="p-3 rounded-xl bg-teal-100 text-teal-600">
            <Star size={24} />
          </div>
          <p className="mt-2 text-gray-500">Reviews Given</p>
          <p className="text-xl font-bold text-gray-900">6</p>
        </div>
      </div>
    </div>
  );
};

export default CustomerIntro;
