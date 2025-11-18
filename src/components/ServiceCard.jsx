// import React, { useEffect } from "react";
// import { CheckCircle, ArrowRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function ServiceCard({ image, title, subtitle, desc, deleteButton , _id}) {
//   const navigate = useNavigate();
//   console.log("description", desc);
  
  
  

//   // ✅ Automatically detect whether app is running locally or deployed
//   const BASE_URL =
//     import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";

//   // ✅ If image path is only a filename (from multer), add backend path prefix
//   const imageUrl = image?.startsWith("http")
//     ? image
//     : `${BASE_URL}${image}`;

//   const handleClick = () => {
//     deleteButton ?"" : navigate("/event-planning", { state: { title } });
//   };

// const handleDelete = async (id) => {
//   try {
//     console.log("Deleting plan with ID:", id);

//     const response = await axios.post(`https://ovevents.onrender.com/api/eventplan/deletePlan/${id}`);

//     if (response.status === 200) {
//       console.log(" Plan deleted successfully:", response.data);
//       alert("Plan deleted successfully!");
//     } else {
//       console.warn(" Unexpected response:", response);
//       alert("Something went wrong while deleting the plan.");
//     }

//   } catch (err) {
//     console.error(" Error deleting plan:", err);

//     if (err.response) {
//       const { status } = err.response;
//       if (status === 404) alert("Plan not found!");
//       else if (status === 500) alert("Internal server error. Try again later.");
//       else alert(`Unexpected error: ${status}`);
//     } else if (err.request) {
//       alert("No response from the server. Check your connection.");
//     } else {
//       alert("Error setting up the request: " + err.message);
//     }
//   }
// };

//   return (
//     <div
//       className="bg-white rounded-xl sm:rounded-2xl outline-1 outline-[#E69B83] overflow-hidden hover:outline-2 hover:outline-[#E69B83] hover:shadow-lg hover:shadow-[#E69B83] transition-all duration-300 ease-linear flex flex-col h-full cursor-pointer"
//       onClick={handleClick} 
//     >
//       {/* Image Section */}
//       <div className="relative">
//         <img
//         src={imageUrl}
//          alt={title}
//           className="w-full h-40 sm:h-48 lg:h-52 object-cover"
//           onError={(e) => (e.target.src = "/fallback-image.jpg")} // fallback if image not found
//         />
//         <span className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-white px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full shadow">
//           Premium
//         </span>
//       </div>

//       {/* Content Section */}
//       <div className="p-3 sm:p-4 flex flex-col gap-2 sm:gap-3 flex-1">
//         <div>
//           <h3 className="text-lg sm:text-xl font-bold">{title}</h3>
//           {subtitle && (
//             <p className="text-gray-500 text-xs sm:text-sm mb-2">{description}</p>
//           )}
//           <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
//             {desc}
//           </p>
//         </div>

//         {/* Quality Assured Section */}
//         <div className="mt-auto flex items-center justify-between w-full p-1 rounded-lg">
//           <div className="flex items-center gap-1 sm:gap-2">
//             <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#E69B83]" />
//             <span className="text-sm sm:text-base lg:text-lg font-medium leading-none">
//               Quality Assured
//             </span>
//           </div>
//           {deleteButton ? <button onClick={()=> handleDelete(_id) } className="bg-red-500 rounded-sm text-white px-2 py-1">Delete</button> : ""}
//           <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-[#E69B83]" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ServiceCard;



import React from "react"; 
import { CheckCircle, ArrowRight } from "lucide-react"; 
import { useNavigate } from "react-router-dom"; 
import axios from "axios"; 
 
