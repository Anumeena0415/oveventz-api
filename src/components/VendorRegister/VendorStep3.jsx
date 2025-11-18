import FileUpload from "./FileUpload";
import { useState, useEffect } from "react";
import { CircleCheck, Shield } from "lucide-react";

const VendorStep3 = ({ formData, setFormData, fileStates, updateFileState }) => {
  // Use persistent file state from parent
  const gstFiles = fileStates?.gstFiles || [];
  const gstUrls = fileStates?.gstUrls || [];
  const businessFiles = fileStates?.businessFiles || [];
  const businessUrls = fileStates?.businessUrls || [];
  const idFiles = fileStates?.idFiles || [];
  const idUrls = fileStates?.idUrls || [];

  // Debug: Log file states when component mounts or fileStates change
  useEffect(() => {
    console.log("VendorStep3 - File States:", {
      gstFiles: gstFiles.length,
      gstUrls: gstUrls.length,
      businessFiles: businessFiles.length,
      businessUrls: businessUrls.length,
      idFiles: idFiles.length,
      idUrls: idUrls.length,
      allFileStates: fileStates
    });
  }, [fileStates, gstFiles, gstUrls, businessFiles, businessUrls, idFiles, idUrls]);


  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl text-center font-bold">Document Upload</h2>
      <p className="text-center text-gray-600 mb-4">
        Upload required documents for verification (all documents are optional)
      </p>

      {/* GST Upload */}
      <FileUpload
        label="GST Certificate"
        description="Upload GST certificate for tax compliance (PDF, JPG, PNG - max 10MB)"
        onFileSelect={(urls, files) => {
          updateFileState('', 'gst', files, urls);
          setFormData((prev) => ({
            ...prev,
            documents: { ...prev.documents, gst: urls },
          }));
        }}
        required={false}
        initialFiles={gstFiles}
        initialUrls={gstUrls}
      />

      <FileUpload
        label="Business Registration"
        description="Shop license or business registration document (PDF, JPG, PNG - max 10MB)"
        onFileSelect={(urls, files) => {
          updateFileState('', 'business', files, urls);
          setFormData((prev) => ({
            ...prev,
            documents: { ...prev.documents, businessProof: urls },
          }));
        }}
        initialFiles={businessFiles}
        initialUrls={businessUrls}
        required={false}
      />

      {/* ID Proof Upload */}
      <FileUpload
        label="ID Proof"
        description="Aadhaar, PAN, or Passport (PDF, JPG, PNG - max 10MB)"
        onFileSelect={(urls, files) => {
          updateFileState('', 'id', files, urls);
          setFormData((prev) => ({
            ...prev,
            documents: { ...prev.documents, idProof: urls },
          }));
        }}
        initialFiles={idFiles}
        initialUrls={idUrls}
        required={false}
      />


      {/* Security Note */}
      <div className="p-4 bg-blue-50 rounded-lg mt-6">
        <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
          <Shield className="w-6 h-6 text-orange-500" />
          Document Security
        </h3>

        <ul className="text-gray-600 list-disc md:list-none space-y-2 md:space-y-3 text-sm sm:text-base">
          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
            <span>All documents are encrypted and stored securely</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
            <span>Used only for verification purposes</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
            <span>Deleted after verification is complete</span>
          </li>

          <li className="flex items-start sm:items-center gap-2 sm:gap-3">
            <CircleCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
            <span>Documents are optional - you can upload them later</span>
          </li>
        </ul>

      </div>
    </div>
  );
};

export default VendorStep3;
