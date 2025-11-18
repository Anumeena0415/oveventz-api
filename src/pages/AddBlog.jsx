import React, { useState, useCallback, useEffect } from 'react';
import { Upload, X, CheckCircle, AlertTriangle, ArrowLeft } from 'lucide-react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { ButtonLoading } from '../components/Loading';

// Custom Modal Component to replace alert()
const AlertModal = ({ message, type, onClose }) => {
    const getIcon = () => {
        if (type === 'success') return <CheckCircle className="w-8 h-8 text-green-500" />;
        if (type === 'error') return <AlertTriangle className="w-8 h-8 text-red-500" />;
        return <AlertTriangle className="w-8 h-8 text-yellow-500" />;
    };
    const getTitle = () => {
        if (type === 'success') return 'Success!';
        if (type === 'error') return 'Error!';
        return 'Missing Data';
    };
    const getBgColor = () => {
        if (type === 'success') return 'bg-green-100';
        if (type === 'error') return 'bg-red-100';
        return 'bg-yellow-100';
    };
    
    const icon = getIcon();
    const title = getTitle();
    const bgColor = getBgColor();

    if (!message) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 transition-opacity duration-300">
            <div className="bg-white rounded-xl shadow-2xl p-6 w-full max-w-sm transform scale-100 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                    <div className={`p-3 rounded-full ${bgColor}`}>
                        {icon}
                    </div>
                </div>
                <h3 className="text-xl font-bold text-gray-800 text-center mb-2">{title}</h3>
                <p className="text-gray-600 text-center mb-6 whitespace-pre-line">{message}</p>
                <button
                    onClick={onClose}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const AddBlog = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        para: '',
        image: '',
    });
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [modal, setModal] = useState({ message: '', type: '' });
    const [uploading, setUploading] = useState(false);
    
    const data = location.state?.data || "";
    const isEditMode = !!data && !!data._id;
    console.log("Blog data:", data, "Edit mode:", isEditMode);

    useEffect(() => {
        if (data && data._id) {
            setFormData({
                title: data.title || '',
                image: data.image || '',
                para: data.para || ''
            });
            // Clear any existing file preview when loading edit data
            setImageFile(null);
            setPreviewUrl(prev => {
                if (prev) {
                    URL.revokeObjectURL(prev);
                }
                return '';
            });
        }
    }, [data]);

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

    // Determine the current image source for preview and submission
    const getImagePreviewUrl = () => {
        if (previewUrl) return previewUrl; // File preview takes priority
        if (!formData.image) return '';
        
        // Handle base64 data URLs
        if (formData.image.startsWith('data:image/')) {
            return formData.image;
        }
        
        // Handle HTTP/HTTPS URLs
        if (formData.image.startsWith('http://') || formData.image.startsWith('https://')) {
            return formData.image;
        }
        
        // Handle relative paths - prepend BASE_URL
        const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
        if (formData.image.startsWith('/uploads/')) {
            return `${BASE_URL}${formData.image}`;
        }
        if (formData.image.startsWith('uploads/')) {
            return `${BASE_URL}/${formData.image}`;
        }
        return `${BASE_URL}/${formData.image}`;
    };
    
    const finalPreviewUrl = getImagePreviewUrl();
    const hasImage = !!imageFile || !!formData.image?.trim();
    const isFileUploadDisabled = !!formData.image?.trim();
    const isUrlInputDisabled = !!imageFile;

    const handleSubmit = async (data) => {
        // Try multiple backend URLs for local development
        const BACKEND_URLS = [
            import.meta.env.VITE_BACKEND_URL,
            "http://localhost:3000",
            "https://ovevents.onrender.com"
        ].filter(Boolean);
        
        const BASE_URL = BACKEND_URLS[0] || "https://ovevents.onrender.com";
        
        try {
            setUploading(true);
            let imageUrl = formData.image;

            // If a file is selected, upload it to Cloudinary first
            if (imageFile) {
                const formDataUpload = new FormData();
                formDataUpload.append("file", imageFile);

                let uploadRes;
                let uploadError;
                
                // Try each backend URL until one works
                for (const url of BACKEND_URLS) {
                    try {
                        uploadRes = await fetch(`${url}/api/upload`, {
                            method: "POST",
                            body: formDataUpload,
                        });

                        if (uploadRes.ok) {
                            break; // Success, exit loop
                        }
                    } catch (err) {
                        uploadError = err;
                        continue; // Try next URL
                    }
                }

                if (!uploadRes || !uploadRes.ok) {
                    const status = uploadRes?.status || 'Connection failed';
                    const errorText = await uploadRes?.text().catch(() => '') || '';
                    console.error("Upload error:", { status, errorText, uploadError });
                    throw new Error(`Image upload failed (${status}). Please ensure backend server is running on port 3000.`);
                }

                const uploadData = await uploadRes.json();
                
                if (!uploadData.success || !uploadData.url) {
                    throw new Error(uploadData.message || "Failed to get image URL from server");
                }
                
                imageUrl = uploadData.url;
                console.log("Image uploaded successfully:", imageUrl);
            }

            // Prepare final form data with image URL
            const finalFormData = {
                title: formData.title,
                para: formData.para,
                image: imageUrl
            };

            if (isEditMode && data._id) {
                const updateResponse = await axios.put(`${BASE_URL}/blog/update/${data._id}`, finalFormData);
                console.log("Blog updated successfully:", updateResponse.data);
            } else {
                const createResponse = await axios.post(`${BASE_URL}/blog/createBlog`, finalFormData);
                console.log("Blog created successfully:", createResponse.data);
            }

            setModal({
                message: `Blog post successfully ${isEditMode ? 'updated' : 'created'}!\n\nTitle: ${formData.title}\nImage Source: ${imageFile ? 'Uploaded File' : (formData.image?.startsWith('data:image/') ? 'Base64 Image' : 'External URL')}`,
                type: 'success'
            });

            // Reset form
            setFormData({ title: '', para: '', image: '' });
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
            setImageFile(null);
            setPreviewUrl('');
            
            setTimeout(() => {
                navigate(-1);
                window.scrollTo({ top: 0, behavior: "smooth" });
            }, 1500);
        } catch (error) {
            console.error("Error:", error);
            setModal({
                message: error?.message || "Failed to save blog post. Please try again.",
                type: 'error'
            });
        } finally {
            setUploading(false);
        }
    }

    return (
        <>
            <AlertModal
                message={modal.message}
                type={modal.type}
                onClose={() => setModal({ message: '', type: '' })}
            />

            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-2xl transform transition-all duration-500">
                    <div className="flex justify-between">
                        <a className='inline-flex items-center bg-gray-700 hover:bg-gray-800 px-4 py-2 text-white rounded-lg text-sm mb-6 transition' href="/admin">
                            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Admin
                        </a>
                        <a className="inline-flex items-center mb-6 transition  px-3 py-1 rounded-md bg-[#f58e6c] hover:bg-[#e96a40] text-white" href="/manageBlogs">Manage Blogs</a>
                    </div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
                        {isEditMode ? 'Edit Blog Post' : 'Create New Blog Post'}
                    </h1>

                    <div className="space-y-6">

                        <h2 className='text-xl font-bold text-gray-700'>Featured Image Source (Choose One)</h2>

                        {/* Image URL Input */}
                        <div>
                            <label htmlFor="imageUrl" className={`block text-sm font-medium mb-2 ${isUrlInputDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                                Image URL (Paste Link)
                            </label>
                            <input
                                type="url"
                                id="imageUrl"
                                name="image"
                                value={formData.image}
                                // onChange={handleTextChange}
                                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                                placeholder="https://example.com/image.jpg"
                                disabled={isUrlInputDisabled}
                                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150 text-sm ${isUrlInputDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                            />
                            {isUrlInputDisabled && (
                                <p className='text-xs text-red-500 mt-1'>Clear uploaded file to use a URL.</p>
                            )}
                        </div>

                        <div className='flex items-center my-4'>
                            <div className='flex-grow border-t border-gray-300'></div>
                            <span className='mx-4 text-gray-500 text-sm font-semibold'>OR</span>
                            <div className='flex-grow border-t border-gray-300'></div>
                        </div>

                        {/* File Upload Input */}
                        <div className={`p-4 border-2 border-dashed rounded-xl ${isFileUploadDisabled ? 'border-gray-300 bg-gray-50' : 'border-blue-300 bg-blue-50'}`}>
                            <label htmlFor="imageUpload" className={`block text-sm font-semibold mb-2 ${isFileUploadDisabled ? 'text-gray-400' : 'text-blue-700'}`}>
                                <Upload className="w-4 h-4 inline mr-2 align-text-bottom" /> Upload Local File
                            </label>

                            {!imageFile && !formData.image?.trim() ? (
                                <div className={`flex flex-col items-center justify-center h-32 ${isFileUploadDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                    onClick={() => !isFileUploadDisabled && document.getElementById('imageUpload').click()}>
                                    <Upload className={`w-8 h-8 mb-2 ${isFileUploadDisabled ? 'text-gray-400' : 'text-blue-500'}`} />
                                    <p className={`text-sm font-medium ${isFileUploadDisabled ? 'text-gray-500' : 'text-blue-600'}`}>
                                        {isFileUploadDisabled ? 'Clear URL input to upload file' : 'Click to select image file'}
                                    </p>
                                    <p className="text-gray-500 text-xs">PNG, JPG, up to 10MB</p>
                                </div>
                            ) : (
                                <div className="relative w-full h-48 rounded-lg overflow-hidden group">
                                    <img
                                        src={finalPreviewUrl}
                                        alt="Preview"
                                        className="w-full h-full object-cover transition duration-300"
                                        onError={(e) => {
                                            console.error("Upload section image load error:", finalPreviewUrl);
                                            e.target.onerror = null;
                                            e.target.src = "https://placehold.co/600x400/FF5733/FFFFFF?text=Image+Load+Failed";
                                        }}
                                    />
                                    <button
                                        onClick={handleRemoveImage}
                                        className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-100 transition duration-200 transform hover:scale-110 shadow-lg"
                                        title="Remove Image"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                    {!imageFile && formData.image?.trim() && (
                                        <div className="absolute bottom-2 left-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                            Current Image
                                        </div>
                                    )}
                                </div>
                            )}

                            <input
                                type="file"
                                id="imageUpload"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                disabled={isFileUploadDisabled}
                            />
                        </div>


                        {/* Title Input */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                                Blog Title
                            </label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                placeholder="Enter your compelling blog title"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150 text-lg font-semibold"
                            />
                        </div>

                        {/* Paragraph Input */}
                        <div>
                            <label htmlFor="paragraph" className="block text-sm font-medium text-gray-700 mb-2">
                                Content
                            </label>
                            <textarea
                                id="paragraph"
                                name="para"
                                value={formData.para}
                                onChange={(e) => setFormData({ ...formData, para: e.target.value })}
                                placeholder="Write your full blog content here..."
                                rows="10"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-blue-200 focus:border-blue-500 outline-none transition duration-150 resize-none"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            onClick={() => handleSubmit(data)}
                            disabled={uploading || !formData.title?.trim() || !formData.para?.trim() || !hasImage}
                            className={`w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 transform hover:scale-[1.01] active:scale-95 shadow-lg shadow-green-200 flex items-center justify-center ${
                                uploading || !formData.title?.trim() || !formData.para?.trim() || !hasImage
                                    ? 'opacity-50 cursor-not-allowed' : ''
                            }`}
                        >
                            {uploading ? <ButtonLoading /> : (isEditMode ? "Update Blog" : "Publish Blog Post")}
                        </button>
                    </div>

                    {/* Preview Section */}
                    {(formData.title || formData.para || finalPreviewUrl) && (
                        <div className="mt-10 pt-8 border-t-4 border-blue-400 border-opacity-50">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-l-4 border-blue-500 pl-3">Live Preview</h2>

                            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                                {finalPreviewUrl && (
                                    <div className="mb-4">
                                        <img
                                            src={finalPreviewUrl}
                                            alt="Featured Image Preview"
                                            className="w-full h-64 object-cover rounded-xl shadow-md"
                                            // Handle broken URL images gracefully
                                            onError={(e) => {
                                                console.error("Preview image load error:", finalPreviewUrl);
                                                e.target.onerror = null;
                                                e.target.src = "https://placehold.co/600x400/FF5733/FFFFFF?text=Image+Load+Failed";
                                            }}
                                        />
                                        <p className="text-sm text-gray-500 mt-2 text-center">
                                            {imageFile 
                                                ? `Local File: ${imageFile.name}` 
                                                : formData.image?.startsWith('data:image/')
                                                    ? 'Base64 Image'
                                                    : 'External URL loaded'}
                                        </p>
                                    </div>
                                )}

                                <h3 className="text-3xl font-extrabold text-gray-900 mb-3 leading-snug">
                                    {formData.title || "Your Title Will Appear Here..."}
                                </h3>

                                <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                                    {formData.para || "Start typing your engaging blog content above to see the live preview here."}
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

// Main App Component for single-file structure
export default function App() {
    return <AddBlog />;
}