function ServiceCard({ image, title, subtitle, desc, deleteButton, _id, onEdit, onDelete }) { 
  const navigate = useNavigate(); 
  console.log("description", desc); 
 
  // ✅ Automatically detect whether app is running locally or deployed 
  const BASE_URL = 
    import.meta.env.VITE_BACKEND_URL || 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
      ? "http://localhost:3000" 
      : "https://ovevents.onrender.com"); 

  // ✅ Handle different image URL formats
  const getImageUrl = () => {
    if (!image) return '';
    // Handle base64 data URLs
    if (image.startsWith('data:image/')) return image;
    // Handle HTTP/HTTPS URLs
    if (image.startsWith('http://') || image.startsWith('https://')) return image;
    // Handle relative paths - prepend BASE_URL
    if (image.startsWith('/uploads/')) return `${BASE_URL}${image}`;
    if (image.startsWith('uploads/')) return `${BASE_URL}/${image}`;
    return `${BASE_URL}/${image}`;
  };
  
  const imageUrl = getImageUrl();
 
  const handleClick = () => { 
    deleteButton ? "" : navigate("/event-planning", { state: { title } }); 
  }; 
 
  const handleDelete = async (id) => { 
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    
    try { 
      console.log("Deleting plan with ID:", id); 

      const BASE_URL = import.meta.env.VITE_BACKEND_URL || "https://ovevents.onrender.com";
      const response = await axios.post(`${BASE_URL}/api/eventplan/deletePlan/${id}`); 

      if (response.status === 200) { 
        console.log("Plan deleted successfully:", response.data); 
        alert("Post deleted successfully!"); 
        // Call onDelete callback if provided to refresh the list
        if (onDelete) {
          onDelete();
        }
      } else { 
        console.warn("Unexpected response:", response); 
        alert("Something went wrong while deleting the post."); 
      } 

    } catch (err) { 
      console.error("Error deleting plan:", err); 

      if (err.response) { 
        const { status } = err.response; 
        if (status === 404) alert("Post not found!"); 
        else if (status === 500) alert("Internal server error. Try again later."); 
        else alert(`Unexpected error: ${status}`); 
      } else if (err.request) { 
        alert("No response from the server. Check your connection."); 
      } else { 
        alert("Error setting up the request: " + err.message); 
      } 
    } 
  };
 
  return ( 
    <div 
      className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out flex flex-col h-full cursor-pointer transform hover:-translate-y-1"
      onClick={handleClick}  
    > 
      {/* Image Section with Overlay */} 
      <div className="relative overflow-hidden"> 
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-56 sm:h-64 lg:h-72 object-cover transition-transform duration-500 group-hover:scale-110" 
          onError={(e) => {
            console.error("Image load error for post:", title, "Image URL:", image);
            e.target.onerror = null;
            e.target.src = "https://placehold.co/600x400/FF5733/FFFFFF?text=Image+Not+Found";
          }}
        /> 
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        
        {/* Premium Badge */}
        <span className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 text-sm font-medium rounded-full shadow-lg"> 
          Premium 
        </span> 
        
        {/* Title Overlay on Image */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 drop-shadow-lg">{title}</h3>
          <h2 className="text-white font-bold text-sm">By oveventz</h2>
          {subtitle && (
            <p className="text-white/90 text-sm drop-shadow-md">By {subtitle}</p>
          )}
        </div>  
      </div> 
 
      {/* Content Section */} 
      <div className="p-6 flex flex-col gap-4 flex-1 bg-white"> 
        <div> 
          <p className="text-gray-600 text-sm sm:text-base leading-relaxed"> 
            {desc} 
          </p> 
        </div> 
 
        {/* Quality Assured Section */} 
        <div className="mt-auto flex items-center justify-between w-full pt-4 border-t border-gray-100"> 
          <div className="flex items-center gap-2"> 
            <CheckCircle className="w-5 h-5 text-orange-400" /> 
            <span className="text-base font-medium text-gray-700"> 
              Quality Assured 
            </span> 
          </div> 
          {deleteButton ? (
            <div className="flex gap-2">
              {onEdit && (
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit({ _id, title, desc, image });
                  }} 
                  className="bg-blue-500 hover:bg-blue-600 rounded-lg text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
                >
                  Edit
                </button>
              )}
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(_id);
                }} 
                className="bg-red-500 hover:bg-red-600 rounded-lg text-white px-4 py-2 text-sm font-medium transition-colors duration-200"
              >
                Delete
              </button>
            </div>
          ) : (
            <ArrowRight className="w-6 h-6 text-orange-400 group-hover:translate-x-1 transition-transform duration-200" />
          )}
        </div> 
      </div> 
    </div> 
  ); 
} 
 
export default ServiceCard;