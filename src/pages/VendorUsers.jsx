import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { generateStrongPassword } from "../utils/passwordGenerator";
import { toast } from "react-toastify";
import { VendorUserForm } from "../components/VendorUserForm";

function VendorUsers() {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone_number: "",
    businessName: "",
    ownerName: "",
    city: "",
    serviceArea: "",
    categories: "",
    othersCategories: "",
  });
  

  const [userExists, setUserExists] = useState(false);
  const modeLabel = useMemo(() => (userExists ? "Update User" : "Create User"), [userExists]);

  useEffect(() => {
    // If route param looks like an email, prefill it immediately so the form shows it
    const looksLikeEmail = /@/.test(vendorId || "");
    if (looksLikeEmail) {
      setFormData(prev => ({ ...prev, email: decodeURIComponent(vendorId) }));
    }

    const fetchVendor = async () => {
      try {
        setLoading(true);
        setError("");
        const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";

        // If vendorId looks like an email, resolve vendor by email first
        let resolvedVendor = null;
        const looksLikeEmail = /@/.test(vendorId);
        if (looksLikeEmail) {
          const listRes = await fetch(`${base}/api/admin/vendors`, { credentials: "include" });
          if (listRes.ok) {
            const list = await listRes.json();
            resolvedVendor = (list.data || []).find(v => (v.email || "").toLowerCase() === decodeURIComponent(vendorId).toLowerCase());
          }
        }

        if (!resolvedVendor) {
          // Try direct fetch by id
          const byIdRes = await fetch(`${base}/api/admin/vendors/${encodeURIComponent(vendorId)}`, { credentials: "include" });
          if (byIdRes.ok) {
            const byIdData = await byIdRes.json();
            resolvedVendor = byIdData.data;
          } else {
            // Fallback: list and match by _id
            const listRes = await fetch(`${base}/api/admin/vendors`, { credentials: "include" });
            if (listRes.ok) {
              const list = await listRes.json();
              resolvedVendor = (list.data || []).find(v => v._id === vendorId);
            }
          }
        }

        if (!resolvedVendor) throw new Error("Vendor not found");
        const vendorData = resolvedVendor;
        setVendor(vendorData);

        setFormData((prev) => ({
          ...prev,
          email: vendorData.email || "",
          phone_number: vendorData.phone || vendorData.phone_number || "",
          businessName: vendorData.businessName || "",
          ownerName: vendorData.ownerName || "",
          city: vendorData.city || "",
          serviceArea: vendorData.serviceArea || "",
          categories: (vendorData.categories || []).join(", "),
          othersCategories: (vendorData.othersCategories || []).join(", "),
        }));

        // Check if user already exists for this vendor
        try {
          const resUsers = await fetch(`${base}/api/admin/users/vendors?vendor_id=${vendorData._id}`, { credentials: "include" });
          if (resUsers.ok) {
            const usersData = await resUsers.json();
            setUserExists(Array.isArray(usersData.data) && usersData.data.length > 0);
          }
        } catch (_) { /* ignore */ }
      } catch (err) {
        setError(err.message || "Failed to load vendor");
      } finally {
        setLoading(false);
      }
    };

    if (vendorId) fetchVendor();
  }, [vendorId]);

  const handleGeneratePassword = () => {
    const newPassword = generateStrongPassword();
    setFormData((prev) => ({ ...prev, password: newPassword }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Email and password are required");
      return;
    }

    if (!formData.businessName || !formData.ownerName || !formData.city || !formData.serviceArea) {
      toast.error("Business Name, Owner Name, City, and Service Area are required");
      return;
    }

    try {
      setCreating(true);

      const categoriesArray = formData.categories
        .split(',')
        .map(cat => cat.trim())
        .filter(Boolean);

      const othersCategoriesArray = formData.othersCategories
        .split(',')
        .map(cat => cat.trim())
        .filter(Boolean);

      const requestData = {
        email: formData.email,
        password: formData.password,
        phone_number: formData.phone_number || undefined,
        vendor_id: vendorId,
        businessName: formData.businessName,
        ownerName: formData.ownerName,
        city: formData.city,
        serviceArea: formData.serviceArea,
        categories: categoriesArray,
        othersCategories: othersCategoriesArray,
      };
      console.log("request    " ,requestData);
      

      const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const endpoint = userExists
        ? `${base}/api/admin/users/vendor/${vendorId}`
        : `${base}/api/admin/users/create-vendor`;
      const method = userExists ? "PUT" : "POST";
      const body = userExists ? JSON.stringify({ ...requestData, vendor_id: vendorId }) : JSON.stringify(requestData);

      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || `Request failed with ${res.status}`);

      toast.success(userExists ? "Vendor user updated successfully!" : "Vendor user created successfully!");

      // Always send email after create or update (with new password if provided)
      try {
        toast.info("Sending email to vendor...", { autoClose: 1500 });
        const emailResponse = await fetch(
          `${import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com"}/api/vendorEmail/send-mail`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
              email: data.data?.email || formData.email,
              password: formData.password || undefined,
              businessName: formData.businessName,
              ownerName: formData.ownerName
            }),
          }
        );
        const emailData = await emailResponse.json();
        if (emailResponse.ok && emailData.success) {
          toast.success("Email sent successfully to vendor");
        } else {
          toast.error(`Email sending failed: ${emailData.message || "Unknown error"}`);
        }
      } catch (emailErr) {
        console.error("Email sending error:", emailErr);
        toast.error("Failed to send email to vendor");
      }

      navigate("/admin");
    } catch (err) {
      console.error("Submit error:", err);
      toast.error(err.message || "Failed to create vendor user");
    } finally {
      setCreating(false);
    }
  };

  if (loading) return <div className="p-4 max-w-3xl mx-auto"><p>Loading vendor information...</p></div>;
  if (error) return (
    <div className="p-4 max-w-3xl mx-auto">
      <div className="text-red-600 mb-3">Error: {error}</div>
      <button onClick={() => navigate("/admin")} className="px-4 py-2 rounded-md border border-gray-500 bg-gray-500 text-white">
        Back to Admin
      </button>
    </div>
  );
  if (!vendor) return (
    <div className="p-4 max-w-3xl mx-auto">
      <p>Vendor not found</p>
      <button onClick={() => navigate("/admin")} className="px-4 py-2 rounded-md border border-gray-500 bg-gray-500 text-white">
        Back to Admin
      </button>
    </div>
  );

  return (
    <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/admin")}
          className="px-4 py-2 rounded-md border border-gray-500 bg-gray-500 text-white mb-4"
        >
          ← Back
        </button>
        <h1 className="text-2xl sm:text-3xl text-center font-bold mb-2">Create Vendor User</h1>
        <p className="text-gray-600 text-sm sm:text-base text-center">
          Create a complete vendor account with all business details
        </p>
      </div>

      {/* Vendor Information */}
      <div className="border border-gray-200 rounded-lg p-4 sm:p-6 bg-gray-50 mb-6 overflow-x-auto">
        <h3 className="text-lg sm:text-xl font-semibold text-center mb-3">Vendor Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm sm:text-base">
          <div><strong>Business Name:</strong> {vendor.businessName}</div>
          <div><strong>Owner:</strong> {vendor.ownerName}</div>
          <div><strong>Email:</strong> {vendor.email}</div>
          <div><strong>Phone:</strong> {vendor.phone}</div>
          <div><strong>City:</strong> {vendor.city}</div>
          <div><strong>Service Area:</strong> {vendor.serviceArea}</div>
          <div><strong>Categories:</strong> {(vendor.categories || []).join(", ")}</div>
          <div>
            <strong>Status:</strong>
            <span className="ml-2 px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs sm:text-sm">
              {vendor.status}
            </span>
          </div>
        </div>
      </div>

  
      <VendorUserForm
      id={vendorId}
        formData={formData}
        creating={creating}
        userExists={userExists}
        modeLabel={modeLabel}
        handleInputChange={handleInputChange}
        handleGeneratePassword={handleGeneratePassword}
        handleSubmit={handleSubmit}
        onCancel={() => navigate("/admin")}
        isdata={true}
      />

    </div>
  );
}

export default VendorUsers;
