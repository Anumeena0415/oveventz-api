import { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
// import VendorUsersList from "./VendorUsersList"; // Assuming this is commented out or external

// --- New Reusable Component: VendorGrid ---
const ITEMS_PER_PAGE = 6;

const VendorGrid = ({ vendorList, title, showUserStatus = false, colorClass = "text-gray-900", subtitle = null }) => {
  const [showAll, setShowAll] = useState(false);
  
  // Memoize the list to display based on the 'showAll' state
  const displayedVendors = useMemo(() => {
    return showAll ? vendorList : vendorList.slice(0, ITEMS_PER_PAGE);
  }, [vendorList, showAll]);

  const totalCount = vendorList.length;
  const isCapped = totalCount > ITEMS_PER_PAGE;

  if (totalCount === 0) return null;

  return (
    <div className="mb-8">
      <h2 className={`text-xl font-semibold ${colorClass} mb-4`}>
        {title} ({totalCount})
      </h2>

      {subtitle && <p className="text-sm text-gray-600 mb-3">{subtitle}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {displayedVendors.map((v) => {
          const hasUser = v.hasUser; // Reusing the calculated property from the main component
          return (
            <Link
              key={v._id}
              to={`/admin/vendors/${v._id}`}
              className="bg-white border border-gray-200 rounded-lg p-4 shadow hover:shadow-lg transition-shadow duration-200"
            >
              <h3 className="text-lg font-semibold mb-2 truncate">{v.businessName}</h3>
              <p className="text-gray-600 text-sm">Owner: {v.ownerName}</p>
              <p className="text-gray-600 text-sm truncate">Email: {v.email}</p>
              <div className="mt-2 flex items-center gap-2">
                <p
                  className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                    v.status.toLowerCase() === "approved"
                      ? "bg-green-100 text-green-800"
                      : v.status.toLowerCase() === "pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {v.status}
                </p>
                {showUserStatus && v.status.toLowerCase() === "approved" && (
                  <span
                    className={`inline-block px-2 py-1 text-xs font-medium rounded ${
                      hasUser ? "bg-blue-100 text-blue-800" : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {hasUser ? "👤 Has User" : "⚠️ No User"}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {isCapped && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(prev => !prev)}
            className="px-6 py-2 bg-indigo-500 text-white font-medium rounded-lg hover:bg-indigo-600 transition shadow-md"
          >
            {showAll ? `Show Less (Showing ${totalCount})` : `Show All (${totalCount} Total)`}
          </button>
        </div>
      )}
    </div>
  );
};
// --- End VendorGrid Component ---


function Admin() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [vendorSearch, setVendorSearch] = useState("");
  const [vendorUsers, setVendorUsers] = useState([]); // Kept for reference, but not directly used in the list filtering now
  const [usersError, setUsersError] = useState(""); // Kept for reference
  const [vendorUserEmails, setVendorUserEmails] = useState(new Set());


  
  useEffect(() => {
    const controller = new AbortController();
   

    const fetchAll = async () => {
      try {
        setLoading(true);
        setError("");
        const base =
          import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        const token = localStorage.getItem("authToken");
        
        if (!token) {
          throw new Error("Access token required");
        }

        const vendorsRes = await fetch(`${base}/api/admin/vendors`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          credentials: "include",
          signal: controller.signal,
        });
        if (!vendorsRes.ok) {
          const body = await vendorsRes.json().catch(() => ({}));
          throw new Error(body.message || `Vendors failed with ${vendorsRes.status}`);
        }
        const vendorsData = await vendorsRes.json();
        setVendors(Array.isArray(vendorsData?.data) ? vendorsData.data : []);

        // fetch vendor users
        try {
          setUsersError("");
          const usersRes = await fetch(`${base}/api/admin/users/vendors`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            },
            credentials: "include",
            signal: controller.signal,
          });
          if (!usersRes.ok) {
            const body = await usersRes.json().catch(() => ({}));
            throw new Error(body.message || `Users failed with ${usersRes.status}`);
          }
          const usersData = await usersRes.json();
          setVendorUsers(Array.isArray(usersData?.data) ? usersData.data : []);

          // Create a set of vendor user emails for quick lookup
          const emailSet = new Set((Array.isArray(usersData?.data) ? usersData.data : []).map(u => String(u.email || "").toLowerCase().trim()));
          setVendorUserEmails(emailSet);
        } catch (ue) {
          if (ue.name !== "AbortError") setUsersError(ue.message || "Failed to load vendor users");
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load data");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
    return () => controller.abort();
  }, []);

  // --- Filtering and Grouping Logic ---
  const normalizedQuery = String(vendorSearch || "").toLowerCase().trim();
console.log("Vendor User Emails Set:", vendorUserEmails);
  
  // Map vendors and add the 'hasUser' property for easy filtering
  const vendorsWithUserStatus = vendors.map(v => ({
    ...v,
    status: v.status || '',
    email: v.email || '',
    // hasUser: vendorUserEmails.has(String(v.email || "").toLowerCase().trim())
  }));

  const filteredVendors = normalizedQuery
    ? vendorsWithUserStatus.filter((v) => {
      const owner = String(v.ownerName || "").toLowerCase();
      const email = String(v.email || "").toLowerCase();
      return owner.includes(normalizedQuery) || email.includes(normalizedQuery);
    })
    : vendorsWithUserStatus;
  const pending = filteredVendors.filter(
    (v) => (v.status || "").toLowerCase() === "pending"
  );
  
  const approved = filteredVendors.filter(
    (v) => (v.status || "").toLowerCase() === "approved" 
  );
  
  const rejected = filteredVendors.filter(
    (v) => (v.status || "").toLowerCase() === "rejected"
  );

  // Separate approved vendors into those with and without user accounts
  const approvedWithUsers = approved.filter(v => v.hasUser);
console.log("Filtered Vendors:", approved.filter(v => v.id=="68ff207405add9709184387c"));
  const approvedWithoutUsers = approved.filter(v => !v.hasUser);
 // --- End Filtering and Grouping Logic ---

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-extrabold text-gray-900 mb-6">Admin Vendor Dashboard</h1>

      {loading && <p className="text-indigo-600">Loading vendors...</p>}
      {error && <div className="text-red-600 mb-4 font-medium">Error loading vendors: {error}</div>}
      {usersError && <div className="text-red-600 mb-4 text-sm">User list sync error: {usersError}</div>}


      <input
        value={vendorSearch}
        onChange={(e) => setVendorSearch(e.target.value)}
        placeholder="Search by owner name or email..."
        className="w-full border border-gray-300 rounded-lg p-3 mb-8 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition shadow-sm"
      />

      {/* Pending Vendors */}
      <VendorGrid
        vendorList={pending}
        title="Pending Applications"
        colorClass="text-yellow-700"
        subtitle="Review these applications as they await approval or rejection."
      />

      {/* Approved Vendors (Grouped) */}
      {approved.length > 0 && (
        <div className="mb-8 p-4 border rounded-lg bg-gray-50">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Approved Vendors ({approved.length})</h2>

          {/* Approved without users */}
          <VendorGrid
            vendorList={approvedWithoutUsers}
            title="Approved - Awaiting User Account"
            colorClass="text-orange-700"
            showUserStatus={true}
            subtitle="⚠️ These vendors are approved but need their login accounts created."
          />

          {/* Approved with users */}
          <VendorGrid
            vendorList={approvedWithUsers}
            title="Approved - User Account Ready"
            colorClass="text-blue-700"
            showUserStatus={true}
            subtitle="👤 These vendors are fully set up with a user account."
          />
        </div>
      )}

      {/* Rejected Vendors */}
      <VendorGrid
        vendorList={rejected}
        title="Rejected Applications"
        colorClass="text-red-700"
        subtitle="These vendors were previously rejected."
      />

      {/* The VendorUsersList component is now imported at the top but remains commented out in the JSX */}
    </div>
  );
}

export default Admin; 