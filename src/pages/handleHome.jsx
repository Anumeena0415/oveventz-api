// import React, { useState } from 'react';
// import { Upload, Link2, X, Image } from 'lucide-react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const HandleHome = () => {
//     const navigate = useNavigate()
//   const [form, setForm] = useState({
//     title: '',
//     desc: '',
//     image: ''
//   });
//   const [uploadedImage, setUploadedImage] = useState(null);
//   const [imageMode, setImageMode] = useState('upload');

//   const handleFileUpload = (e) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setUploadedImage(reader.result);
//         setForm({ ...form, image: '' });
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUrlSubmit = () => {
//     if (form.image) {
//       setUploadedImage(null);
//     }
//   };

//   const handleRemoveImage = () => {
//     setUploadedImage(null);
//     setForm({ ...form, image: '' });
//   };

//   const handleSubmit = async () => {
//   try {
//     const formData = new FormData();
//     formData.append("title", form.title);
//     formData.append("desc", form.desc);

//     if (imageMode === "upload" && uploadedImage) {
//       // Convert base64 → file before appending
//       const response = await fetch(uploadedImage);
//       const blob = await response.blob();
//       formData.append("image", blob, "uploaded_image.jpg");
//     } else if (imageMode === "url" && form.image) {
//       // Send image URL as plain text field
//       formData.append("imageUrl", form.image);
//     }

//     const res = await axios.post(
//       "https://ovevents.onrender.com/api/eventplan/homeScreen",
//       formData,
//       { headers: { "Content-Type": "multipart/form-data" } }
//     );

//     console.log("form data post", res.data);
//     alert("Post uploaded successfully!");
//     setForm({ title: "", image: "", desc: "" });
//     setUploadedImage(null);
//   } catch (err) {
//     console.error("Error posting data:", err);
//     alert("Failed to post data");
//   }
// };


//   const displayImage = uploadedImage || form.image;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <div className='flex justify-between' >
//         <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=> navigate('/admin')}>Back to Admin</button>
//         <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=> navigate('/handlePosts')}>Handle All Posts</button>
//         </div>
//         <div className="text-center mb-10">
//           <h1 className="text-4xl font-bold text-gray-900 mb-3">
//             Create New Post
//           </h1>
//           <p className="text-gray-600 text-lg">
//             Fill in the details below to create your post
//           </p>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
//           <div className="space-y-8">
            
//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 value={form.title}
//                 onChange={(e) => setForm({ ...form, title: e.target.value })}
//                 placeholder="Enter your title here..."
//                 required
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-3">
//                 Image <span className="text-red-500">*</span>
//               </label>
              
//               <div className="flex gap-3 mb-4">
//                 <button
//                   type="button"
//                   onClick={() => setImageMode('upload')}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
//                     imageMode === 'upload'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Upload className="w-4 h-4 inline mr-2" />
//                   Upload File
//                 </button>
//                 <button
//                   type="button"
//                   onClick={() => setImageMode('url')}
//                   className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
//                     imageMode === 'url'
//                       ? 'bg-blue-600 text-white'
//                       : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
//                   }`}
//                 >
//                   <Link2 className="w-4 h-4 inline mr-2" />
//                   Image URL
//                 </button>
//               </div>

//               {imageMode === 'upload' && (
//                 <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
//                   <input
//                     type="file"
//                     id="file-upload"
//                     accept="image/*"
//                     onChange={handleFileUpload}
//                     className="hidden"
//                   />
//                   <label
//                     htmlFor="file-upload"
//                     className="cursor-pointer flex flex-col items-center"
//                   >
//                     <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
//                       <Upload className="w-8 h-8 text-blue-600" />
//                     </div>
//                     <p className="text-gray-700 font-medium mb-1">
//                       Click to upload image
//                     </p>
//                     <p className="text-gray-500 text-sm">
//                       PNG, JPG, GIF up to 10MB
//                     </p>
//                   </label>
//                 </div>
//               )}

//               {imageMode === 'url' && (
//                 <div className="flex gap-2">
//                   <input
//                     type="url"
//                     value={form.image}
//                     onChange={(e) => setForm({ ...form, image: e.target.value })}
//                     placeholder="https://example.com/image.jpg"
//                     className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
//                   />
//                   <button
//                     type="button"
//                     onClick={handleUrlSubmit}
//                     className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
//                   >
//                     Load
//                   </button>
//                 </div>
//               )}

//               {displayImage && (
//                 <div className="mt-4 relative">
//                   <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
//                     <img
//                       src={displayImage}
//                       alt="Preview"
//                       className="w-full h-64 object-cover"
//                     />
//                     <button
//                       type="button"
//                       onClick={handleRemoveImage}
//                       className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
//                     >
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <p className="text-sm text-gray-500 mt-2 text-center">
//                     Image loaded successfully
//                   </p>
//                 </div>
//               )}
//             </div>

//             <div>
//               <label className="block text-sm font-semibold text-gray-700 mb-2">
//                 Description <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={form.desc}
//                 onChange={(e) => setForm({ ...form, desc: e.target.value })}
//                 placeholder="Enter your description here..."
//                 required
//                 rows={6}
//                 className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
//               />
//               <p className="text-sm text-gray-500 mt-2">
//                 {form.desc.length} characters
//               </p>
//             </div>

//             <button
//               type="button"
//               onClick={handleSubmit}
//               disabled={!form.title || !form.desc || (!uploadedImage && !form.image)}
//               className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg"
//             >
//               Submit Post
//             </button>
//           </div>
//         </div>

//         <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
//           <div className="flex items-start gap-3">
//             <Image className="w-5 h-5 text-blue-600 mt-0.5" />
//             <div>
//               <h3 className="font-semibold text-blue-900 mb-1">
//                 Image Guidelines
//               </h3>
//               <p className="text-sm text-blue-700">
//                 You can either upload an image from your device or provide a direct URL to an image. Make sure the image is clear and relevant to your post.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HandleHome;



import React, { useState, useEffect } from 'react';
import { Upload, Link2, X, Image } from 'lucide-react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { ButtonLoading } from '../components/Loading';

const HandleHome = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const editData = location.state?.editData || null;
    const isEditMode = !!editData && !!editData._id;
    
  const [form, setForm] = useState({
    title: '',
    desc: '',
    image: ''
  });
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageMode, setImageMode] = useState('upload');
  const [submitting, setSubmitting] = useState(false);

  // Load edit data when component mounts
  useEffect(() => {
    if (editData && editData._id) {
      setForm({
        title: editData.title || '',
        desc: editData.desc || '',
        image: editData.image || ''
      });
      // If image is a URL, set it in form.image
      if (editData.image && !editData.image.startsWith('data:image/')) {
        setImageMode('url');
      }
    }
  }, [editData]);

  // Predefined title options
  const titleOptions = [
    'Weddings',
    'Birthday',
    'Corporate',
    'Anniversary',
    'Baby Shower',
    'Theme Parties'
  ];

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
    if (submitting) return; // Prevent double submission
    
  try {
    setSubmitting(true);
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
    
    if (isEditMode && editData._id) {
      // Update existing post
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("desc", form.desc);

      if (imageMode === "upload" && uploadedImage) {
        // Convert base64 → file before appending
        const response = await fetch(uploadedImage);
        const blob = await response.blob();
        formData.append("image", blob, "uploaded_image.jpg");
      } else if (imageMode === "url" && form.image) {
        // Send image URL as plain text field
        formData.append("imageUrl", form.image);
      } else if (form.image) {
        // If image exists but wasn't changed, send it as imageUrl
        formData.append("imageUrl", form.image);
      }

      console.log("Updating post with ID:", editData._id);
      console.log("Form data:", {
        title: form.title,
        desc: form.desc,
        imageMode,
        hasImage: !!(uploadedImage || form.image)
      });

      const res = await axios.put(
        `${BASE_URL}/api/eventplan/homeScreen/${editData._id}`,
        formData
        // Don't set Content-Type manually - axios will set it with boundary
      );

      console.log("form data updated", res.data);
      alert("Post updated successfully!");
      navigate('/handlePosts');
    } else {
      // Create new post
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("desc", form.desc);

      if (imageMode === "upload" && uploadedImage) {
        // Convert base64 → file before appending
        const response = await fetch(uploadedImage);
        const blob = await response.blob();
        formData.append("image", blob, "uploaded_image.jpg");
      } else if (imageMode === "url" && form.image) {
        // Send image URL as plain text field
        formData.append("imageUrl", form.image);
      }

      const res = await axios.post(
        `${BASE_URL}/api/eventplan/homeScreen`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      console.log("form data post", res.data);
      alert("Post uploaded successfully!");
      setForm({ title: "", image: "", desc: "" });
      setUploadedImage(null);
    }
  } catch (err) {
    console.error("Error posting data:", err);
    alert(err.response?.data?.message || "Failed to save post");
  } finally {
    setSubmitting(false);
  }
};

  // Handle image display with proper URL formatting
  const getDisplayImage = () => {
    if (uploadedImage) return uploadedImage;
    if (!form.image) return '';
    
    // Handle base64 data URLs
    if (form.image.startsWith('data:image/')) return form.image;
    // Handle HTTP/HTTPS URLs
    if (form.image.startsWith('http://') || form.image.startsWith('https://')) return form.image;
    // Handle relative paths
    const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
    if (form.image.startsWith('/uploads/')) return `${BASE_URL}${form.image}`;
    if (form.image.startsWith('uploads/')) return `${BASE_URL}/${form.image}`;
    return `${BASE_URL}/${form.image}`;
  };
  
  const displayImage = getDisplayImage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className='flex justify-between' >
        <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=> navigate('/admin')}>Back to Admin</button>
        <button className="px-3 py-2 rounded-md bg-[#E69B83] hover:bg-[#f48965] text-white" onClick={()=> navigate('/handlePosts')}>Handle All Posts</button>
        </div>
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </h1>
          <p className="text-gray-600 text-lg">
            {isEditMode ? 'Update the details below to edit your post' : 'Fill in the details below to create your post'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
          <div className="space-y-8">
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <select
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                required
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors bg-white cursor-pointer"
              >
                <option value="" disabled>Select event type...</option>
                {titleOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Image <span className="text-red-500">*</span>
              </label>
              
              <div className="flex gap-3 mb-4">
                <button
                  type="button"
                  onClick={() => setImageMode('upload')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    imageMode === 'upload'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload File
                </button>
                <button
                  type="button"
                  onClick={() => setImageMode('url')}
                  className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                    imageMode === 'url'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Link2 className="w-4 h-4 inline mr-2" />
                  Image URL
                </button>
              </div>

              {imageMode === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors">
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
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Upload className="w-8 h-8 text-blue-600" />
                    </div>
                    <p className="text-gray-700 font-medium mb-1">
                      Click to upload image
                    </p>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </label>
                </div>
              )}

              {imageMode === 'url' && (
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={handleUrlSubmit}
                    className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Load
                  </button>
                </div>
              )}

              {displayImage && (
                <div className="mt-4 relative">
                  <div className="relative rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={displayImage}
                      alt="Preview"
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        console.error("Preview image load error:", displayImage);
                        e.target.onerror = null;
                        e.target.src = "https://placehold.co/600x400/FF5733/FFFFFF?text=Image+Load+Failed";
                      }}
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    {uploadedImage ? 'Image loaded successfully' : (isEditMode ? 'Current image' : 'Image loaded successfully')}
                  </p>
                </div>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={form.desc}
                onChange={(e) => setForm({ ...form, desc: e.target.value })}
                placeholder="Enter your description here..."
                required
                rows={6}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none resize-none"
              />
              <p className="text-sm text-gray-500 mt-2">
                {form.desc.length} characters
              </p>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={submitting || !form.title || !form.desc || (!uploadedImage && !form.image)}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg flex items-center justify-center"
            >
              {submitting ? <ButtonLoading /> : (isEditMode ? 'Update Post' : 'Submit Post')}
            </button>
          </div>
        </div>

        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Image className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 mb-1">
                Image Guidelines
              </h3>
              <p className="text-sm text-blue-700">
                You can either upload an image from your device or provide a direct URL to an image. Make sure the image is clear and relevant to your post.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HandleHome;