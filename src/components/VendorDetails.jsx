import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { VendorUserForm } from "./VendorUserForm";

function VendorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [vendor, setVendor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [viewer, setViewer] = useState(null); 
  const [saving, setSaving] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [checkingUser, setCheckingUser] = useState(false);
  const [isModel,setIsModal]=useState(false)
  const [msg, setMsg] = useState('');
  const handleMsgChange = (newMsg) => {
    setMsg(newMsg);
    // console.log("msgggg",newMsg)
  };
  const detectTypeFromExt = (url = "") => {
    const lower = String(url).toLowerCase();
    if (/(\.png|\.jpg|\.jpeg|\.gif|\.webp|\.avif)$/.test(lower)) return "image";
    if (/(\.mp4|\.webm|\.ogg)$/.test(lower)) return "video";
    if (/(\.pdf)$/.test(lower)) return "pdf";
    return "unknown";
  };

  const detectTypeFromMime = (mime = "") => {
    if (!mime) return null;
    if (mime.startsWith("image/")) return "image";
    if (mime.startsWith("video/")) return "video";
    if (mime === "application/pdf") return "pdf";
    return null;
  };
  

  const openPreview = async (url, title) => {
    try {
      const isCloudinary = url.includes("res.cloudinary.com");
      let res = isCloudinary
        ? await fetch(url, { mode: "cors", credentials: "omit" })
        : await fetch(url, { credentials: "include" });

      if (!res.ok) throw new Error(`Failed to load file (${res.status})`);
      const contentType = res.headers.get("content-type") || "";
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const type = detectTypeFromMime(contentType) || detectTypeFromExt(url);
      setViewer({ url: objectUrl, type, title, isObjectUrl: true });
    } catch (e) {
      console.error("Preview failed:", e);
      const type = detectTypeFromExt(url);
      setViewer({ url, type, title, isObjectUrl: false });
    }
  };

  const downloadFile = async (url, filenameHint = "download") => {
    try {
      const isCloudinary = url.includes("res.cloudinary.com");
      let res = isCloudinary
        ? await fetch(url, { mode: "cors", credentials: "omit" })
        : await fetch(url, { credentials: "include" });

      if (!res.ok) throw new Error(`Failed with ${res.status}`);
      const blob = await res.blob();
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = filenameHint;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    } catch (e) {
      console.error("Download failed:", e);
      try {
        window.open(url, "_blank");
      } catch (_) {
        alert("Download failed. Please try right-clicking the link and selecting 'Save as'.");
      }
    }
  };

  const getFilenameFromUrl = (url = "", fallback = "download") => {
    try {
      const u = new URL(url, window.location.origin);
      let filename = u.pathname.split("/").pop() || "";
      if (url.includes("res.cloudinary.com")) {
        const pathParts = u.pathname.split("/");
        if (pathParts.length > 2) {
          const cloudinaryFilename = pathParts[pathParts.length - 1];
          if (cloudinaryFilename && cloudinaryFilename.includes(".")) filename = cloudinaryFilename;
        }
      }
      return filename.trim() || fallback;
    } catch (_) {
      const parts = String(url).split("?")[0].split("/");
      return parts[parts.length - 1] || fallback;
    }
  };

  const closePreview = () => {
    if (viewer?.isObjectUrl && viewer?.url) {
      try {
        URL.revokeObjectURL(viewer.url);
      } catch (_) { }
    }
    setViewer(null);
  };

  const checkUserExists = async (email) => {
    if (!email) return;
    try {
      setCheckingUser(true);
      const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await fetch(`${base}/api/admin/users/vendors?search=${encodeURIComponent(email)}`, { credentials: "include" });
      if (res.ok) {
        const data = await res.json();
        const exists = data.data?.some(u => u.email?.toLowerCase() === email.toLowerCase());
        setUserExists(exists);
      }
    } catch (e) {
      console.error("Error checking user existence:", e);
      setUserExists(false);
    } finally {
      setCheckingUser(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const fetchVendor = async () => {
      try {
        setLoading(true);
        setError("");
        const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        const res = await fetch(`${base}/api/admin/vendors/${id}`, {
          credentials: "include",
          signal: controller.signal,
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || `Failed with ${res.status}`);
        }
        const responseData = await res.json();
        setVendor(responseData.data);
        if (responseData.data?.email) checkUserExists(responseData.data.email);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message || "Failed to load vendor");
      } finally {
        setLoading(false);
      }
    };
    fetchVendor();
    return () => controller.abort();
  }, [id]);

  const updateStatus = async (nextStatus) => {
    try {
      setSaving(true);
      const base = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const res = await fetch(`${base}/api/admin/vendors/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: nextStatus }), 
        credentials: "include",
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.message || `Failed with ${res.status}`);
      }
      
      const { data } = await res.json();
      setVendor((prev) => ({ ...prev, status: data.status }));
    } catch (e) {
      alert(e.message || "Failed to update status");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-4">Loading vendor details…</div>;
  if (error)
    return (
      <div className="p-4">
        <div className="text-red-600 mb-4">Error: {error}</div>
        <div className="text-sm text-gray-500">
          <p>Debug info:</p>
          <ul className="list-disc ml-6">
            <li>Backend URL: {import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com"}</li>
            <li>Vendor ID: {id}</li>
            <li>Environment: {import.meta.env.MODE}</li>
          </ul>
        </div>
      </div>
    );
  if (!vendor) return <div className="p-4">No vendor found.</div>;

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 bg-gray-200 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg p-4 shadow">
        <h1 className="text-2xl font-bold mb-3">{vendor.businessName || "N/A"}</h1>

        {/* Status buttons */}
        <div className="flex flex-wrap gap-2 mb-3">
          {(() => {
            const statusLower = String(vendor.status || "").toLowerCase();
            return (
              <>
                {statusLower === "approved" && (
                  <>
                    <button
                      // onClick={() => {updateStatus("rejected"); setIsModal(true)}}
                      onClick={()=>setIsModal(true)}
                      disabled={saving}
                      className={`px-3 py-1 ${isModel? "hidden" :""} rounded bg-red-500 text-white hover:bg-red-600 transition`}
                    >
                      Reject
                      
                    </button>

                    {!checkingUser && (
                      <button
                        onClick={() => navigate(`/admin/vendor-users/${vendor._id || id}`)}
                        className="px-3 py-1 rounded bg-blue-500 text-white hover:bg-blue-600 transition"
                      >
                        {userExists ? "Update User" : "Create User"}
                      </button>
                    )}
                    {userExists && (
                      <span className="px-3 py-1 rounded bg-green-100 border border-green-500 text-green-800 text-xs flex items-center gap-1">
                        👤 User Account Exists
                      </span>
                    )}
                    {checkingUser && (
                      <span className="px-3 py-1 rounded bg-gray-100 border border-gray-300 text-gray-600 text-xs">
                        Checking user status...
                      </span>
                    )}
                  </>
                )}
                {statusLower === "rejected" && (
                  <button
                    onClick={() => updateStatus("approved")}
                    disabled={saving}
                    className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                  >
                    Approve
                  </button>
                )}
                {statusLower === "pending" && (
                  <>
                    <button
                      onClick={() =>{ updateStatus("approved");setIsModal(false)}}
                      disabled={saving}
                      className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600 transition"
                    >
                      Approve
                    </button>
                    <button
                      // onClick={() => updateStatus("rejected")}
                      onClick={()=>{ updateStatus("reject");setIsModal(true)}}
                      disabled={saving}
                      className={`px-3 py-1 rounded ${isModel?'hidden':""} bg-red-500 text-white hover:bg-red-600 transition`}
                    >
                      Reject
                    </button>
                  </>
                )}
              </>
            );
          })()}
        </div> 
      {isModel ? <VendorUserForm id={id} formData={vendor} isModel={isModel} update={()=>updateStatus()} onMsgChange={handleMsgChange} />: ""}


        {/* Vendor info grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-1">
            <p><strong>Owner:</strong> {vendor.ownerName || "N/A"}</p>
            <p><strong>Email:</strong> {vendor.email || "N/A"}</p>
            <p><strong>Phone:</strong> {vendor.phone || "N/A"}</p>
            <p>
              <strong>Status:</strong>{" "}
              <span
                className={`px-2 py-0.5 rounded-full text-xs ${vendor.status === "approved" ? "bg-green-100 text-green-700" :
                    vendor.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                      "bg-red-100 text-red-700"
                  }`}
              >
                {vendor.status || "N/A"}
                {vendor.status === "approved" && userExists && <span className="ml-1 text-[10px]">👤</span>}
              </span>
            </p>
            <p><strong>City:</strong> {vendor.city || "N/A"}</p>
            <p><strong>Service Area:</strong> {vendor.serviceArea || "N/A"}</p>
          </div>
          <div className="space-y-1">
            <p><strong>Categories:</strong> {Array.isArray(vendor.categories) ? vendor.categories.join(", ") : "N/A"}</p>
            {vendor.socialMedia && (
              // <p>
              //   <strong>Social Media:</strong>{" "}
              //   <a href={vendor.socialMedia} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">{vendor.socialMedia}</a>
              // </p>
              <p className="break-words max-w-full">
                <strong>Social Media:</strong>{" "}
                {vendor.socialMedia ? (
                  <a
                    href={vendor.socialMedia}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {vendor.socialMedia}
                  </a>
                ) : (
                  "N/A"
                )}
              </p>

            )}
            <p><strong>Active:</strong> {vendor.isActive ? "Yes" : "No"}</p>
            <p><strong>Created:</strong> {vendor.createdAt ? new Date(vendor.createdAt).toLocaleString() : "-"}</p>
            <p><strong>Updated:</strong> {vendor.updatedAt ? new Date(vendor.updatedAt).toLocaleString() : "-"}</p>
          </div>
        </div>

        {/* Bank details, media, documents, packages */}
        <div className="space-y-4">
          {vendor.bankDetails && (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="font-semibold mb-2">Bank Details</div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div><strong>Account Holder:</strong> {vendor.bankDetails.accountHolder || "-"}</div>
                <div><strong>Account Number:</strong> {vendor.bankDetails.accountNumber || "-"}</div>
                <div><strong>IFSC Code:</strong> {vendor.bankDetails.ifsc || "-"}</div>
              </div>
            </div>
          )}

          {/* Images and Videos */}
          {(vendor.images?.length || vendor.videos?.length) && (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              {vendor.images?.length > 0 && (
                <div className="mb-3">
                  <div className="font-medium mb-2">Images ({vendor.images.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {vendor.images.map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-white border border-gray-300 rounded">
                        <button onClick={() => openPreview(url, `Image ${idx + 1}`)} className="text-blue-600 text-sm">View {idx + 1}</button>
                        <button onClick={() => downloadFile(url, getFilenameFromUrl(url, `image-${idx + 1}`))} className="text-gray-600 text-xs">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {vendor.videos?.length > 0 && (
                <div>
                  <div className="font-medium mb-2">Videos ({vendor.videos.length})</div>
                  <div className="flex flex-wrap gap-2">
                    {vendor.videos.map((url, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-2 bg-white border border-gray-300 rounded">
                        <button onClick={() => openPreview(url, `Video ${idx + 1}`)} className="text-blue-600 text-sm">View {idx + 1}</button>
                        <button onClick={() => downloadFile(url, getFilenameFromUrl(url, `video-${idx + 1}`))} className="text-gray-600 text-xs">Download</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Documents */}
          {vendor.documents && Object.keys(vendor.documents).length > 0 && (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="font-semibold mb-2">Documents</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(vendor.documents).map(([key, arr]) =>
                  Array.isArray(arr) && arr.length > 0 ? (
                    <div key={key} className="bg-white p-2 rounded border border-gray-300">
                      <div className="font-medium mb-2 capitalize">{key} ({arr.length})</div>
                      <div className="flex flex-col gap-1">
                        {arr.map((url, idx) => (
                          <div key={idx} className="flex items-center gap-2 p-1 bg-gray-50 rounded">
                            <button onClick={() => openPreview(url, `${key} ${idx + 1}`)} className="text-blue-600 text-sm">View {idx + 1}</button>
                            <button onClick={() => downloadFile(url, getFilenameFromUrl(url, `${key}-${idx + 1}`))} className="text-gray-600 text-xs">Download</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : null
                )}
              </div>
            </div>
          )}

          {/* Packages */}
          {vendor.packages?.length > 0 && (
            <div className="bg-gray-50 p-3 rounded border border-gray-200">
              <div className="font-semibold mb-2">Service Packages ({vendor.packages.length})</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {vendor.packages.map((p, idx) => (
                  <div key={idx} className="bg-white border border-gray-300 rounded p-3">
                    <div className="font-semibold text-lg mb-1 text-gray-900">{p.title}</div>
                    <div className="text-green-600 text-xl font-medium mb-1">₹{p.price}</div>
                    <div className="text-gray-700 mb-1 leading-snug">{p.description}</div>
                    {p.inclusions && <div className="text-gray-500 text-sm"><strong>Inclusions:</strong> {p.inclusions}</div>}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>


      {/* Viewer Modal */}
      {viewer && (
        <div
          onClick={closePreview}
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-black rounded-lg max-w-[90vw] max-h-[90vh] w-full sm:w-[80vw] lg:w-[70vw] p-3 text-white flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold">{viewer.title || "Preview"}</div>
              <button onClick={closePreview} className="text-white text-lg">✕</button>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-auto bg-black">
              {viewer.type === "image" && <img src={viewer.url} alt={viewer.title} className="max-w-full max-h-[80vh]" />}
              {viewer.type === "video" && <video src={viewer.url} controls className="max-w-full max-h-[80vh]" />}
              {viewer.type === "pdf" && <iframe src={viewer.url} title={viewer.title} className="w-full h-[80vh]" />}
              {!["image", "video", "pdf"].includes(viewer.type) && <div>Cannot preview file</div>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default VendorDetails;














