import React from "react";

const BudgetPriorities = ({ formData, setFormData }) => {
  return (
    <div className="bg-white rounded-2xl p-4 mt-4">
      <h2 className="text-2xl font-bold text-center">Budget & Priorities</h2>
      <p className="text-center text-gray-500">
        Set your budget and tell us what matters most
      </p>

      {/* Total Budget */}
      <div>
        <label className="block text-lg font-semibold mb-1">
          Total Budget: ₹{parseInt(formData.budget).toLocaleString("en-IN")}
        </label>
        <input
          type="range"
          min="25000"
          max="1000000"
          step="5000"
          value={formData.budget}
          onChange={(e) =>
            setFormData({ ...formData, budget: e.target.value })
          }
          className="w-full accent-[#c16a4d]"
        />
        <div className="flex justify-between font-semibold text-sm text-gray-500">
          <span>₹25,000</span>
          <span>₹10,00,000+</span>
        </div>
      </div>

      {/* Priority Areas */}
      <div>
        <h3 className="text-lg font-semibold mb-3">
          Priority Areas (1-10 scale)
        </h3>
        {[
          "Food & Catering",
          "Decoration & Ambiance",
          "Photography & Videography",
        ].map((area) => (
          <div key={area} className="mb-4">
            <div className="flex justify-between items-center mb-1">
              <span>{area}</span>
              <span className="font-bold">
                {formData.priorities[area] || 5}
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.priorities[area] || 5}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  priorities: {
                    ...formData.priorities,
                    [area]: e.target.value,
                  },
                })
              }
              className="w-full accent-[#c16a4d]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetPriorities;
