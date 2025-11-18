import { useState, useRef } from "react";
import { toast } from "react-toastify";

const FileUpload = ({
  label,
  description,
  onFileSelect,
  initialFiles = [],
  initialUrls = [],
  required = false,
}) => {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState(initialFiles);
  const [uploadedUrls, setUploadedUrls] = useState(initialUrls);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [youtubeUrl, setYoutubeUrl] = useState("");


  const handleFileChange = async (e) => {
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) {
      if (onFileSelect) onFileSelect(null, []);
      return;
    }

    const isVideoUpload = label.toLowerCase().includes("video");
    const maxCount = isVideoUpload ? 2 : 5;
    const maxSize = isVideoUpload ? 50 * 1024 * 1024 : 100 * 1024 * 1024;

    const allFilesPreview = [...files, ...selectedFiles];
    if (allFilesPreview.length > maxCount) {
      toast.error(
        `You can upload a maximum of ${maxCount} ${isVideoUpload ? "videos" : "images"
        }`
      );
      return;
    }

    // size limit
    const oversized = selectedFiles.filter((f) => f.size > maxSize);
    if (oversized.length > 0) {
      setError(
        `File(s) exceed ${isVideoUpload ? "50" : "100"} MB limit: ${oversized
          .map((f) => f.name)
          .join(", ")}`
      );
      toast.error(`File(s) exceed ${isVideoUpload ? "50" : "100"} MB limit`);
      return;
    }

    const allFiles = [...files, ...selectedFiles];
    setFiles(allFiles);
    setError("");

    if (onFileSelect) {
      await uploadFilesToCloudinary(selectedFiles, allFiles);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const uploadFilesToCloudinary = async (filesToUpload, allFiles) => {
    setUploading(true);
    const urls = [...uploadedUrls];

    try {
      for (let file of filesToUpload) {
        const fd = new FormData();
        fd.append("file", file);

        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL ||
          "https://ovevents.onrender.com"
          }/api/upload`,
          {
            method: "POST",
            body: fd,
          }
        );

        if (!res.ok) {
          throw new Error(`Upload failed: ${res.statusText}`);
        }

        const data = await res.json();
        urls.push(data.url);
      }

      setUploadedUrls(urls);
      if (onFileSelect) {
        onFileSelect(urls, allFiles);
      }
      toast.success("Files uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      const message = error?.message || "Upload failed";
      setError(message);
      toast.error(message);
      if (onFileSelect) onFileSelect(null, []);
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    const updatedFiles = files.filter((_, index) => index !== indexToRemove);
    const updatedUrls = uploadedUrls.filter((_, index) => index !== indexToRemove);

    setFiles(updatedFiles);
    setUploadedUrls(updatedUrls);

    if (onFileSelect) {
      onFileSelect(updatedUrls.length > 0 ? updatedUrls : null, updatedFiles);
    }
  };

  const getFileIcon = (fileName) => {
    const ext = fileName.split(".").pop()?.toLowerCase();
    if (["jpg", "jpeg", "png", "gif", "webp"].includes(ext)) return "🖼️";
    if (["mp4", "avi", "mov", "wmv"].includes(ext)) return "🎥";
    if (["pdf", "doc", "docx"].includes(ext)) return "📄";
    return "📁";
  };

  const isVideoUpload = label.toLowerCase().includes("video");

  const handleYoutubeUrlAdd = () => {
    if (!youtubeUrl.trim()) {
      toast.error("Please enter a YouTube URL");
      return;
    }

    // Validate YouTube URL
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
    if (!youtubeRegex.test(youtubeUrl.trim())) {
      toast.error("Please enter a valid YouTube URL");
      return;
    }

    const maxCount = isVideoUpload ? 2 : 5;
    if (uploadedUrls.length >= maxCount) {
      toast.error(`You can add a maximum of ${maxCount} ${isVideoUpload ? "videos" : "images"}`);
      return;
    }

    const newUrls = [...uploadedUrls, youtubeUrl.trim()];
    setUploadedUrls(newUrls);
    if (onFileSelect) {
      onFileSelect(newUrls, files);
    }
    setYoutubeUrl("");
    toast.success("YouTube URL added successfully");
  };

  const handleRemoveUrl = (indexToRemove) => {
    const updatedUrls = uploadedUrls.filter((_, index) => index !== indexToRemove);
    setUploadedUrls(updatedUrls);
    if (onFileSelect) {
      onFileSelect(updatedUrls.length > 0 ? updatedUrls : null, files);
    }
  };

  return (
    <div className="outline-2 outline-[#E69B83] border border-gray-200 rounded-lg p-3 mb-6 bg-white w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">{label}</h3>
          <p className="text-gray-500 text-sm">{description}</p>
          {!required && <p className="text-blue-500 text-xs">(Optional)</p>}
        </div>
      </div>

      <label
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (uploading) return;
          const droppedFiles = e.dataTransfer.files;
          handleFileChange({ target: { files: droppedFiles } });
        }}
        className={`flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-6 cursor-pointer transition w-full text-center ${uploading ? "opacity-50 cursor-not-allowed" : ""
          } ${isDragging ? "bg-gray-100" : "hover:bg-gray-50"}`}
      >


        {uploading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E69B83] mx-auto mb-2"></div>
            <span className="text-gray-500 text-sm">Uploading...</span>
          </div>
        ) : (
          <>
            <span className="text-gray-400 text-sm sm:text-base mb-2">
              ⬆️ Drag and drop your files here
            </span>
            <span className="px-3 py-2 sm:px-4 sm:py-2 bg-[#E69B83] text-white rounded-md hover:bg-[#c16a4d] text-sm sm:text-base transition">
              Choose Files
            </span>
          </>
        )}
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          multiple
          onChange={handleFileChange}
          disabled={uploading}
        />
      </label>

      {/* YouTube URL Input for Videos */}
      {isVideoUpload && (
        <div className="mt-4 mb-4">
          <div className="form-group">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add YouTube URL (Optional)
            </label>
            <div className="flex gap-2">
              <input
                type="url"
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
                placeholder="https://www.youtube.com/watch?v=..."
                className="flex-1 px-4 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E69B83] focus:border-transparent text-sm"
              />
              <button
                type="button"
                onClick={handleYoutubeUrlAdd}
                disabled={uploading || !youtubeUrl.trim()}
                className="px-4 py-2 bg-[#E69B83] text-white rounded-lg hover:bg-[#c16a4d] disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium transition"
              >
                Add URL
              </button>
            </div>
          </div>
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-3">
          <h4 className="font-medium text-sm text-gray-700 mb-2">Selected Files:</h4>
          <ul className="space-y-2">
            {files.map((file, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-gray-50 rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{getFileIcon(file.name)}</span>
                  <span className="text-gray-700 break-all">{file.name}</span>
                  <span className="text-xs text-gray-500">
                    ({(file.size / 1024 / 1024).toFixed(2)} MB)
                  </span>
                </div>
                <button
                  onClick={() => handleRemoveFile(idx)}
                  className="text-red-500 hover:text-red-700 text-xs px-2 py-1 mt-2 sm:mt-0 rounded hover:bg-red-50"
                  disabled={uploading}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {uploadedUrls.length > 0 && (
        <div className="mt-3">
          <h4 className="font-medium text-sm text-gray-700 mb-2">
            {isVideoUpload ? "Video URLs:" : "Image URLs:"}
          </h4>
          <ul className="space-y-2">
            {uploadedUrls.map((url, idx) => (
              <li
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-2 bg-gray-50 rounded-lg text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">🔗</span>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all"
                  >
                    {url}
                  </a>
                </div>
                <button
                  onClick={() => handleRemoveUrl(idx)}
                  className="text-red-500 hover:text-red-700 text-xs px-2 py-1 mt-2 sm:mt-0 rounded hover:bg-red-50"
                  disabled={uploading}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

      {required && files.length === 0 && !uploading && (
        <p className="text-red-500 text-sm mt-2">At least one file is required.</p>
      )}
    </div>
  );
};

export default FileUpload;
