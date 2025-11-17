const { validateVendorRegistration } = require("../validators/vendorRegister");
const streamifier = require("streamifier");
const { v2: cloudinary } = require("cloudinary");

// Upload a single buffer to Cloudinary using streams
const uploadBufferToCloudinary = (buffer, options = {}) => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(options, (error, result) => {
            if (error) return reject(error);
            resolve(result);
        });
        streamifier.createReadStream(buffer).pipe(uploadStream);
    });
};

// Middleware: handle multipart uploads and attach URLs to req.body
const handleVendorUploads = async (req, res, next) => {
    try {
        // Normalize text fields that may come as JSON strings
        const coerceArray = (val) => {
            if (val == null) return [];
            if (Array.isArray(val)) return val;
            try {
                const parsed = JSON.parse(val);
                return Array.isArray(parsed) ? parsed : [parsed];
            } catch (_) {
                if (typeof val === 'string') {
                    const trimmed = val.trim();
                    if (!trimmed) return [];
                    return trimmed.includes(',') ? trimmed.split(',').map(s => s.trim()).filter(Boolean) : [trimmed];
                }
                return [];
            }
        };

        // Ensure objects exist
        req.body = req.body || {};

        // Prepare upload groups
        const imagesFiles = (req.files?.images) || [];
        const videosFiles = (req.files?.videos) || [];
        const gstFiles = (req.files?.gst) || [];
        const businessProofFiles = (req.files?.businessProof) || [];
        const idProofFiles = (req.files?.idProof) || [];

        const folderBase = "vendor_uploads";

        // Upload helpers
        const uploadAll = async (files, opts) => {
            const results = [];
            for (const file of files) {
                const uploaded = await uploadBufferToCloudinary(file.buffer, opts);
                results.push(uploaded.secure_url);
            }
            return results;
        };

        // Upload media
        const [imageUrls, videoUrls, gstUrls, businessProofUrls, idProofUrls] = await Promise.all([
            uploadAll(imagesFiles, { folder: `${folderBase}/images`, resource_type: "image" }),
            uploadAll(videosFiles, { folder: `${folderBase}/videos`, resource_type: "video" }),
            uploadAll(gstFiles, { folder: `${folderBase}/documents/gst`, resource_type: "auto" }),
            uploadAll(businessProofFiles, { folder: `${folderBase}/documents/businessProof`, resource_type: "auto" }),
            uploadAll(idProofFiles, { folder: `${folderBase}/documents/idProof`, resource_type: "auto" })
        ]);

        // Parse incoming documents if sent as JSON string
        let incomingDocuments = req.body.documents;
        if (typeof incomingDocuments === 'string') {
            try { incomingDocuments = JSON.parse(incomingDocuments); } catch (_) { incomingDocuments = {}; }
        }
        incomingDocuments = incomingDocuments && typeof incomingDocuments === 'object' ? incomingDocuments : {};

        // Merge images/videos from uploads, top-level, or documents
        const bodyImages = coerceArray(req.body.images);
        const docImages = coerceArray(incomingDocuments.images);
        const bodyVideos = coerceArray(req.body.videos);
        const docVideos = coerceArray(incomingDocuments.videos);

        req.body.images = (imageUrls.length > 0 ? imageUrls : (bodyImages.length > 0 ? bodyImages : docImages));
        req.body.videos = (videoUrls.length > 0 ? videoUrls : (bodyVideos.length > 0 ? bodyVideos : docVideos));

        // Handle documents - merge uploaded files with existing data
        req.body.documents = {
            gst: gstUrls.length > 0 ? gstUrls : coerceArray(incomingDocuments.gst).concat(coerceArray(req.body.gst)),
            businessProof: businessProofUrls.length > 0 ? businessProofUrls : coerceArray(incomingDocuments.businessProof).concat(coerceArray(req.body.businessProof)),
            idProof: idProofUrls.length > 0 ? idProofUrls : coerceArray(incomingDocuments.idProof).concat(coerceArray(req.body.idProof)),
        };

        // Remove top-level document fields to avoid confusion
        delete req.body.gst;
        delete req.body.businessProof;
        delete req.body.idProof;
        if (req.body.documents.images) delete req.body.documents.images;
        if (req.body.documents.videos) delete req.body.documents.videos;

        // Normalize arrays for categories and packages if coming as strings
        if (req.body.categories) req.body.categories = coerceArray(req.body.categories);
        if (req.body.packages) {
            try {
                const parsed = JSON.parse(req.body.packages);
                req.body.packages = Array.isArray(parsed) ? parsed : [];
            } catch (_) {
                req.body.packages = [];
            }
        }

        if (typeof req.body.bankDetails === 'string') {
            try {
                req.body.bankDetails = JSON.parse(req.body.bankDetails);
            } catch (err) {
                // leave as string, validation will fail
            }
        }

        if (typeof req.body.categories === 'string') {
            req.body.categories = JSON.parse(req.body.categories);
        }
        if (typeof req.body.packages === 'string') {
            req.body.packages = JSON.parse(req.body.packages);
        }


        next();
    } catch (err) {
        console.error("handleVendorUploads error:", err);
        return res.status(500).json({ success: false, message: "Upload failed", error: err.message });
    }
};

