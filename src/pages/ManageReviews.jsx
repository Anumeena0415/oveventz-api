import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, X, Save, Star, Upload } from "lucide-react";
import { Loading, ButtonLoading } from "../components/Loading";

const ManageReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    text: "",
    stars: 5,
    image: "",
    isActive: true
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";

  useEffect(() => {
    fetchReviews();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle file selection
  const handleFileChange = useCallback((e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // Create preview URL from file
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      // Clear URL input when file is selected
      setFormData(prev => ({ ...prev, image: '' }));
    }
  }, []);

  const handleRemoveImage = useCallback(() => {
    if (previewUrl && imageFile) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, image: '' }));
  }, [previewUrl, imageFile]);

  const fetchReviews = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/api/admin/reviews`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        setReviews(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (uploading) return; // Prevent double submission
    try {
      setUploading(true);
      const token = localStorage.getItem("authToken");
      let imageUrl = formData.image;

      // If a file is selected, upload it to Cloudinary first
      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append("file", imageFile);

        const uploadRes = await fetch(`${BASE_URL}/api/upload`, {
          method: "POST",
          body: formDataUpload,
        });

        if (!uploadRes.ok) {
          throw new Error("Image upload failed");
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Prepare final form data with image URL
      const finalFormData = {
        ...formData,
        image: imageUrl
      };
      
      if (editingReview) {
        // Update existing review
        const response = await axios.put(
          `${BASE_URL}/api/admin/reviews/${editingReview._id}`,
          finalFormData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          toast.success("Review updated successfully");
          fetchReviews();
          resetForm();
        }
      } else {
        // Create new review
        const response = await axios.post(
          `${BASE_URL}/api/admin/reviews`,
          finalFormData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          toast.success("Review created successfully");
          fetchReviews();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving review:", error);
      toast.error(error.response?.data?.message || "Failed to save review");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (review) => {
    setEditingReview(review);
    setFormData({
      name: review.name || "",
      role: review.role || "",
      text: review.text || "",
      stars: review.stars || 5,
      image: review.image || "",
      isActive: review.isActive !== undefined ? review.isActive : true
    });
    // Clear file upload state when editing
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) {
      return;
    }

    try {
      setDeletingId(id);
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${BASE_URL}/api/admin/reviews/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success("Review deleted successfully");
        await fetchReviews();
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete review");
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      role: "",
      text: "",
      stars: 5,
      image: "",
      isActive: true
    });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setEditingReview(null);
    setShowModal(false);
  };

  // Determine the current image source for preview
  const finalPreviewUrl = previewUrl || formData.image;
  const hasImage = !!imageFile || !!formData.image?.trim();
  const isFileUploadDisabled = !!formData.image?.trim();
  const isUrlInputDisabled = !!imageFile;

  if (loading) {
    return <Loading message="Loading reviews..." />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Manage Reviews</h1>
          <button
            onClick={() => {
              resetForm();
              setShowModal(true);
            }}
            className="flex items-center gap-2 bg-[#E69B83] hover:bg-[#f48965] text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Add New Review
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <div
              key={review._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.stars ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(review)}
                    disabled={deletingId === review._id || deletingId !== null}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    <Edit size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(review._id)}
                    disabled={deletingId === review._id || deletingId !== null}
                    className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                  >
                    {deletingId === review._id ? <ButtonLoading size="sm" /> : <Trash2 size={18} />}
                  </button>
                </div>
              </div>

              <p className="text-gray-600 mb-4 text-sm italic line-clamp-3">{review.text}</p>

              <div className="flex items-center gap-3">
                <img
                  src={review.image}
                  alt={review.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-sm">{review.name}</h3>
                  <p className="text-gray-500 text-xs">{review.role}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                <span className={`px-2 py-1 rounded ${review.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                  {review.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {reviews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No reviews found. Add your first review!</p>
          </div>
        )}
      </div>

      {/* Modal for Add/Edit Review */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">
                {editingReview ? "Edit Review" : "Add New Review"}
              </h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Role *
                </label>
                <input
                  type="text"
                  required
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                  placeholder="e.g., Wedding Planning, Corporate Event"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Review Text *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.text}
                  onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                  placeholder="Enter the review text..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Stars (1-5) *
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max="5"
                  value={formData.stars}
                  onChange={(e) => setFormData({ ...formData, stars: parseInt(e.target.value) })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Image *
                </label>
                
                {/* File Upload Option */}
                <div className="mb-3">
                  <label
                    htmlFor="imageUpload"
                    className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg p-4 cursor-pointer transition-colors ${
                      isFileUploadDisabled
                        ? "border-gray-300 bg-gray-50 cursor-not-allowed"
                        : "border-[#E69B83] hover:bg-[#E69B83]/5"
                    }`}
                  >
                    <Upload className="w-5 h-5 text-[#E69B83]" />
                    <span className="text-sm text-gray-600">
                      {imageFile ? "File Selected" : "Click to upload image"}
                    </span>
                  </label>
                  <input
                    type="file"
                    id="imageUpload"
                    name="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    disabled={isFileUploadDisabled}
                  />
                  {imageFile && (
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="mt-2 text-sm text-red-600 hover:text-red-700"
                    >
                      Remove file
                    </button>
                  )}
                </div>

                {/* OR Divider */}
                <div className="flex items-center my-3">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-sm text-gray-500">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* URL Input Option */}
                <div>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    disabled={isUrlInputDisabled}
                    className={`w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83] ${
                      isUrlInputDisabled ? "bg-gray-50 cursor-not-allowed" : ""
                    }`}
                    placeholder="Enter image URL"
                  />
                  {!hasImage && (
                    <p className="mt-1 text-xs text-red-500">
                      Please upload an image or provide an image URL
                    </p>
                  )}
                </div>

                {/* Image Preview */}
                {finalPreviewUrl && (
                  <div className="mt-4 relative inline-block">
                    <img
                      src={finalPreviewUrl}
                      alt="Preview"
                      className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                    {hasImage && (
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <span className="text-sm font-medium text-gray-700">Active</span>
                </label>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={uploading || !hasImage}
                  className={`flex-1 flex items-center justify-center px-4 py-2 rounded-lg ${
                    uploading || !hasImage
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#E69B83] hover:bg-[#f48965]"
                  } text-white`}
                >
                  {uploading ? <ButtonLoading /> : (
                    <>
                      <Save size={20} />
                      <span className="ml-2">{editingReview ? "Update Review" : "Create Review"}</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={uploading}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageReviews;

