const express = require("express");
const multer = require("multer");
const vendorRegisterRoute = express.Router();

const { vendorRegistrationMiddleware, handleVendorUploads } = require("../middlewares/vendorMiddleware");
const { vendorRegisterForm, getApprovedVendors } = require("../controllers/vendorRegister.js");

const upload = multer();

// Flow: Multer (files) → Upload to Cloudinary → Validate/Sanitize → Controller
vendorRegisterRoute.post(
    "/register",
    upload.fields([
        { name: "images", maxCount: 20 },
        { name: "videos", maxCount: 10 },
        { name: "gst", maxCount: 10 },
        { name: "businessProof", maxCount: 10 },
        { name: "idProof", maxCount: 10 },
    ]),
    handleVendorUploads,
    vendorRegistrationMiddleware,
    vendorRegisterForm
);

vendorRegisterRoute.get("/approved", getApprovedVendors);

module.exports = {
    vendorRegisterRoute
};