const vendorRegistrationMiddleware = (req, res, next) => {
    console.log("Middleware: Received request body:", req.body);

    // 0. Pre-sanitize raw input BEFORE validation
    const preSanitized = {
        ...req.body,
        email: typeof req.body.email === 'string' ? req.body.email.trim().toLowerCase() : req.body.email,
        businessName: typeof req.body.businessName === 'string' ? req.body.businessName.trim() : req.body.businessName,
        ownerName: typeof req.body.ownerName === 'string' ? req.body.ownerName.trim() : req.body.ownerName,
        phone: typeof req.body.phone === 'string' ? req.body.phone.replace(/\D/g, "") : req.body.phone,
        city: typeof req.body.city === 'string' ? req.body.city.trim() : req.body.city,
        serviceArea: typeof req.body.serviceArea === 'string' ? req.body.serviceArea.trim() : req.body.serviceArea,
        socialMedia: typeof req.body.socialMedia === 'string' ? req.body.socialMedia.trim() : req.body.socialMedia,
        categories: Array.isArray(req.body.categories) ? req.body.categories.map((c) => (typeof c === 'string' ? c.trim() : c)) : req.body.categories,
        othersCategories: Array.isArray(req.body.othersCategories) ? req.body.othersCategories.map((c) => (typeof c === 'string' ? c.trim() : c)) : req.body.othersCategories,
    };

    // 1. Use validator to check data format
    const { error, value } = validateVendorRegistration(preSanitized);

    console.log("Middleware: Validation result:", { error: error?.message, value });

    // 2. Handle validation errors
    if (error) {
        console.log("Middleware: Validation failed:", error.details);
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details.map(detail => detail.message)
        });
    }

    // 3. Sanitize data (clean and format) for persistence
    const sanitizedData = {
        ...value,
        email: value.email.toLowerCase().trim(),
        businessName: value.businessName.trim(),
        ownerName: value.ownerName.trim(),
        phone: value.phone.replace(/\s+/g, ""),
        city: value.city.trim(),
        serviceArea: value.serviceArea.trim(),
        socialMedia: value.socialMedia.trim(),
        categories: value.categories.map(cat => cat.trim()),
        othersCategories: Array.isArray(value.othersCategories) ? value.othersCategories.map(cat => cat.trim()) : [],
        images: Array.isArray(value.images) ? value.images : [],
        videos: Array.isArray(value.videos) ? value.videos : [],
        packages: value.packages || [],
        documents: (value.documents !== undefined) ? value.documents : {
            gst: null,
            businessProof: null,
            idProof: null
        },

        bankDetails: value.bankDetails || {
            accountHolder: null,
            accountNumber: null,
            ifsc: null
        }
    };

    console.log("Middleware: Sanitized data:", sanitizedData);

    // 4. Set up data for controller
    req.validatedData = sanitizedData;

    // 5. Continue to controller
    next();
};

module.exports = {
    vendorRegistrationMiddleware,
    handleVendorUploads
};
