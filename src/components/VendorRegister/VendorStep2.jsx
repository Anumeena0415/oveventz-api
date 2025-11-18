import React from "react";


const VendorStep2 = ({ formData, setFormData, onNext, onPrev }) => {
  const packages = formData?.packages && formData.packages.length
    ? formData.packages
    : [{ title: "", price: 0, description: "", inclusions: "" }];
  const setPackages = (updated) =>
    setFormData((prev) => ({ ...prev, packages: updated }));

  const handlePackageChange = (index, field, value) => {
    const updated = [...packages];
    updated[index][field] = value;
    setPackages(updated);
  };

  const addPackage = () => {
    setPackages([
      ...packages,
      { title: "", price: 0, description: "", inclusions: "" },
    ]);
  };

  const removePackage = (index) => {
    setPackages(packages.filter((_, i) => i !== index));
  };


  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 bg-white rounded-xl">
      <h2 className="text-xl sm:text-2xl lg:text-3xl text-center font-bold mb-2">Packages</h2>
      <p className="text-sm sm:text-base text-gray-500 text-center mb-6 sm:mb-8">Create your packages (optional)</p>
      {packages.map((pkg, idx) => (
        <div key={idx} className="outline-2 outline-[#E69B83] rounded-lg p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6">
          <p className="font-bold text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4">Package {idx + 1}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mb-4 sm:mb-6">
            <div className="flex flex-col">
              <label htmlFor={`package-title-${idx}`} className="text-sm sm:text-base lg:text-lg mb-2 font-medium text-gray-700">
                Package Title <span className="text-blue-500 text-xs sm:text-sm">(Optional)</span>
              </label>
              <input
                id={`package-title-${idx}`}
                type="text"
                placeholder="e.g., Premium Wedding Package"
                value={pkg.title}
                onChange={(e) =>
                  handlePackageChange(idx, "title", e.target.value)
                }
                className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded p-2 sm:p-3 w-full text-sm sm:text-base"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor={`package-price-${idx}`} className="text-sm sm:text-base lg:text-lg mb-2 font-medium text-gray-700">
                Price <span className="text-blue-500 text-xs sm:text-sm">(Optional)</span>
              </label>
              <input
                id={`package-price-${idx}`}
                type="number"
                placeholder="Price (₹)"
                value={pkg.price}
                onChange={(e) =>
                  handlePackageChange(idx, "price", e.target.value)
                }
                className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded p-2 sm:p-3 w-full text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4 sm:mb-6">
            <label htmlFor={`package-description-${idx}`} className="text-sm sm:text-base lg:text-lg mb-2 font-medium text-gray-700">
              Description <span className="text-blue-500 text-xs sm:text-sm">(Optional)</span>
            </label>
            <textarea
              id={`package-description-${idx}`}
              placeholder="Describe what's included in this package..."
              value={pkg.description}
              onChange={(e) =>
                handlePackageChange(idx, "description", e.target.value)
              }
              rows={3}
              className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded p-2 sm:p-3 w-full text-sm sm:text-base resize-none"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor={`package-inclusions-${idx}`} className="text-sm sm:text-base lg:text-lg mb-2 font-medium text-gray-700">
              Inclusions <span className="text-blue-500 text-xs sm:text-sm">(Optional)</span>
            </label>
            <textarea
              id={`package-inclusions-${idx}`}
              placeholder="List all items/services included (one per line)"
              value={pkg.inclusions}
              onChange={(e) =>
                handlePackageChange(idx, "inclusions", e.target.value)
              }
              rows={4}
              className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded p-2 sm:p-3 w-full text-sm sm:text-base resize-none"
            />
          </div>
        </div>
      ))}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
        <button
          type="button"
          onClick={addPackage}
          className="text-[#E69B83] font-semibold hover:underline text-sm sm:text-base px-2 py-1 rounded-md hover:bg-[#E69B83]/10 transition-colors duration-200"
        >
          + Add Another Package
        </button>

        {packages.length > 1 && (
          <button
            type="button"
            onClick={() => removePackage(packages.length - 1)}
            className="text-red-500 font-semibold hover:underline text-sm sm:text-base px-2 py-1 rounded-md hover:bg-red-50 transition-colors duration-200"
          >
            − Delete this Package
          </button>
        )}
      </div>

    </div>
  );
};

export default VendorStep2;
