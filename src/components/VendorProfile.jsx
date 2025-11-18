import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { User, Edit } from "lucide-react";
import ShowHideButton from "./ShowHideButton";
import { validatePassword } from "../utils/passwordGenerator";

export default function VendorProfile() {
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});
  const [profile, setProfile] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        toast.error("You must be logged in.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        const res = await axios.get(
          `${BASE_URL}/api/vendor/${userId}/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          }
        );

        const userData = res.data.data?.user || res.data.user;
        const vendorData = res.data.data?.vendor || res.data.vendor;
        setProfile({ user: userData, vendor: vendorData });

        setFormData({
          email: userData?.email || "",
          phone_number: userData?.phone_number || "",
          password: "",
          businessName: vendorData?.businessName || "",
          ownerName: vendorData?.ownerName || "",
          phone: vendorData?.phone || "",
          city: vendorData?.city || "",
          serviceArea: vendorData?.serviceArea || "",
          //update
          profilePhoto: vendorData?.profilePhoto || "",   // add
          upiId: vendorData?.upiId || ""                  // add
        });
      } catch (err) {
        console.error("Request failed:", err.response?.data || err.message);
        toast.error(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [userId, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. basic phone validation
    if (!/^\d{10}$/.test(formData.phone_number)) {
      toast.error("Phone number must be exactly 10 digits");
      return;
    }

    // 2. if password entered, validate it strongly
    if (formData.password) {
      const { isValid, errors } = validatePassword(formData.password);
      if (!isValid) {
        toast.error(errors[0]); // show first error
        return;
      }
    }

    // 3. check changed fields
    const original = {
      email: profile.user.email || "",
      phone_number: profile.user.phone_number || "",
      businessName: profile.vendor.businessName || "",
      ownerName: profile.vendor.ownerName || "",
      phone: profile.vendor.phone || "",
      city: profile.vendor.city || "",
      serviceArea: profile.vendor.serviceArea || "",
      //update
      profilePhoto: profile.vendor.profilePhoto || "", // add
      upiId: profile.vendor.upiId || ""
    };


    let changed = false;
    for (const key in formData) {
      // skip password if blank
      if (key === "password" && !formData.password) continue;

      const current = formData[key] ?? "";
      const orig = original[key] ?? "";

      if (current !== orig) {
        changed = true;
        break;
      }
    }



    if (!changed) {
      toast.info("No changes made");
      return;
    }

    try {
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await axios.put(
        `${BASE_URL}/api/vendor/${userId}/profile`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success("Profile updated");
      const userData = res.data.data?.user || res.data.user;
      const vendorData = res.data.data?.vendor || res.data.vendor;
      setProfile({ user: userData, vendor: vendorData });
      setFormData((prev) => ({ ...prev, password: "" }));
      setShowModal(false);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    }
  };


  if (loading)
    return <div className="p-6 text-center">Loading profile...</div>;
  if (!profile)
    return (
      <div className="p-6 text-center text-red-500">No profile found</div>
    );

  // categories formatted
  const categories = (() => {
    const mainCats = Array.isArray(profile.vendor.categories)
      ? profile.vendor.categories.filter((c) => c.toLowerCase() !== "others")
      : [];
    let display = mainCats.join(", ");
    if (profile.vendor.othersCategories) {
      const others = Array.isArray(profile.vendor.othersCategories)
        ? profile.vendor.othersCategories.join(", ")
        : profile.vendor.othersCategories;
      display += (display ? ", " : "") + `Others - ${others}`;
    }
    return display || "—";
  })();

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formDataFile = new FormData();
    formDataFile.append("photo", file);

    const toastId = toast.loading("Profile photo uploading..."); // ✅ show uploading toast

    try {
      const token = localStorage.getItem("authToken");

      // 1. Upload photo to server/cloud
      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const uploadRes = await axios.post(
        `${BASE_URL}/api/vendor/${userId}/upload-photo`,
        formDataFile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const updatedVendor = uploadRes.data.data.vendor;

      // 2. Fetch updated profile from backend
      const profileRes = await axios.get(
        `${BASE_URL}/api/vendor/${userId}/profile`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const userData = profileRes.data.data?.user || profileRes.data.user;
      const vendorData = profileRes.data.data?.vendor || profileRes.data.vendor;

      // 3. Update profile state
      setProfile({ user: userData, vendor: vendorData });

      // 4. Update formData state (optional)
      setFormData((prev) => ({ ...prev, profilePhoto: vendorData.profilePhoto }));

      toast.update(toastId, {
        render: "Profile photo updated!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });

    } catch (err) {
      toast.update(toastId, {
        render: "Error uploading photo",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      console.error(err.response?.data || err.message);
    }
  };

  //responsive
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-2 sm:px-4">
      <div className="w-full max-w-xl shadow rounded-2xl p-4 sm:p-6 bg-white">
        {/* Top bar */}
        <div className="flex justify-end items-center mb-4">
          <button
            className="px-3 sm:px-4 py-2 cursor-pointer bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-lg sm:text-lg"
            onClick={() => setShowModal(true)}
          >
            Edit
          </button>
        </div>

        {/* user icon */}
        <div className="flex justify-center mb-3">
          <div className="relative group">
            {profile.vendor?.profilePhoto ? (
              <img
                src={profile.vendor.profilePhoto}
                alt="Profile"
                className="w-24 h-24 sm:w-30 sm:h-30 rounded-full object-cover"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                <User className="w-12 h-12" />
              </div>
            )}

            <label
              htmlFor="profilePhotoInput"
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 text-white flex flex-col items-center justify-center rounded-full transition cursor-pointer text-xs sm:text-sm"
            >
              <Edit className="w-4 h-4 sm:w-5 sm:h-5 mb-1" />
              <span>Edit Photo</span>
            </label>

            <input
              id="profilePhotoInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handlePhotoUpload}
            />
          </div>
        </div>

        {/* Heading */}
        <h3 className="text-center text-lg font-medium mb-4">Vendor Info</h3>

        {/* Display details */}
        <div className="bg-gray-50 p-4 sm:p-6 rounded-xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4">
            {/* Business Name */}
            <div className="font-bold">Business Name</div>
            <div className="mb-5 sm:mb-0">{profile.vendor.businessName}</div>

            {/* Email */}
            <div className="font-bold">Email</div>
            <div className="break-all mb-4 sm:mb-0">{profile.user.email}</div>

            {/* Phone */}
            <div className="font-bold">Phone</div>
            <div className="mb-5 sm:mb-0">{profile.user.phone_number}</div>

            {/* Owner Name */}
            <div className="font-bold">Owner Name</div>
            <div className="mb-5 sm:mb-0">{profile.vendor.ownerName}</div>

            {/* City */}
            <div className="font-bold">City</div>
            <div className="mb-5 sm:mb-0">{profile.vendor.city}</div>

            {/* Service Area */}
            <div className="font-bold">Service Area</div>
            <div className="mb-5 sm:mb-0">{profile.vendor.serviceArea}</div>

            {/* UPI ID */}
            <div className="font-bold">UPI ID</div>
            <div className="break-all mb-5 sm:mb-0">{profile.vendor.upiId || "—"}</div>

            {/* Categories */}
            <div className="font-bold">Categories</div>
            <div className="mb-5 sm:mb-0">{categories}</div>

            {/* Social Media */}
            <div className="font-bold">Social Media</div>
            <div className="break-all mb-5 sm:mb-0">{profile.vendor.socialMedia}</div>
          </div>
        </div>


        {/* Modal popup */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg sm:text-lg font-bold">Edit Profile</h3>
                  <button
                    className="text-gray-500 font-bold text-xl cursor-pointer hover:text-gray-700"
                    onClick={() => setShowModal(false)}
                  >
                    ✕
                  </button>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 max-h-[70vh] overflow-y-auto"
                >
                  <div className="p-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <label className="flex flex-col">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        User Phone<span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        name="phone_number"
                        required
                        value={formData.phone_number}
                        onChange={handleChange}
                        className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        UPI ID<span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        name="upiId"
                        required
                        value={formData.upiId}
                        placeholder="Enter UPI ID"
                        onChange={handleChange}
                        className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        Business Name<span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        required
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        Owner Name<span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        required
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        City<span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                      />
                    </label>

                    <label className="flex flex-col">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        Service Area<span className="text-red-500">*</span>
                      </span>
                      <input
                        type="text"
                        required
                        name="serviceArea"
                        value={formData.serviceArea}
                        onChange={handleChange}
                        className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                      />
                    </label>

                    <label className="flex flex-col relative sm:col-span-2">
                      <span className="text-base sm:text-md mb-1 font-medium text-gray-700">
                        New Password
                        <span className="text-gray-900 ml-0.5 text-xs">(optional)</span>
                      </span>
                      <div className="relative">
                        <input
                          type={showPassword ? "text" : "password"}
                          name="password"
                          placeholder="Enter new Password"
                          value={formData.password}
                          onChange={handleChange}
                          className="outline-1 hover:outline-2 hover:outline-[#E69B83] rounded-lg px-4 py-2 w-full"
                        />
                        <ShowHideButton
                          show={showPassword}
                          onToggle={() => setShowPassword((prev) => !prev)}
                        />
                      </div>
                    </label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="px-3 sm:px-4 py-2 cursor-pointer bg-gray-300 rounded-xl hover:bg-gray-400 text-sm sm:text-base"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-3 cursor-pointer sm:px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 text-sm sm:text-base"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

}
