import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Utility: Generates a strong password
const generateStrongPassword = () => {
  const length = 12;
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Utility: Validates the password against complex rules
const validatePassword = (password) => {
  const errors = [];
  if (password.length < 8)
    errors.push("Password must be at least 8 characters long.");
  if (!/[A-Z]/.test(password))
    errors.push("Password must contain at least one uppercase letter.");
  if (!/[a-z]/.test(password))
    errors.push("Password must contain at least one lowercase letter.");
  if (!/[0-9]/.test(password))
    errors.push("Password must contain at least one number.");
  if (!/[!@#$%^&*()_+]/.test(password))
    errors.push("Password must contain at least one special character.");
  return {
    isValid: errors.length === 0,
    errors: errors,
  };
};

// Icon: Simple Show/Hide button component - Eye Open
const EyeIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
// Icon: Simple Show/Hide button component - Eye Closed
const EyeOffIcon = ({ size = 20, color = "currentColor" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-10-7-10-7A11.02 11.02 0 0 1 3.4 8.4M9.94 9.94a2.91 2.91 0 0 0 4.12 4.12M12 10a2 2 0 1 0 0 4M21 12s-3 7-10 7c-2.09 0-4.06-.8-5.74-2.26" />
    <line x1="1" x2="23" y1="1" y2="23" />
  </svg>
);
// Component: Button to toggle password visibility
const ShowHideButton = ({ show, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
    aria-label={show ? "Hide password" : "Show password"}
  >
    {show ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
  </button>
);

/**
 * VendorUserForm Component
 * Renders a form for either User Creation (with password generation) or User Rejection (with comment).
 * * @param {object} props
 * @param {object} props.formData - Contains all vendor details.
 * @param {boolean} props.isModel - If true, renders the rejection/comment UI. If false, renders password creation UI.
 * @param {function} props.update - Callback function for the 'Reject' action in isModel mode. Receives status ('reject' or 'approve').
 */
export const VendorUserForm = ({
  formData = {
    // Updated default structure to include vendor details
    email: "user@example.com",
    businessName: "Default Business",
    owner: "Default Owner",
    phone: "N/A",
    city: "N/A",
    serviceArea: "N/A",
    categories: "N/A",
    status: "pending",
  },
  isModel,
  id,
  update,
  onMsgChange,
}) => {
  console.log("id", id);
  const [msg, setMsg] = useState("");
  // We only need local state for the editable fields (password or comment)
  const [localPassword, setLocalPassword] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // Mocking a toast/status notification system
  const [statusMessage, setStatusMessage] = useState({ type: null, text: "" });
  const navigate = useNavigate();

  const headingText = isModel
    ? "Reject Vendor Application"
    : "Complete User Creation";
  const submitLabel = isModel ? "Reject" : "Create User";

  // Mock navigation function
  const navigateToAuth = useCallback(() => {
    // In a real app: navigate("/vendor-auth");
    setStatusMessage({
      type: "info",
      text: "Simulating Cancel/Navigation action.",
    });
    // Clear form fields
    setLocalPassword("");
  }, []);

  // New mock function for "Back" button
  const handleBack = useCallback(() => {
    setStatusMessage({ type: "info", text: "Simulating Back action." });
    // In a real app, this would likely call a parent function to change the view/route
  }, []);

  // Handles generating a new strong password
  const handlePasswordGeneration = useCallback(() => {
    const newPassword = generateStrongPassword();
    setLocalPassword(newPassword);
    setStatusMessage({
      type: "info",
      text: "New strong password generated and ready for submission.",
    });
  }, []);

  const updateStatus = async (nextStatus) => {
    try {
      const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      console.log("base url-", `${base}/api/admin/vendors/${id}/status`);
      const res = await fetch(`${base}/api/admin/vendors/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: nextStatus,
          hasUser: nextStatus === "approved" ? true : false,
        }),
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        console.log("-----------res", res);
        throw new Error(body.message || `Failed with ${res.status}`);
      }
      console.log("res-", res);
    } catch (e) {
      alert(e.message || "Failed to update status");
    }
  };
  // Handles the form submission (either API call or update callback)
  const handleFormSubmit = async (actionType) => {
    console.log("actionType", actionType);
    if (actionType === "createUser") {
      console.log("formData", localPassword);
      const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const saveData = await axios.post(`${base}/api/save-data`, {
        email: formData.email,
        password: localPassword,
      });
      console.log("saveData", saveData);
    }

    // 1. Rejection/Comment Mode
    if (isModel) {
      console.log("reject modal call--");
      const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const data = await axios.post(`${base}/api/send-msg`, {
        email: formData.email,
        msg: msg,
      });
      // console.log("email-----", formData.email);
      updateStatus("rejected");
      navigate("/admin");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    } else {
      // 2. User Creation/Password Update Mode
      setStatusMessage({ type: null, text: "" });

      if (!formData.email || !localPassword) {
        setStatusMessage({
          type: "error",
          text: "Email or Password is missing.",
        });
        return;
      }

      const { isValid, errors } = validatePassword(localPassword);
      if (!isValid) {
        setStatusMessage({ type: "error", text: errors[0] });
        return;
      }

      try {
        setIsUpdating(true);
        const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        
        // Step 1: Update vendor status to approved
        await updateStatus("approved");
        console.log("Vendor approved ✅");

        // Step 2: Send email with credentials using the vendorEmail endpoint (better template)
        setStatusMessage({
          type: "info",
          text: "Sending credentials email to vendor...",
        });

        const emailResponse = await fetch(`${base}/api/vendorEmail/send-mail`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            email: formData.email,
            password: localPassword,
            businessName: formData.businessName || formData.businessName,
            ownerName: formData.owner || formData.ownerName,
          }),
        });

        if (!emailResponse.ok) {
          const errorData = await emailResponse.json().catch(() => ({}));
          throw new Error(
            errorData.message || `Email sending failed with status ${emailResponse.status}.`
          );
        }

        const emailData = await emailResponse.json();
        console.log("Email sent successfully:", emailData);

        // Step 3: Notify parent component
        if (update) update("approved");

        // Step 4: Show success and navigate
        setStatusMessage({
          type: "success",
          text: "User approved and credentials email sent successfully! ✅",
        });

        // Navigate after a short delay to show success message
        setTimeout(() => {
          navigate("/admin");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 2000);

      } catch (err) {
        console.error("Submission Error:", err);
        let errMsg = err.message.includes("fetch")
          ? "Network Error: Ensure your Express server is running."
          : err.message;
        setStatusMessage({ 
          type: "error", 
          text: `Error: ${errMsg}. Vendor status may have been updated but email failed.` 
        });
        // Still navigate even if email fails, but show error
        setTimeout(() => {
          navigate("/admin");
        }, 3000);
      } finally {
        setIsUpdating(false);
      }
    }
  };

  // Helper for Status Badge styling
  const getStatusStyles = (status) => {
    // FIX: Ensure 'status' is a string before calling toLowerCase()
    const normalizedStatus = (status || "").toLowerCase();

    switch (normalizedStatus) {
      case "approved":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col items-center  bg-gray-100 p-4 font-sans">
      {/* Vendor User Form (Password/Comment) */}
      <div
        // onSubmit={handleFormSubmit}
        className="w-full max-w-lg border border-gray-200 rounded-2xl shadow-2xl p-6 sm:p-10 bg-white transition duration-300 transform hover:shadow-3xl"
      >
        <h3 className="text-2xl sm:text-2xl text-center font-bold text-gray-900 mb-6 tracking-tight">
          {headingText}
        </h3>

        {/* Status Message Display */}
        {statusMessage.text && (
          <div
            className={`mb-6 p-4 rounded-xl text-center font-medium transition-all duration-300 ease-in-out ${
              statusMessage.type === "success"
                ? "bg-green-100 text-green-700 border-green-300"
                : statusMessage.type === "error"
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-blue-100 text-blue-700 border-blue-300"
            } border`}
          >
            {statusMessage.text}
          </div>
        )}

        {/* Email Input (Disabled/Pre-filled) - Kept here for submission/clarity, using the email from formData */}
        <div className="mb-6">
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Email Address (to receive credentials)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            disabled={true}
            className="w-full p-3 border border-gray-300 bg-gray-50 rounded-lg text-gray-500 cursor-not-allowed transition focus:ring-0 focus:border-gray-300"
            placeholder="Email address"
          />
        </div>

        {isModel ? (
          /* --- REJECTION / COMMENT MODE --- */
          <>
            <div className="mb-8">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Rejection Comment<span className="text-red-500"> *</span>
              </label>
              <textarea
                name="comment"
                value={msg}
                onChange={(e) => {
                  setMsg(e.target.value);
                  onMsgChange(e.target.value);
                }}
                required
                rows="3"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-red-500 focus:border-red-500 transition shadow-sm resize-none"
                placeholder="State the reason for rejecting this vendor application..."
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8">
              <button
                type="button"
                onClick={navigateToAuth}
                className="order-2 sm:order-1 px-6 py-3 border border-gray-300 rounded-xl bg-white text-gray-600 text-base font-medium hover:bg-gray-50 transition duration-150 shadow-md"
              >
                Cancel
              </button>
              <button
                // type="submit"
                onClick={() => handleFormSubmit("reject")}
                disabled={isUpdating}
                className={`order-1 sm:order-2 px-6 py-3 border rounded-xl text-white text-base font-semibold shadow-lg transition duration-200 
                                ${
                                  isUpdating
                                    ? "bg-red-300 border-red-300 cursor-not-allowed"
                                    : "bg-red-600 border-red-600 hover:bg-red-700 transform hover:scale-[1.02]"
                                }`}
              >
                {isUpdating ? "Rejecting..." : "Reject"}
              </button>
            </div>
          </>
        ) : (
          /* --- USER CREATION / PASSWORD MODE --- */
          <>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                New Password<span className="text-red-500"> *</span>
              </label>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={localPassword}
                    onChange={(e) => setLocalPassword(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg text-sm sm:text-base font-mono pr-12 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm"
                    placeholder="Enter new password or click 'Generate'"
                  />
                  <ShowHideButton
                    show={showPassword}
                    onToggle={() => setShowPassword((prev) => !prev)}
                  />
                </div>
                <button
                  type="button"
                  onClick={handlePasswordGeneration}
                  className="px-4 py-3 border rounded-lg bg-indigo-500 text-white text-sm sm:text-base whitespace-nowrap font-medium hover:bg-indigo-600 transition duration-150 shadow-md transform hover:scale-[1.01]"
                >
                  Generate Password
                </button>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                Password must be at least 8 chars with upper/lower case, number,
                and special character.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-end mt-8 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={navigateToAuth}
                className="order-2 sm:order-1 px-6 py-3 border border-gray-300 rounded-xl bg-white text-gray-600 text-base font-medium hover:bg-gray-50 transition duration-150 shadow-md"
              >
                Cancel
              </button>
              <button
                // type="submit"
                onClick={() => handleFormSubmit("createUser")}
                disabled={isUpdating}
                className={`order-1 sm:order-2 px-6 py-3 border rounded-xl text-white text-base font-semibold shadow-lg transition duration-200 
                                ${
                                  isUpdating
                                    ? "bg-emerald-300 border-emerald-300 cursor-not-allowed"
                                    : "bg-emerald-600 border-emerald-600 hover:bg-emerald-700 transform hover:scale-[1.02]"
                                }`}
              >
                {isUpdating ? "Processing..." : "Create User"}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

// Main App Component for demonstration
const App = () => {
  // Demo State: Toggle between password creation and rejection mode
  const [isModelMode, setIsModelMode] = useState(false);

  // Detailed Mock Data matching the image and the required form fields
  const mockVendorData = {
    email: "kanhameena0427@gmail.com",
    businessName: "test",
    owner: "kanha",
    phone: "8085270415",
    city: "Indore",
    serviceArea: "Indore",
    categories: "Wedding Services",
    status: "approved",
  };

  const handleUpdate = (status, comment) => {
    // NOTE: In a real app, you would use a custom modal instead of alert().
    alert(`Action: ${status}\nComment: ${comment || "N/A"}`);
    setIsModelMode(false); // Go back to default after action
  };

  return (
    <div className="font-sans min-h-screen bg-gray-50">
      <header className="p-4 border-b border-gray-200 bg-white shadow-sm">
        <h1 className="text-xl font-bold text-gray-800">
          Vendor Management Demo
        </h1>
        <div className="mt-2">
          <button
            onClick={() => setIsModelMode(false)}
            className={`mr-3 px-4 py-2 text-sm rounded-lg ${
              !isModelMode
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-150`}
          >
            User Creation Mode
          </button>
          <button
            onClick={() => setIsModelMode(true)}
            className={`px-4 py-2 text-sm rounded-lg ${
              isModelMode
                ? "bg-indigo-500 text-white"
                : "bg-gray-200 text-gray-700"
            } transition duration-150`}
          >
            Rejection Mode
          </button>
        </div>
      </header>
      <VendorUserForm
        formData={mockVendorData}
        isModel={isModelMode}
        update={handleUpdate}
      />
    </div>
  );
};

export default App;
