import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Plus, Edit, Trash2, X, Save, Camera, Upload, Link2, DollarSign, Star, FileText } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Loading, ButtonLoading } from "../components/Loading";

const ManageServices = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [imageMode, setImageMode] = useState('upload');
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    image: ""
  });

  const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";

  useEffect(() => {
    fetchServices();
  }, []);

  // Cleanup preview URL on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const fetchServices = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(`${BASE_URL}/api/admin/services`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        console.log("Services fetched:", response.data.data);
        setServices(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      toast.error("Failed to load services");
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setFormData(prev => ({ ...prev, image: '' }));
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl && imageFile) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setFormData(prev => ({ ...prev, image: '' }));
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

      // Prepare final form data
      const finalFormData = {
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        category: formData.category,
        image: imageUrl
      };

      if (editingService) {
        // Update existing service
        const response = await axios.put(
          `${BASE_URL}/api/admin/services/${editingService._id}`,
          finalFormData,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.data.success) {
          toast.success("Service updated successfully");
          fetchServices();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Error saving service:", error);
      toast.error(error.response?.data?.message || "Failed to save service");
    } finally {
      setUploading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title || "",
      description: service.description || "",
      price: service.price?.toString() || "",
      rating: service.rating?.toString() || "",
      category: service.category || "",
      image: service.image || ""
    });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) {
      return;
    }

    try {
      setDeletingId(id);
      const token = localStorage.getItem("authToken");
      const response = await axios.delete(`${BASE_URL}/api/admin/services/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.data.success) {
        toast.success("Service deleted successfully");
        await fetchServices();
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      toast.error("Failed to delete service");
    } finally {
      setDeletingId(null);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      price: "",
      rating: "",
      category: "",
      image: ""
    });
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setImageFile(null);
    setPreviewUrl('');
    setEditingService(null);
    setShowModal(false);
  };

  const finalPreviewUrl = previewUrl || formData.image;
  const hasImage = !!imageFile || !!formData.image?.trim();
  const isFileUploadDisabled = !!formData.image?.trim();
  const isUrlInputDisabled = !!imageFile;

  if (loading) {
    return <Loading message="Loading services..." />;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Manage Services</h1>
          <div className="flex gap-3">
            <button
              onClick={() => navigate('/addService')}
              className="flex items-center gap-2 bg-[#E69B83] hover:bg-[#f48965] text-white px-4 py-2 rounded-lg"
            >
              <Plus size={20} />
              Add New Service
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {service.image ? (
                <img
                  src={
                    service.image.startsWith('data:image/')
                      ? service.image
                      : service.image.startsWith('http://') || service.image.startsWith('https://')
                        ? service.image 
                        : service.image.startsWith('/uploads/')
                          ? `${BASE_URL}${service.image}`
                          : service.image.startsWith('uploads/')
                            ? `${BASE_URL}/${service.image}`
                            : `${BASE_URL}/${service.image}`
                  }
                  alt={service.title || 'Service image'}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    console.error("Image load error for service:", service.title, "Image URL:", service.image);
                    e.target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <Camera className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-lg font-bold text-[#E69B83]">₹{service.price?.toLocaleString('en-IN')}</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-sm font-medium">{service.rating}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                    {service.category}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(service)}
                      disabled={deletingId === service._id || deletingId !== null}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(service._id)}
                      disabled={deletingId === service._id || deletingId !== null}
                      className="p-2 text-red-600 hover:bg-red-50 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-1"
                    >
                      {deletingId === service._id ? <ButtonLoading size="sm" /> : <Trash2 size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {services.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No services found. Add your first service!</p>
          </div>
        )}
      </div>

      {/* Modal for Edit Service */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4" style={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}>
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-200">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold">Edit Service</h2>
              <button
                onClick={resetForm}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-orange-600" />
                  Menu Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                    Rating *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    max="5"
                    step="0.1"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-purple-600" />
                  Category *
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                >
                  <option value="">Select a category</option>
                  <option value="Weddings">Weddings</option>
                  <option value="Birthday">Birthday</option>
                  <option value="Corporate">Corporate</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Theme Parties">Theme Parties</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <Camera className="w-4 h-4 text-purple-600" />
                  Menu Image *
                </label>
                
                {/* Image Mode Toggle */}
                <div className="flex gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageMode('upload')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      imageMode === 'upload'
                        ? 'bg-[#E69B83] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Upload className="w-4 h-4 inline mr-2" />
                    Upload File
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageMode('url')}
                    className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all ${
                      imageMode === 'url'
                        ? 'bg-[#E69B83] text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <Link2 className="w-4 h-4 inline mr-2" />
                    Image URL
                  </button>
                </div>

                {/* Upload Mode */}
                {imageMode === 'upload' && (
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
                )}

                {/* URL Mode */}
                {imageMode === 'url' && (
                  <div className="mb-3">
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
                  </div>
                )}

                {/* Image Preview */}
                {finalPreviewUrl && (
                  <div className="mt-4 relative inline-block">
                    <img
                      src={
                        finalPreviewUrl.startsWith('data:image/')
                          ? finalPreviewUrl
                          : finalPreviewUrl.startsWith('http://') || finalPreviewUrl.startsWith('https://')
                            ? finalPreviewUrl 
                            : finalPreviewUrl.startsWith('/uploads/') || finalPreviewUrl.startsWith('uploads/')
                              ? `${BASE_URL}${finalPreviewUrl.startsWith('/') ? '' : '/'}${finalPreviewUrl}`
                              : finalPreviewUrl
                      }
                      alt="Preview"
                      className="w-32 h-32 rounded-lg object-cover border-2 border-gray-300"
                      onError={(e) => {
                        console.error("Preview image load error:", finalPreviewUrl);
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
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-blue-600" />
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#E69B83]"
                  placeholder="Enter service description..."
                />
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
                      <span className="ml-2">Update Service</span>
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

export default ManageServices;

