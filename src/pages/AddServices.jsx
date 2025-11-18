import React, { useState } from 'react';
import { Upload, Link2, X, DollarSign, Star, FileText, Camera } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ButtonLoading } from '../components/Loading';

const CorporateBuffetForm = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    rating: '',
    image: '',
    category: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageMode, setImageMode] = useState('upload');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setForm({ ...form, image: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (form.image) {
      setUploadedImage(null);
    }
  };

  const handleRemoveImage = () => {
    setUploadedImage(null);
    setForm({ ...form, image: '' });
  };

  const handleSubmit = async () => {
    if (loading) return; // Prevent double submission
    setLoading(true);
    
    const formData = {
      title: form.title,
      description: form.description,
      price: parseFloat(form.price),
      rating: parseFloat(form.rating),
      image: uploadedImage || form.image,
      category: form.category
    };
    
    try {
      // Dummy API endpoint - Replace with your actual API
     const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
     const API_URL = `${BASE_URL}/api/eventplan/addServices`;
      console.log("formdata --------------",formData);
      
      
      // Using fetch instead of axios (no external dependency needed)
     const response = await axios.post(API_URL, formData)
      
      console.log("response---", response)
        
      alert('Form submitted successfully! Check console for response data.');
      
      // Reset form after successful submission
      setForm({
        title: '',
        description: '',
        price: '',
        rating: '',
        image: '',
        category: ''
      });
      setUploadedImage(null);
      
    } catch (error) {
      console.error('❌ Error:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  const navigate = useNavigate()

  const handleClick = () =>{
    navigate('/manageServices')
  }

  const displayImage = uploadedImage || form.image;

  return (
    <div className="min-h-screen bg-gradient-to-br bg-white py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className='flex justify-between '>
        <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=>navigate(-1)}>Back</button>
        <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=>handleClick()}>Handle all services</button>
        </div>
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-orange-100 rounded-full mb-4">
            <Camera className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Add New Menu Item
          </h1>
          <p className="text-gray-600 text-lg">
            Create your corporate buffet menu with all the details
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 border border-gray-100">
          <div className="space-y-8">
            
            {/* Title Field */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-orange-600" />
                Menu Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="e.g., Corporate Grand Buffet (Per Plate)"
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
              />
            </div>

            {/* Price and Rating Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Price Field */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  Price (₹) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.price}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                      setForm({ ...form, price: value });
                    }
                  }}
                  placeholder="950"
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-green-500 focus:outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
                />
              </div>

              {/* Rating Field */}
              <div className="relative">
                <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                  Rating <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={form.rating}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || (/^\d*\.?\d*$/.test(value) && parseFloat(value) <= 5)) {
                      setForm({ ...form, rating: value });
                    }
                  }}
                  placeholder="4.8"
                  required
                  className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-yellow-500 focus:outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
                />
              </div>
            </div>

            {/* Category Field */}
            <div className="relative">
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-purple-600" />
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
                required
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-purple-500 focus:outline-none transition-all text-gray-800 bg-gray-50 hover:bg-white"
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

            {/* Image Upload Section */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Camera className="w-4 h-4 text-purple-600" />
                Menu Image <span className="text-red-500">*</span>
              </label>
              
              {/* Image Mode Toggle */}
              <div className="flex gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`flex-1 py-3 px-5 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    imageMode === 'upload'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Upload className="w-5 h-5 inline mr-2" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`flex-1 py-3 px-5 rounded-xl font-semibold transition-all transform hover:scale-105 ${
                    imageMode === 'url'
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Link2 className="w-5 h-5 inline mr-2" />
                  Image URL
                </button>
              </div>

              {/* Upload Mode */}
              {imageMode === 'upload' && (
                <div className="border-3 border-dashed border-gray-300 rounded-2xl p-12 text-center hover:border-orange-400 transition-all bg-gradient-to-br from-gray-50 to-white hover:shadow-lg">
                  <input
                    type="file"
                    id="file-upload"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-orange-200 rounded-full flex items-center justify-center mb-5 transform hover:scale-110 transition-transform">
                      <Upload className="w-10 h-10 text-orange-600" />
                    </div>
                    <p className="text-gray-800 font-semibold text-lg mb-2">
                      Click to upload buffet image
                    </p>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG, WEBP up to 10MB
                    </p>
                  </label>
                </div>
              )}

              {/* URL Mode */}
              {imageMode === 'url' && (
                <div className="flex gap-3">
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://example.com/buffet-image.jpg"
                    className="flex-1 px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Load
                  </button>
                </div>
              )}

              {/* Image Preview */}
              {displayImage && (
                <div className="mt-6 relative group">
                  <div className="relative rounded-2xl overflow-hidden border-4 border-gray-200 shadow-xl">
                    <img
                      src={displayImage}
                      alt="Preview"
                      className="w-full h-80 object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-full hover:bg-red-600 transition-all shadow-lg transform hover:scale-110"
                    >
                      <X className="w-6 h-6" />
                    </button>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <p className="text-white font-semibold text-center">
                        ✓ Image loaded successfully
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label className="block text-sm font-bold text-gray-800 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Impress your corporate guests with a lavish multi-cuisine buffet..."
                required
                rows={5}
                className="w-full px-5 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none resize-none transition-all text-gray-800 placeholder-gray-400 bg-gray-50 hover:bg-white"
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {form.description.length} characters
                </p>
                {form.description.length > 100 && (
                  <span className="text-xs text-green-600 font-semibold">✓ Good length</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="button"
              onClick={handleSubmit}
              disabled={loading || !form.title || !form.description || !form.price || !form.rating || !form.category || (!uploadedImage && !form.image)}
              className="w-full py-5 bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white font-bold text-lg rounded-xl hover:from-orange-600 hover:via-orange-700 hover:to-red-600 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-2xl hover:shadow-orange-500/50 disabled:shadow-none flex items-center justify-center"
            >
              {loading ? <ButtonLoading size="lg" /> : (!form.title || !form.description || !form.price || !form.rating || !form.category || (!uploadedImage && !form.image))
                ? '⚠ Please fill all required fields'
                : '🎉 Submit Menu Item'}
            </button>
          </div>
        </div>

        {/* API Info Card */}
        {/* <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-lg mb-2">
                🔌 API Integration
              </h3>
              <p className="text-sm text-blue-800 mb-2">
                Currently using dummy API: <code className="bg-blue-200 px-2 py-1 rounded text-xs">jsonplaceholder.typicode.com/posts</code>
              </p>
              <p className="text-sm text-blue-700">
                Replace the <code className="bg-blue-200 px-2 py-1 rounded text-xs">API_URL</code> in the code with your actual backend endpoint to start posting real data.
              </p>
            </div>
          </div>
        </div> */}

        {/* Info Card */}
        {/* <div className="mt-4 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-orange-200 rounded-2xl p-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Camera className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="font-bold text-orange-900 text-lg mb-2">
                📸 Image Guidelines
              </h3>
              <ul className="text-sm text-orange-800 space-y-1">
                <li>• Use high-quality food images for better appeal</li>
                <li>• Recommended resolution: 1200x800 pixels or higher</li>
                <li>• You can upload from your device or provide an image URL</li>
                <li>• Ensure the image showcases the buffet attractively</li>
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default CorporateBuffetForm;