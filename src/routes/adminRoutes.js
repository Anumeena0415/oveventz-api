const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { authenticateToken, requireAdminRole } = require("../middlewares/authMiddleware");

const { createVendorUser, approveVendor, setUserActiveState, listVendors, updateVendorStatus, listVendorUsers, getVendorById, updateVendorAndUser, getDashboardStats, createReview, listReviews, getReviewById, updateReview, deleteReview } = require("../controllers/admin");
const { getAllServices, getServiceById, updateService, deleteSeervices } = require("../controllers/eventplan");

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// Apply authentication and admin role check to all admin routes
router.use(authenticateToken);
router.use(requireAdminRole);

router.get("/dashboard/stats", getDashboardStats);
router.post("/vendors/approve", approveVendor);
router.post("/users/create-vendor", createVendorUser);
router.patch("/users/:user_id/active", setUserActiveState); 
router.get("/vendors", listVendors);
router.patch("/vendors/:id/status", updateVendorStatus);
router.get("/vendors/:id", getVendorById);
router.get("/users/vendors", listVendorUsers);
router.put("/users/vendor/:vendor_id", updateVendorAndUser);

// Review Management Routes
router.post("/reviews", createReview);
router.get("/reviews", listReviews);
router.get("/reviews/:id", getReviewById);
router.put("/reviews/:id", updateReview);
router.delete("/reviews/:id", deleteReview);

// Services Management Routes
router.get("/services", getAllServices);
router.get("/services/:id", getServiceById);
// Use optional multer - will work with both JSON (Cloudinary URL) and multipart (file upload)
router.put("/services/:id", (req, res, next) => {
  // Check if content-type is multipart/form-data
  if (req.headers['content-type'] && req.headers['content-type'].includes('multipart/form-data')) {
    return upload.single("image")(req, res, next);
  }
  // Otherwise, skip multer and proceed (JSON body)
  next();
}, updateService);
router.delete("/services/:id", deleteSeervices);

module.exports = router;


