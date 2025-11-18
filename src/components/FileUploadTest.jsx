import React, { useState } from 'react';
import FileUpload from './VendorRegister/FileUpload';
import { toast } from 'react-toastify';

const FileUploadTest = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const handleFileSelect = (urls, files) => {
    if (urls) {
      setUploadedUrls(urls);
      setUploadedFiles(files);
      toast.success(`Successfully uploaded ${urls.length} file(s)`);
    } else {
      setUploadedUrls([]);
      setUploadedFiles([]);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        File Upload with Threading Test
      </h1>

      <div className="mb-8 p-4 bg-blue-50 rounded-lg">
        <h2 className="text-lg font-semibold mb-2 text-blue-800">Features Demonstrated:</h2>
        <ul className="text-blue-700 space-y-1">
          <li>• <strong>Web Workers:</strong> File processing and uploads happen in separate threads</li>
          <li>• <strong>Image Compression:</strong> Images are automatically compressed before upload</li>
          <li>• <strong>Progress Tracking:</strong> Real-time upload progress for each file</li>
          <li>• <strong>Mobile Responsive:</strong> File names are truncated on mobile screens</li>
          <li>• <strong>Error Handling:</strong> Individual file upload failures don't affect others</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FileUpload
          label="Test Image Upload"
          description="Upload images to test compression and threading (max 5, 100MB each)"
          onFileSelect={handleFileSelect}
          required={false}
        />

        <FileUpload
          label="Test Video Upload"
          description="Upload videos to test threading (max 2, 50MB each)"
          onFileSelect={handleFileSelect}
          required={false}
        />
      </div>

      {uploadedUrls.length > 0 && (
        <div className="mt-8 p-4 bg-green-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-3 text-green-800">
            Uploaded Files ({uploadedUrls.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {uploadedUrls.map((url, index) => {
              const file = uploadedFiles[index];
              const isImage = file?.type?.startsWith('image/');
              const isVideo = file?.type?.startsWith('video/');

              return (
                <div key={index} className="bg-white p-3 rounded-lg border border-green-200">
                  <div className="text-sm text-gray-600 mb-2">
                    {file?.name || `File ${index + 1}`}
                  </div>
                  {isImage && (
                    <img
                      src={url}
                      alt={`Uploaded ${index + 1}`}
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  {isVideo && (
                    <video
                      src={url}
                      controls
                      className="w-full h-32 object-cover rounded"
                    />
                  )}
                  {!isImage && !isVideo && (
                    <div className="w-full h-32 bg-gray-100 rounded flex items-center justify-center">
                      <span className="text-gray-500">📄 Document</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-yellow-800">Technical Details:</h3>
        <ul className="text-yellow-700 text-sm space-y-1">
          <li>• Web Workers run in separate threads to prevent UI blocking</li>
          <li>• Images are compressed using OffscreenCanvas API</li>
          <li>• Upload progress is tracked individually for each file</li>
          <li>• File names are dynamically truncated based on screen size</li>
          <li>• Fallback to regular upload if Web Workers are not supported</li>
        </ul>
      </div>
    </div>
  );
};

export default FileUploadTest;