import { useEffect, useState } from "react";

function VendorUsersList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [active, setActive] = useState("");
  const [refreshTick, setRefreshTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError("");
        const params = new URLSearchParams();
        if (search) params.set("search", search);
        if (active !== "") params.set("active", active);
        const qs = params.toString();
        const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        const url = `${base}/api/admin/users/vendors${qs ? `?${qs}` : ""}`;
        const res = await fetch(url, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Request failed with ${res.status}`);
        }
        const data = await res.json();
        setUsers(Array.isArray(data?.data) ? data.data : []);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
    return () => controller.abort();
  }, [search, active, refreshTick]);

  useEffect(() => {
    const handleRefresh = () => setRefreshTick((t) => t + 1);
    window.addEventListener("vendor-users-refresh", handleRefresh);
    return () => window.removeEventListener("vendor-users-refresh", handleRefresh);
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Vendor Users</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by email"
          className="border rounded px-3 py-2 w-full sm:w-72"
        />
        <select
          value={active}
          onChange={(e) => setActive(e.target.value)}
          className="border rounded px-3 py-2 w-full sm:w-40"
        >
          <option value="">All Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
        </select>
      </div>

      {loading && <div className="text-gray-600">Loading...</div>}
      {error && <div className="text-red-600 mb-3">{error}</div>}

      {!loading && users.length === 0 && !error && (
        <div className="text-gray-600">No users found.</div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((u) => (
          <div key={u._id} className="border rounded-lg p-4 bg-white shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">{u.email}</div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${u.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-700'}`}>{u.is_active ? 'Active' : 'Inactive'}</span>
            </div>
            <div className="text-sm text-gray-700 space-y-1">
              <div><span className="font-medium">Role:</span> {u.role}</div>
              {u.phone_number && <div><span className="font-medium">Phone:</span> {u.phone_number}</div>}
              <div><span className="font-medium">Vendor:</span> {u.vendor_id?.businessName || '-'} ({u.vendor_id?.status || '-'})</div>
              <div><span className="font-medium">City:</span> {u.vendor_id?.city || '-'}</div>
              <div><span className="font-medium">Service Area:</span> {u.vendor_id?.serviceArea || '-'}</div>
              <div className="text-xs text-gray-500">Created: {u.createdAt ? new Date(u.createdAt).toLocaleString() : '-'}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VendorUsersList;
